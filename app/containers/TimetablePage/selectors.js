import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the timetablePage state domain
 */

const selectTimetablePageDomain = state => state.timetablePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TimetablePage
 */

const makeSelectTimetablePage = () =>
  createSelector(
    selectTimetablePageDomain,
    substate => substate,
  );

export default makeSelectTimetablePage;
export { selectTimetablePageDomain };
