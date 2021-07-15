/**
 *
 * AuthPage
 *
 */

import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { registerUser } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectUsername } from './selectors';
import SignInCard from './SignInCard';
import SignUpCard from './SignUpCard';

export function AuthPage({ username }) {
  useInjectReducer({ key: 'authPage', reducer });
  useInjectSaga({ key: 'authPage', saga });

  return (
    <div>
      <Helmet>
        <title>{username}</title>
        <meta name="description" content="Description of AuthPage" />
      </Helmet>
      {/* <FormattedMessage {...messages.header} /> */}
      <Switch>
        <Route exact path="/auth/signin">
          <SignInCard register={registerUser} />
        </Route>
        <Route exact path="/auth/signup">
          <SignUpCard register={registerUser} />
        </Route>
        <Redirect to="/auth/signin" />
      </Switch>
    </div>
  );
}

AuthPage.propTypes = {
  username: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  username: makeSelectUsername(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    registerUser: credentials => dispatch(registerUser(credentials)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AuthPage);
