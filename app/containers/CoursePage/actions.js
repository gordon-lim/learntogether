/*
 *
 * CoursePage actions
 *
 */

import { DEFAULT_ACTION, SELECT_JOIN_SLOT } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function selectJoinSlot(day, id) {
  return {
    type: SELECT_JOIN_SLOT,
    payload: { day, id },
  };
}
