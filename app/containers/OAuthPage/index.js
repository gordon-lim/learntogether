/**
 *
 * OAuthPage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import { ZoomOAuth } from './ZoomOAuth';

export function OAuthPage() {
  return (
    <Switch>
      <Route
        exact
        path="/oauth/zoom/:code?"
        render={props => <ZoomOAuth {...props} />}
      />
    </Switch>
  );
}

OAuthPage.propTypes = {};

export default OAuthPage;
