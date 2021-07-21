/*
 *
 * CoursePage reducer
 *
 */
import produce from 'immer';
import {
  ADD_HOST_SLOT,
  ADD_JOIN_SLOT,
  DEFAULT_ACTION,
  SELECT_HOST_SLOT,
  SELECT_JOIN_SLOT,
} from './constants';
import { getInitialData } from './InitialData';
import { containsObject } from './utils';

const { joinSlots, hostSlots } = getInitialData();

export const initialState = {
  joinSlots,
  hostSlots,
};

/* eslint-disable default-case, no-param-reassign */
const coursePageReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case ADD_JOIN_SLOT: {
        return {
          ...state,
          joinSlots: state.joinSlots.map((daySlots, day) =>
            daySlots.map(slot => {
              if (slot.id !== action.payload.id || day !== action.payload.day) {
                return slot;
              }

              // add the slot
              return {
                ...slot,
                availSlots: containsObject(action.payload.slot, slot.availSlots)
                  ? slot.availSlots
                  : slot.availSlots.concat(action.payload.slot),
              };
            }),
          ),
        };
      }
      case SELECT_JOIN_SLOT: {
        return {
          ...state,
          joinSlots: state.joinSlots.map((daySlots, day) =>
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
      case ADD_HOST_SLOT: {
        return {
          ...state,
          hostSlots: state.hostSlots.map((daySlots, day) =>
            daySlots.map(slot => {
              if (slot.id !== action.payload.id || day !== action.payload.day) {
                return slot;
              }

              // Flip the status of the slot that is selected
              return {
                ...slot,
                votes: containsObject(action.payload.slot, slot.votes)
                  ? slot.votes
                  : slot.votes.concat(action.payload.slot),
              };
            }),
          ),
        };
      }
      case SELECT_HOST_SLOT: {
        return {
          ...state,
          hostSlots: state.hostSlots.map((daySlots, day) =>
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
