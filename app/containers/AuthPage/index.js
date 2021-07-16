/**
 *
 * AuthPage
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import ForgetPasswordCard from './ForgetPasswordCard';
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
        <title>Authentication Page</title>
        <meta name="description" content="Description of AuthPage" />
      </Helmet>
      {/* <FormattedMessage {...messages.header} /> */}
      <Switch>
        <Route exact path="/auth/signin" component={SignInCard} />
        <Route exact path="/auth/signup" component={SignUpCard} />
        <Route
          exact
          path="/auth/forget-password"
          component={ForgetPasswordCard}
        />
      </Switch>
    </div>
  );
}

AuthPage.propTypes = {};

const mapStateToProps = createStructuredSelector({});

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
