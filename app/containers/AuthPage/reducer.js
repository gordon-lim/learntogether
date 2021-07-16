/*
 *
 * AuthPage reducer
 *
 */
import produce from 'immer';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const authPageReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      default:
        break;
    }
  });

export default authPageReducer;
