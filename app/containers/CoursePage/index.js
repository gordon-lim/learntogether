/**
 *
 * CoursePage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Redirect, Route, Switch } from 'react-router-dom';
import { isLoaded, isEmpty } from 'react-redux-firebase';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
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
  auth: PropTypes.object,
};

export default memo(CoursePage);
