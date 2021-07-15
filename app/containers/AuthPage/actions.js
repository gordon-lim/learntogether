/*
 *
 * AuthPage actions
 *
 */

import { REGISTER_USER } from './constants';

export const registerUser = credentials => ({
  type: REGISTER_USER,
  credentials,
});
