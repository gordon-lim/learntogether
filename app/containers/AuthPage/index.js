/**
 *
 * AuthPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAuthPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import SignInCard from './SignInCard';
import SignUpCard from './SignUpCard';

export function AuthPage() {
  useInjectReducer({ key: 'authPage', reducer });
  useInjectSaga({ key: 'authPage', saga });

  return (
    <div>
      <Helmet>
        <title>AuthPage</title>
        <meta name="description" content="Description of AuthPage" />
      </Helmet>
      {/* <FormattedMessage {...messages.header} /> */}
      <Switch>
        <Route exact path="/auth/signin" component={SignInCard} />
        <Route exact path="/auth/signup" component={SignUpCard} />
        <Redirect to="/auth/signin" />
      </Switch>
    </div>
  );
}

AuthPage.propTypes = {
  dispatch: PropTypes.func.isRequired, //eslint-disable-line
};

const mapStateToProps = createStructuredSelector({
  authPage: makeSelectAuthPage(),
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
)(AuthPage);
