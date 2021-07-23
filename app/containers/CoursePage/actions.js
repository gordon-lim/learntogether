/*
 *
 * CoursePage actions
 *
 */

import {
  ADD_HOST_SLOT,
  ADD_JOIN_SLOT,
  CLEAR_AVAIL_SLOTS,
  CLEAR_VOTE_SLOTS,
  DEFAULT_ACTION,
  SELECT_HOST_SLOT,
  SELECT_JOIN_SLOT,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function clearAvailSlots() {
  return {
    type: CLEAR_AVAIL_SLOTS,
    payload: {},
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

export function clearVoteSlots() {
  return {
    type: CLEAR_VOTE_SLOTS,
    payload: {},
  };
}

export function selectHostSlot(day, id) {
  return {
    type: SELECT_HOST_SLOT,
    payload: { day, id },
  };
}
