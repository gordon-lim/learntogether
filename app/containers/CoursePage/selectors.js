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

const makeSelectUserDetails = () =>
  createSelector(
    selectFirebase,
    substate => substate.ordered.users,
  );

const makeSelectCurrentCourse = () =>
  createSelector(
    selectFirebase,
    substate => substate.ordered.currentCourse,
  );

const makeSelectCurrentUserDetails = () =>
  createSelector(
    selectFirebase,
    substate => substate.ordered.currentUser,
  );

const makeSelectCourseId = () => (state, ownProps) =>
  ownProps.match.params.courseId;

const makeSelectAvailSlots = () =>
  createSelector(
    selectFirebase,
    substate =>
      substate.ordered.coursesHosted ? substate.ordered.coursesHosted : [],
  );

const makeSelectJoinSlots = () =>
  createSelector(
    selectCoursePageDomain,
    substate => (substate.joinSlots ? substate.joinSlots : []),
  );

const makeSelectVotedJoinSlots = () =>
  createSelector(
    selectCoursePageDomain,
    substate => {
      const periods = [];
      for (let day = 0; day < substate.joinSlots.length; day += 1) {
        for (
          let period = 0;
          period < substate.joinSlots[day].length;
          period += 1
        ) {
          if (substate.joinSlots[day][period].selected) {
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
    substate => (substate.hostSlots ? substate.hostSlots : []),
  );

const makeSelectSelectedHostSlots = () =>
  createSelector(
    selectCoursePageDomain,
    substate => {
      const periods = [];
      for (let day = 0; day < substate.hostSlots.length; day += 1) {
        for (
          let period = 0;
          period < substate.hostSlots[day].length;
          period += 1
        ) {
          if (substate.hostSlots[day][period].selected) {
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

const makeSelectCourseVotes = () =>
  createSelector(
    selectFirebase,
    substate => substate.ordered.coursesVoted,
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
  makeSelectUserDetails,
  makeSelectCurrentCourse,
  makeSelectCurrentUserDetails,
  makeSelectCourseId,
  makeSelectAvailSlots,
  makeSelectJoinSlots,
  makeSelectVotedJoinSlots,
  makeSelectSlotVotes,
  makeSelectHostSlots,
  makeSelectSelectedHostSlots,
  makeSelectCourseVotes,
};
