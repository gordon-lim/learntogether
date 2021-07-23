/*
 *
 * TimetablePage reducer
 *
 */
import produce from 'immer';
import { ADD_EVENT, CLEAR_EVENTS, DEFAULT_ACTION } from './constants';
import { containsObject } from './utils';

export const initialState = {
  events: [],
};

/* eslint-disable default-case, no-param-reassign */
const timetablePageReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case CLEAR_EVENTS: {
        return {
          ...state,
          events: [],
        };
      }
      case ADD_EVENT: {
        return {
          ...state,
          events: containsObject(action.payload.event, state.events)
            ? state.events
            : state.events.concat(action.payload.event),
        };
      }
      case DEFAULT_ACTION:
        return { ...state };
      default:
        return { ...state };
    }
  });

export default timetablePageReducer;
