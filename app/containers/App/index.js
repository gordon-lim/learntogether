/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */
import AuthPage from 'containers/AuthPage/Loadable';
import CoursePage from 'containers/CoursePage/Loadable';
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { OAuthPage } from 'containers/OAuthPage';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { isEmpty, isLoaded } from 'react-redux-firebase';
import { Redirect, Route, Switch } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import GlobalStyle from '../../global-styles';
import { makeSelectFirebaseAuth } from './selectors';

const App = ({ auth }) => (
  <>
    <Header auth={auth} />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/auth" component={AuthPage}>
        {isLoaded(auth) && !isEmpty(auth) && <Redirect to="/" />}
      </Route>
      <Route path="/courses" component={CoursePage} />
      <Route path="/oauth" component={OAuthPage} />
      <Route component={NotFoundPage} />
    </Switch>
    <Footer />
    <GlobalStyle />
  </>
);

App.propTypes = {
  auth: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  auth: makeSelectFirebaseAuth(),
});

const withConnect = connect(mapStateToProps);

export default withConnect(App);
