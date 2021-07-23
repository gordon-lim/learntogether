/*
 *
 * TimetablePage actions
 *
 */

import { ADD_EVENT, CLEAR_EVENTS, DEFAULT_ACTION } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function clearEvents() {
  return {
    type: CLEAR_EVENTS,
    payload: {},
  };
}

export function addEvent(event) {
  return {
    type: ADD_EVENT,
    payload: { event },
  };
}
