/**
 *
 * Search
 *
 */

import { SearchIcon } from '@chakra-ui/icons';
import { IconButton, InputGroup, InputRightElement } from '@chakra-ui/react';
import { makeSelectUserDetails } from 'containers/CoursePage/selectors';
import { makeSelectCourses } from 'containers/HomePage/selectors';
import React, { useEffect, useState } from 'react';
import Autocomplete from 'react-autocomplete';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';
// import styled from 'styled-components';

function Search({ courses, users }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!courses || !users) return;

    let res = [];
    res = res.concat(
      courses.map(c => ({ courseId: c.key, label: c.value.title })),
    );
    res = res.concat(users.map(u => ({ userId: u.key, label: u.value.email })));
    setResults(res);
  }, [courses, users]);

  return (
    <InputGroup>
      <Autocomplete
        placeholder="Search course, user..."
        items={results}
        shouldItemRender={(item, value) => item.label.includes(value)}
        getItemValue={item => item.label}
        renderItem={(item, isHighlighted) => (
          <div
            style={{ background: isHighlighted ? 'lightgray' : 'white' }}
            key={v4()}
          >
            {item.label}
          </div>
        )}
        value={query}
        onChange={e => setQuery(e.target.value)}
        onSelect={val => setQuery(val)}
      />
      <InputRightElement>
        <IconButton aria-label="Search database" icon={<SearchIcon />} />
      </InputRightElement>
    </InputGroup>
  );
}

Search.propTypes = {
  courses: PropTypes.array,
  users: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  courses: makeSelectCourses(),
  users: makeSelectUserDetails(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  firebaseConnect(() => [{ path: 'courses' }, { path: 'users' }]),
  withConnect,
)(Search);
