import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the authPage state domain
 */

const selectAuthPageDomain = state => state.authPage || initialState;

/**
 * Other specific selectors
 */
const selectFirebase = state => state.firebase || initialState;

/**
 * Default selector used by AuthPage
 */

const makeSelectAuthPage = () =>
  createSelector(
    selectAuthPageDomain,
    substate => substate,
  );

const makeSelectUsername = () =>
  createSelector(
    selectFirebase,
    substate => substate.username,
  );

export default makeSelectAuthPage;
export { selectAuthPageDomain, makeSelectUsername };
