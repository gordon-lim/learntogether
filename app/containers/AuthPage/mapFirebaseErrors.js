export const mapFirebaseErrors = ({ code, message }) => {
  if (code.includes('email')) return { email: message };

  if (code.includes('password')) return { password: message };
  return null;
};
