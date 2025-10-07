import axios, { type AxiosResponse } from "axios";
import { useNavigate } from "react-router";
import apiClient, { authClient } from "~/lib/service";
import tokenService from "~/lib/token";

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  userId: string;
}

export const postLogin = async (email: string, password: string): Promise<AxiosResponse<LoginResponse>> => {
  return authClient.post(`/auth/login`, {
    email,
    password,
  })
}

export const handleLoginResponse = (response: LoginResponse) => {
  tokenService.setTokens(response.accessToken, response.refreshToken);
}
