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
    subState => (subState.courses ? subState.courses : []),
  );

const makeSelectCoursesJoined = () =>
  createSelector(
    selectFirebase,
    subState =>
      subState.ordered.coursesJoined ? subState.ordered.coursesJoined : [],
  );

const makeSelectCoursesHosted = () =>
  createSelector(
    selectFirebase,
    subState =>
      subState.ordered.coursesHosted ? subState.ordered.coursesHosted : [],
  );

const makeSelectAllCoursesHosted = () =>
  createSelector(
    selectFirebase,
    subState =>
      subState.ordered.allCoursesHosted
        ? subState.ordered.allCoursesHosted
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
