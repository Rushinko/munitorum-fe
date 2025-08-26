import type { AxiosResponse } from "axios";
import apiClient from "~/lib/service";
import { type User } from "~/lib/types";

export function getProfile() {
  return apiClient.get<{ user: User }>('/profile');
}