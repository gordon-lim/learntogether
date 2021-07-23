/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { connectRouter } from 'connected-react-router';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import { firebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import history from 'utils/history';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    language: languageProviderReducer,
    router: connectRouter(history),
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    ...injectedReducers,
  });

  return rootReducer;
}
