export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  // Password must be at least 8 characters long and contain at least one number and one special character
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
  return passwordRegex.test(password);
};

export const validateUsername = (username: string): boolean => {
  // Username must be alphanumeric and between 3 to 20 characters
  const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
  return usernameRegex.test(username);
};

export const validateConfirmPassword = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword;
};

export enum ErrorMessage {
  invalidEmail = "Please enter a valid email address.",
  weakPassword = "Password must be at least 8 characters long and contain at least one number and one special character.",
  invalidUsername = "Username must be alphanumeric and between 3 to 20 characters.",
  passwordsDoNotMatch = "Passwords do not match.",
  unexpectedError = "An unexpected error occurred. Please try again later.",
  unauthorized = "You are not authorized to perform this action.",
  usernameConflict = "Username already exists. Please choose another.",
  emailConflict = "Email already exists. Please use another.",
};