import { createSelector } from 'reselect';

const selectRouter = state => state.router;
const selectFirebase = state => state.firebase;
const selectFirestore = state => state.firestore;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

// Firebase authentication
const makeSelectFirebaseAuth = () =>
  createSelector(
    selectFirebase,
    substate => substate.auth,
  );

// Firebase notifications
const makeSelectNotifs = () =>
  createSelector(
    selectFirebase,
    substate => substate.ordered.notifications,
  );

// Firebase users store

// Firebase courses store
const makeSelectCourses = () =>
  createSelector(
    selectFirebase,
    substate => substate.ordered.courses,
  );

export {
  selectRouter,
  selectFirebase,
  selectFirestore,
  makeSelectLocation,
  makeSelectFirebaseAuth,
  makeSelectNotifs,
  makeSelectCourses,
};
