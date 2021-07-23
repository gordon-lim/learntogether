/**
 *
 * SearchResults page
 *
 */

import { Box, Container, HStack, Stack, Text } from '@chakra-ui/react';
import { makeSelectUserDetails } from 'containers/CoursePage/selectors';
import { makeSelectCourses } from 'containers/HomePage/selectors';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';
import { ChevronRightIcon } from '@chakra-ui/icons';
// import styled from 'styled-components';

function SearchResults({
  courses,
  users,
  match: {
    params: { query },
  },
}) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!courses || !users) return;

    let res = [];
    res = res.concat(
      courses
        .filter(c => c.value.title.toLowerCase().includes(query.toLowerCase()))
        .map(c => ({
          courseId: c.key,
          label: c.value.title,
          link: `/courses/${c.key}`,
        })),
    );
    res = res.concat(
      users
        .filter(u => u.value.displayName)
        .filter(u =>
          u.value.displayName.toLowerCase().includes(query.toLowerCase()),
        )
        .map(u => ({
          userId: u.key,
          label: u.value.displayName,
          link: `/users/${u.key}`,
        })),
    );
    setResults(res);
  }, [courses, users]);

  return (
    <Container maxW="8xl" py={12}>
      <Text>Your query returned {results.length} results</Text>
      <br />
      <Stack spacing={8}>
        {results.map(r => (
          <Box
            as={RouterLink}
            to={r.link}
            p={5}
            shadow="md"
            borderWidth="1px"
            key={v4()}
          >
            <HStack>
              <Text>{r.label}</Text>
              <ChevronRightIcon />
            </HStack>
          </Box>
        ))}
      </Stack>
    </Container>
  );
}

SearchResults.propTypes = {
  courses: PropTypes.array,
  users: PropTypes.array,
  match: PropTypes.shape({
    params: PropTypes.shape({
      query: PropTypes.string,
    }),
  }),
};

const mapStateToProps = createStructuredSelector({
  courses: makeSelectCourses(),
  users: makeSelectUserDetails(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  firebaseConnect(() => [{ path: 'courses' }, { path: 'users' }]),
  withConnect,
)(SearchResults);
