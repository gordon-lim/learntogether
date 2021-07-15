/**
 *
 * OAuthPage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';

export function ZoomOAuth(props) {
  const code = new URLSearchParams(props.location.search).get('code');
  const { userState } = props.match.params;

  // Step 1:
  // Check if the code parameter is in the url
  // if an authorization code is available, the user has most likely been redirected from Zoom OAuth
  // if not, the user needs to be redirected to Zoom OAuth to authorize
  if (code) {
    /**
    
    // Step 3:
    // Request an access token using the auth code
    const AccessTokenUrl = `https://zoom.us/oauth/token?grant_type=authorization_code&code=${code}&redirect_uri=${
      process.env.ZOOM_REDIRECT_URL
    }`;

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': '	application/x-www-form-urlencoded',
        Authorization: `${process.env.ZOOM_CLIENT_ID}:${
          process.env.ZOOM_CLIENT_SECRET
        }`.toString('base64'),
      },
    };
    fetch(AccessTokenUrl, requestOptions)
      .then(response => response.json())
      .then(data => {
        // Log the access token and save it to the database
        const accessToken = data.access_token;
        const refreshToken = data.refresh_token;
        // console.log(`access_token: ${accessToken}`);
        // console.log(`refresh_token: ${refreshToken}`);

        if (accessToken) {
          // Step 4:
          // We can now use the access token to authenticate API calls

          // Send a request to get your user information using the /me context
          // The `/me` context restricts an API call to the user the token belongs to
          // This helps make calls to user-specific endpoints instead of storing the userID

          // This would be handled by the respective components
          return <div />;
          // return <Redirect to={userState.redirect} />;
        }
      });

      * */
    return <div>code</div>;
  }

  // Step 2:
  // If no authorization code is available, redirect to Zoom OAuth to authorize
  const AuthorizationUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=${
    process.env.ZOOM_CLIENT_ID
  }&redirect_uri=${process.env.ZOOM_REDIRECT_URL}&state=${JSON.stringify(
    userState,
  )}`;

  return window.location.assign(AuthorizationUrl);
}

export default ZoomOAuth;
