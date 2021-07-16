import produce from 'immer';
// import { REGISTER_USER } from '../../components/constants';

export const initialState = {
  // loading: false,
  // error: false,
  // currentUser: false,
  // userData: {
  //   repositories: false,
  // },
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      // case REGISTER_USER:
      //   draft.username = action.credentials.username.replace(/@/gi, '');
      //   break;
      default:
        break;
    }
  });

export default appReducer;
