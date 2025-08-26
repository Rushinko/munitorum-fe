import apiClient from "~/lib/service";

export async function getLists(userId?: number) {
  return apiClient.get(`/lists${userId ? `?userId=${userId}` : ""}`)
}

export async function getBattleReports(userId?: number) {
  return apiClient.get(`/battle-reports${userId ? `?userId=${userId}` : ""}`);
}
