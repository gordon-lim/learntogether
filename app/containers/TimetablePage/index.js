/**
 *
 * TimetablePage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectTimetablePage from './selectors';
import reducer from './reducer';
import saga from './saga';

export function TimetablePage() {
  useInjectReducer({ key: 'timetablePage', reducer });
  useInjectSaga({ key: 'timetablePage', saga });

  return (
    <div>
      <Helmet>
        <title>TimetablePage</title>
        <meta name="description" content="Description of TimetablePage" />
      </Helmet>
    </div>
  );
}

TimetablePage.propTypes = {
  dispatch: PropTypes.func.isRequired, //eslint-disable-line
};

const mapStateToProps = createStructuredSelector({
  timetablePage: makeSelectTimetablePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(TimetablePage);
