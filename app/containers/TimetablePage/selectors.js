import { selectFirebase } from 'containers/App/selectors';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the timetablePage state domain
 */

const selectTimetablePageDomain = state => state.timetablePage || initialState;

/**
 * Other specific selectors
 */

const makeSelectCourses = () =>
  createSelector(
    selectFirebase,
    substate => (substate.courses ? substate.courses : []),
  );

const makeSelectCoursesJoined = () =>
  createSelector(
    selectFirebase,
    substate =>
      substate.ordered.coursesJoined ? substate.ordered.coursesJoined : [],
  );

const makeSelectCoursesHosted = () =>
  createSelector(
    selectFirebase,
    substate =>
      substate.ordered.coursesHosted ? substate.ordered.coursesHosted : [],
  );

const makeSelectAllCoursesHosted = () =>
  createSelector(
    selectFirebase,
    substate =>
      substate.ordered.allCoursesHosted
        ? substate.ordered.allCoursesHosted
        : [],
  );

/**
 * Default selector used by TimetablePage
 */

const makeSelectTimetablePage = () =>
  createSelector(
    selectTimetablePageDomain,
    substate => substate,
  );

export default makeSelectTimetablePage;
export {
  selectTimetablePageDomain,
  makeSelectCourses,
  makeSelectCoursesJoined,
  makeSelectCoursesHosted,
  makeSelectAllCoursesHosted,
};
