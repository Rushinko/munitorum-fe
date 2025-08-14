import axios, { type AxiosResponse } from "axios";
import apiClient from "~/lib/service";

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  userId: string;
}

export const postLogin = async (email: string, password: string): Promise<AxiosResponse<LoginResponse>> => {
  return apiClient.post(`/auth/login`, {
    email,
    password,
  })
}

export const handleLoginResponse = (response: LoginResponse) => {
  console.log("Login successful:", response);
  
  // Handle successful login, e.g., store tokens, redirect, etc.
}
