const express = require('express');
const api = express.Router();
// Use the request module to make HTTP requests from Node
const request = require('request');

api.use((req, res, next) => {
  next();
});

api.get('/', (req, res) => {
  res.json({
    message: 'api',
  });
});

api.get('/zoom/getToken', (req, res) => {
  // Step 1:
  // Check if the code parameter is in the url
  // if an authorization code is available, the user has most likely been redirected from Zoom OAuth
  // if not, the user needs to be redirected to Zoom OAuth to authorize

  if (req.query.code) {
    // Step 3:
    // Request an access token using the auth code

    const url = `https://zoom.us/oauth/token?grant_type=authorization_code&code=${
      req.query.code
    }&redirect_uri=${process.env.ZOOM_REDIRECT_URL}`;

    request
      .post(url, (error, response, body) => {
        // Parse response to JSON
        const bodyJson = JSON.parse(body);

        // Logs your access and refresh tokens in the browser
        // console.log(`access_token: ${body.access_token}`);
        // console.log(`refresh_token: ${body.refresh_token}`);

        if (bodyJson.access_token) {
          // Step 4:
          // We can now use the access token to authenticate API calls

          // Send a request to get your user information using the /me context
          // The `/me` context restricts an API call to the user the token belongs to
          // This helps make calls to user-specific endpoints instead of storing the userID
          res.json({
            access_token: bodyJson.access_token,
            refresh_token: bodyJson.refresh_token,
          });
        } else {
          // Handle errors, something's gone wrong!
          res.status(401).json(bodyJson);
        }
      })
      .auth(process.env.ZOOM_CLIENT_ID, process.env.ZOOM_CLIENT_SECRET);

    return;
  }

  // Step 2:
  // If no authorization code is available, redirect to Zoom OAuth to authorize (handled by frontend)
  res.status(401).json({
    error: 'Access code must be supplied',
  });
});

api.get('/zoom/createMeeting', (req, res) => {
  request
    .post(
      'https://api.zoom.us/v2/users/me/meetings',
      (error, response, body) => {
        if (error) {
          // console.log('API Response Error: ', error);
          res.json({
            error,
          });
        } else {
          const bodyJson = JSON.parse(body);
          // Display response in console
          // console.log('API call ', body);
          res.json(bodyJson);
        }
      },
    )
    .auth(null, null, true, req.access_token);
});

module.exports = api;
