/*
 *
 * CoursePage reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, SELECT_JOIN_SLOT } from './constants';
import { joinSlots } from './SampleData';

export const initialState = {
  // slots: [[], [], [], [], [], [], []],
  slots: joinSlots,
};

/* eslint-disable default-case, no-param-reassign */
const coursePageReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case SELECT_JOIN_SLOT: {
        return {
          ...state,
          slots: state.slots.map((daySlots, day) =>
            daySlots.map(slot => {
              if (slot.id !== action.payload.id || day !== action.payload.day) {
                return slot;
              }

              // Flip the status of the slot that is selected
              return {
                ...slot,
                selected: !slot.selected,
              };
            }),
          ),
        };
      }
      case DEFAULT_ACTION:
        return { ...state };
      default:
        return { ...state };
    }
  });

export default coursePageReducer;
