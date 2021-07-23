/*
 *
 * TimetablePage actions
 *
 */

import { ADD_EVENT, DEFAULT_ACTION } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function addEvent(event) {
  return {
    type: ADD_EVENT,
    payload: { event },
  };
}
