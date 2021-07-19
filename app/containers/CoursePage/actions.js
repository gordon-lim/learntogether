/*
 *
 * CoursePage actions
 *
 */

import {
  ADD_HOST_SLOT,
  ADD_JOIN_SLOT,
  DEFAULT_ACTION,
  SELECT_HOST_SLOT,
  SELECT_JOIN_SLOT,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function addAvailSlots(day, id, slot) {
  return {
    type: ADD_JOIN_SLOT,
    payload: { day, id, slot },
  };
}

export function selectJoinSlot(day, id) {
  return {
    type: SELECT_JOIN_SLOT,
    payload: { day, id },
  };
}

export function addVoteSlots(day, id, slot) {
  return {
    type: ADD_HOST_SLOT,
    payload: { day, id, slot },
  };
}

export function selectHostSlot(day, id) {
  return {
    type: SELECT_HOST_SLOT,
    payload: { day, id },
  };
}
