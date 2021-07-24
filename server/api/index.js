const express = require('express');
const bodyParser = require('body-parser');
const api = express.Router();
const axios = require('axios');
const nodemailer = require('nodemailer');

api.get('/sendEmail', async req => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  const testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  await transporter.sendMail({
    from: '"Fred Foo" <fred@learntogether.com>', // sender address
    to: req.query.receiverEmail, // list of receivers
    subject: 'Class joined! Take note of your class timings! ✔', // Subject line
    text: 'MWF 1-3pm Zoom Meeting URL: {}', // plain text body
  });
});

api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());

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
    const b64ClientIdSecret = Buffer.from(
      `${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`,
    ).toString('base64');

    axios
      .post(
        url,
        {},
        {
          headers: {
            Authorization: `Basic ${b64ClientIdSecret}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )
      .then(result => {
        // Parse response to JSON
        const bodyJson = result.data;

        // Logs your access and refresh tokens in the browser
        // console.log(`access_token: ${body.access_token}`);
        // console.log(`refresh_token: ${body.refresh_token}`);

        if (bodyJson.access_token) {
          // Step 4:
          // We can now use the access token to authenticate API calls

          // Send a request to get your user information using the /me context
          // The `/me` context restricts an API call to the user the token belongs to
          // This helps make calls to user-specific endpoints instead of storing the userID
          res.json(bodyJson);
        } else {
          // Handle errors, something's gone wrong!
          res.status(401).json(bodyJson);
        }
      })
      .catch(err => res.status(401).json(err.response.data));

    return;
  }

  // Step 2:
  // If no authorization code is available, redirect to Zoom OAuth to authorize (handled by frontend)
  res.status(401).json({
    error: 'Access code must be supplied',
  });
});

api.post('/zoom/refreshToken', (req, res) => {
  axios
    .post(
      'https://zoom.us/oauth/token',
      {},
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`,
          ).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        params: {
          grant_type: 'refresh_token',
          refresh_token: req.query.refreshToken,
        },
      },
    )
    .then(result => res.json(result.data))
    .catch(err => res.status(401).json(err.response.data));
});

api.post('/zoom/createMeeting', (req, res) => {
  const payload = {
    topic: req.body.topic,
    type: 8,
    start_time: req.body.startTime,
    duration: 60,
    timezone: 'Asia/Singapore',
    agenda: 'Learn Together Course',
    recurrence: {
      type: 2,
      repeat_interval: 1,
      weekly_days: req.body.days,
      end_times: req.body.numMeetings,
    },
    settings: {
      join_before_host: true,
      mute_upon_entry: false,
      approval_type: 0,
    },
  };
  axios
    .post('https://api.zoom.us/v2/users/me/meetings', payload, {
      headers: {
        Authorization: `Bearer ${req.body.accessToken}`,
      },
    })
    .then(result => res.json(result.data))
    .catch(err =>
      res.status(401).json({
        error: err.response.data,
      }),
    );
});

module.exports = api;
