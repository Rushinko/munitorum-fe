import axios from 'axios';
import type { useForm, UseFormReturn } from 'react-hook-form';
import * as z from 'zod';
import type { loginFormSchema } from '~/pages/auth/login/loginForm';
import type { signupFormSchema } from '~/pages/auth/signup/signupForm';

export type ApiError = {
  message: string;
  code?: any;
}

export const apiClient = axios.create({
  baseURL: import.meta.env.RUSH_API_BASE_URL,
  timeout: 10000, // Set a timeout of 10 seconds
  withCredentials: true, // Include credentials in requests
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
