import { selectFirebase } from 'containers/App/selectors';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the coursePage state domain
 */

const selectCoursePageDomain = state => state.coursePage || initialState;

/**
 * Other specific selectors
 */

const makeSelectCourseId = () => (state, ownProps) =>
  ownProps.match.params.courseId;

const makeSelectAvailSlots = () =>
  createSelector(
    selectFirebase,
    firebaseState =>
      firebaseState.ordered.coursesHosted
        ? firebaseState.ordered.coursesHosted
        : [],
  );

const makeSelectJoinSlots = () =>
  createSelector(
    selectCoursePageDomain,
    subState => (subState.joinSlots ? subState.joinSlots : []),
  );

const makeSelectVotedJoinSlots = () =>
  createSelector(
    selectCoursePageDomain,
    subState => {
      const periods = [];
      for (let day = 0; day < subState.joinSlots.length; day += 1) {
        for (
          let period = 0;
          period < subState.joinSlots[day].length;
          period += 1
        ) {
          if (subState.joinSlots[day][period].selected) {
            periods.push({
              day,
              period,
            });
          }
        }
      }
      return periods;
    },
  );

const makeSelectSlotVotes = () =>
  createSelector(
    selectFirebase,
    firebaseState =>
      firebaseState.ordered.coursesVoted
        ? firebaseState.ordered.coursesVoted
        : [],
  );

const makeSelectHostSlots = () =>
  createSelector(
    selectCoursePageDomain,
    subState => (subState.hostSlots ? subState.hostSlots : []),
  );

const makeSelectSelectedHostSlots = () =>
  createSelector(
    selectCoursePageDomain,
    subState => {
      const periods = [];
      for (let day = 0; day < subState.hostSlots.length; day += 1) {
        for (
          let period = 0;
          period < subState.hostSlots[day].length;
          period += 1
        ) {
          if (subState.hostSlots[day][period].selected) {
            periods.push({
              day,
              period,
            });
          }
        }
      }
      return periods;
    },
  );

/**
 * Default selector used by CoursePage
 */

const makeSelectCoursePage = () =>
  createSelector(
    selectCoursePageDomain,
    substate => substate,
  );

export default makeSelectCoursePage;
export {
  selectCoursePageDomain,
  makeSelectCourseId,
  makeSelectAvailSlots,
  makeSelectJoinSlots,
  makeSelectVotedJoinSlots,
  makeSelectSlotVotes,
  makeSelectHostSlots,
  makeSelectSelectedHostSlots,
};
