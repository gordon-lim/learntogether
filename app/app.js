/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import '@babel/polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { ConnectedRouter } from 'connected-react-router';
import {
  firebaseReducer,
  ReactReduxFirebaseProvider,
} from 'react-redux-firebase';
import history from 'utils/history';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'sanitize.css/sanitize.css';

// Import root app
import App from 'containers/App';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';

// Load the favicon and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import 'file-loader?name=.htaccess!./.htaccess';
/* eslint-enable import/no-unresolved, import/extensions */

import createReducer from 'reducers';
import configureStore from './configureStore';

// Import i18n messages
import { translationMessages } from './i18n';

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

// Firebase details
const fbConfig = {
  apiKey: 'AIzaSyD5n7DSjhNCC5C_2icGisVVCnARhhTrFnI',
  authDomain: 'learntogether-bd35f.firebaseapp.com',
  projectId: 'learntogether-bd35f',
  storageBucket: 'learntogether-bd35f.appspot.com',
  messagingSenderId: '1022845349323',
  appId: '1:1022845349323:web:bb4e8232e3468d5d395a4e',
};

// Initialize firebase instance
firebase.initializeApp(fbConfig);

createReducer({ firebase: firebaseReducer });

// react-redux-firebase props
const rrfProps = {
  firebase,
  config: {
    userProfile: 'users',
    // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
    // enableClaims: true // Get custom claims along with the profile
  },
  dispatch: store.dispatch,
  // createFirestoreInstance // <- needed if using firestore
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
