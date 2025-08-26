import axios, { type AxiosRequestConfig } from 'axios';
import type { useForm, UseFormReturn } from 'react-hook-form';
import { redirect, useNavigate } from 'react-router';
import * as z from 'zod';
import type { loginFormSchema } from '~/pages/auth/login/loginForm';
import type { signupFormSchema } from '~/pages/auth/signup/signupForm';
import tokenService from './token';
import { postLogout } from '~/pages/auth/signup/services';

interface RetryableAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

export type ApiError = {
  message: string;
  code?: any;
}

export const ERROR_CODES = {
  BAD_REQUEST: "BAD_REQUEST",
  USER_NOT_FOUND: "USER_NOT_FOUND",
  INVALID_PASSWORD: "INVALID_PASSWORD",
  INVALID_ACCESS_TOKEN: "INVALID_ACCESS_TOKEN",
  INVALID_REFRESH_TOKEN: "INVALID_REFRESH_TOKEN",
  INVALID_FINGERPRINT: "INVALID_FINGERPRINT",
  MISSING_AUTH_HEADER: "MISSING_AUTH_HEADER",
};

export const apiClient = axios.create({
  baseURL: `${import.meta.env.RUSH_API_BASE_URL}/api/v1`,
  timeout: 10000, // Set a timeout of 10 seconds
  withCredentials: true, // Include credentials in requests
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authClient = axios.create({
  baseURL: `${import.meta.env.RUSH_API_BASE_URL}/api`,
  timeout: 30000, // Set a timeout of 30 seconds
  withCredentials: true, // Include credentials in requests
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = tokenService.getAccessToken();
  if (token) {
    const headers = config.headers || {};
    // Add the Authorization header if the token exists
    headers['Authorization'] = `Bearer ${token}`;
    config.headers = headers;
  } else {
    const refreshToken = tokenService.getRefreshToken();
    if (refreshToken) {
      // TO DO: Check access token expiry before sending request with expired token
      console.log('No access token, but refresh token exists. You might want to refresh the access token here.');
      // Optionally, you can implement logic to refresh the access token here
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

apiClient.interceptors.response.use((response) => {
  return response;
}, async (error) => {
  const originalRequest = error.config as RetryableAxiosRequestConfig;
  if (error.response && error.response.status === 401) {
    const errorData = error.response.data as ApiError;
    switch (errorData.code) {
      case ERROR_CODES.INVALID_ACCESS_TOKEN:
        if (originalRequest._retry) {
          console.error('Access token is invalid, but retry has already been attempted.');
          return Promise.reject(error);
        }
        console.log('Access token expired, silently refreshing token...');
        originalRequest._retry = true;
        // Silently refresh the token
        await handleTokenRefresh();
        // Retry the original request with the new token
        return apiClient(originalRequest);
        break;
      case ERROR_CODES.INVALID_REFRESH_TOKEN:
        handleExpiredRefreshToken();

        break;
      case ERROR_CODES.INVALID_FINGERPRINT:
        console.error('Invalid fingerprint:', errorData.message);
        handleExpiredRefreshToken();
        break;
      case ERROR_CODES.MISSING_AUTH_HEADER:
        console.error('Missing authorization header:', errorData.message);
        break;
      default:
        console.error('Unauthorized access:', errorData.message);
        break;
    }
  }
  return Promise.reject(error);
});


async function handleTokenRefresh() {
  // Implement your token refresh logic here
  console.log('Refreshing access token...');
  const storedRefreshToken = tokenService.getRefreshToken();
  console.log('Stored refresh token:', storedRefreshToken);
  if (!storedRefreshToken) {
    console.error('No refresh token available, cannot refresh access token.');
    return;
  }

  // Make a request to your refresh endpoint
  // This is just an example, adjust the URL and payload as needed
  try {
    const response = await authClient.post(`/auth/refresh_token`, {
      refreshToken: storedRefreshToken,
    }, {
      withCredentials: true,
    });
    const { accessToken, refreshToken } = response.data;
    tokenService.setTokens(accessToken, refreshToken);
  } catch (error) {
    console.error('Error refreshing access token:', error);
  }

  // This might involve making a request to your refresh endpoint
}

function handleExpiredRefreshToken() {
  const navigate = useNavigate();
  console.log('Refresh token expired, redirecting to login...');
  navigate('/login');
}

export async function handleLoggedInCheck(refresh: boolean = false) {
  const refreshToken = tokenService.getRefreshToken();
  if (!refreshToken) {
    console.log('No refresh token found, user is not logged in.');
    return false;
  }
  try {
    if (refresh) await handleTokenRefresh();
    return true
  } catch (error) {
    console.error('Error during token refresh:', error);
    return false;
  }
}

export async function handleLogout(userId: number | null = null) {
  if (userId) {
    try {
      await postLogout(userId);
    } catch (error) {
      console.warn("Error during logout:", error);
    }
  }
  tokenService.clearTokens();
}

export default apiClient;
