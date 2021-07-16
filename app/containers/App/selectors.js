import { createSelector } from 'reselect';

const selectRouter = state => state.router;
const selectFirebase = state => state.firebase;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const makeSelectFirebaseAuth = () =>
  createSelector(
    selectFirebase,
    substate => substate.auth,
  );

export { makeSelectLocation, makeSelectFirebaseAuth };
