import { selectFirestore } from 'containers/App/selectors';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the chatPage state domain
 */

const selectChatPageDomain = state => state.chatPage || initialState;

/**
 * Other specific selectors
 */
const makeSelectFirestoreMessages = () =>
  createSelector(
    selectFirestore,
    substate => substate.ordered.messages,
  );

/**
 * Default selector used by ChatPage
 */

const makeSelectChatPage = () =>
  createSelector(
    selectChatPageDomain,
    substate => substate,
  );

export default makeSelectChatPage;
export { selectChatPageDomain, makeSelectFirestoreMessages };
