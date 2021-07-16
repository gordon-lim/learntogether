/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
// Load the favicon and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import '@babel/polyfill';
import { ChakraProvider } from '@chakra-ui/react';
import { ConnectedRouter } from 'connected-react-router';
// Import root app
import App from 'containers/App';
// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';
import 'file-loader?name=.htaccess!./.htaccess';
// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'sanitize.css/sanitize.css';
import history from 'utils/history';
/* eslint-enable import/no-unresolved, import/extensions */
import configureStore from './configureStore';
// Import i18n messages
import { translationMessages } from './i18n';

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

// Firebase details
const fbConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize firebase instance & firestore
firebase.initializeApp(fbConfig);

// react-redux-firebase props
const rrfProps = {
  firebase,
  config: {
    userProfile: 'users',
    // useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
    // enableClaims: true // Get custom claims along with the profile
  },
  dispatch: store.dispatch,
  // createFirestoreInstance, // <- needed if using firestore
};

// Added chakra ui provider
const render = messages => {
  ReactDOM.render(
    <Provider store={store}>
      <ChakraProvider>
        <LanguageProvider messages={messages}>
          <ConnectedRouter history={history}>
            <ReactReduxFirebaseProvider {...rrfProps}>
              <App />
            </ReactReduxFirebaseProvider>
          </ConnectedRouter>
        </LanguageProvider>
      </ChakraProvider>
    </Provider>,
    MOUNT_NODE,
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'));
  })
    .then(() => Promise.all([import('intl/locale-data/jsonp/en.js')]))
    .then(() => render(translationMessages))
    .catch(err => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
