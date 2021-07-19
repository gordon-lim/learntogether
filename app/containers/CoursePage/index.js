/**
 *
 * CoursePage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { isLoaded, isEmpty } from 'react-redux-firebase';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectFirebaseAuth } from 'containers/App/selectors';
import makeSelectCoursePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import ViewCourse from './ViewCourse';
import JoinCourse from './JoinCourse';
import HostCourse from './HostCourse';

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
  dispatch: PropTypes.func.isRequired, //eslint-disable-line
  auth: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  coursePage: makeSelectCoursePage(),
  auth: makeSelectFirebaseAuth(),
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
