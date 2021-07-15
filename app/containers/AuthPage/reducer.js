/*
 *
 * AuthPage reducer
 *
 */
import produce from 'immer';
import { REGISTER_USER } from './constants';

export const initialState = {
  username: '',
  error: '',
};

/* eslint-disable default-case, no-param-reassign */
const authPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case REGISTER_USER:
        draft.username = action.credentials.username.replace(/@/gi, '');
        break;
      default:
        break;
    }
  });

export default authPageReducer;
