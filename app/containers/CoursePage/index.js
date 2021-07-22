/**
 *
 * CoursePage
 *
 */

import { makeSelectFirebaseAuth } from 'containers/App/selectors';
import { makeSelectCoursesJoined } from 'containers/TimetablePage/selectors';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { isEmpty, isLoaded } from 'react-redux-firebase';
import { Redirect, Route, Switch } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import HostCourse from './HostCourse';
import JoinCourse from './JoinCourse';
import reducer from './reducer';
import saga from './saga';
import makeSelectCoursePage from './selectors';
import ViewCourse from './ViewCourse';

export function CoursePage({ auth }) {
  useInjectReducer({ key: 'coursePage', reducer });
  useInjectSaga({ key: 'coursePage', saga });

  return (
    <div>
      <Helmet>
        <title>CoursePage</title>
        <meta name="description" content="Description of CoursePage" />
      </Helmet>
      <Switch>
        <Route
          exact
          path="/courses/:courseId"
          render={props => <ViewCourse {...props} />}
        />
        <Route
          exact
          path="/courses/:courseId/join"
          render={props => <JoinCourse auth={auth} {...props} />}
        >
          {isLoaded(auth) && isEmpty(auth) && <Redirect to="/auth/signin" />}
        </Route>
        <Route
          exact
          path="/courses/:courseId/host"
          render={props => <HostCourse auth={auth} {...props} />}
        >
          {isLoaded(auth) && isEmpty(auth) && <Redirect to="/auth/signin" />}
        </Route>
      </Switch>
    </div>
  );
}

CoursePage.propTypes = {
  auth: PropTypes.object,
  coursesJoiend: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  coursePage: makeSelectCoursePage(),
  auth: makeSelectFirebaseAuth(),
  coursesJoined: makeSelectCoursesJoined(),
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
)(CoursePage);
