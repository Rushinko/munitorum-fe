import * as z from "zod";

export const SignupFormSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long").max(20, "Username must be at most 20 characters long").regex(/^[a-zA-Z0-9]+$/, "Username can only contain alphanumeric characters"),
  email: z.string().email("Please enter a valid email address"),
})

export const validateEmail = (email: string): boolean => {
  console.log("Validating email:", email);
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
  invalidUsername = "Username must be alphanumeric and between 4 to 20 characters.",
  passwordsDoNotMatch = "Passwords do not match.",
  unexpectedError = "An unexpected error occurred. Please try again later.",
  unauthorized = "You are not authorized to perform this action.",
  usernameConflict = "Username already exists. Please choose another.",
  emailConflict = "Email already exists. Please use another.",
};