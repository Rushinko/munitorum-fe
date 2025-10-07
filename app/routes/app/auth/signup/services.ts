import type { Axios, AxiosResponse } from "axios";
import { authClient } from "~/lib/service";

interface SignupParams {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export async function postSignup({ username, email, password }: SignupParams): Promise<AxiosResponse<any>> {
  // This function will handle the signup logic
  // It can include form validation, API calls, etc.
  return authClient.post('/auth/signup', {
    username,
    email,
    password,
  });
}

export async function postLogout(userId: number): Promise<AxiosResponse<any>> {
  // This function will handle the logout logic
  // It can include API calls, etc.
  return authClient.post('/auth/logout', {
    userId,
  });
}