/**
 *
 * Custom utils for AuthPage
 *
 */

/**
 * Validates email
 *
 * @param {string} email
 * @returns boolean on whether the email provided is valid
 *
 */
export const validateEmail = email =>
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    email,
  );
