import { createSelector } from 'reselect';

const selectRouter = state => state.router;
const selectFirebase = state => state.firebase;
const selectFirestore = state => state.firestore;

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

export {
  selectRouter,
  selectFirebase,
  selectFirestore,
  makeSelectLocation,
  makeSelectFirebaseAuth,
};
