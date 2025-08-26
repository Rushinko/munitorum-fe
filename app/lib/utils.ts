import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { jwtDecode } from "jwt-decode"
import tokenService from "./token"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function checkIfLoggedIn(): boolean {
  // Implement your logic to check if the user is logged in'
  const token = tokenService.getAccessToken();
  const refreshToken = tokenService.getRefreshToken();
  // Check if both tokens are present
  if (token && refreshToken) {
    if (isTokenValid(token)) {
      // If the access token is valid, return true
      return true;
    }
    // Check if the refresh token is valid
  } else if (refreshToken) {
    // Check if the refresh token is valid
    if (isTokenValid(refreshToken)) {
      // If the refresh token is valid, you might want to refresh the access token here.
      // For now, we will just return true.
      return true;
    }
  }
  tokenService.clearTokens(); // Clear invalid tokens
  return false; // No tokens found, user is not logged in
}

function isTokenValid(token: string): boolean {
  try {
    const decoded: any = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return decoded.exp > currentTime; // Check if token is not expired
  } catch (error) {
    console.error("Invalid token:", error);
    return false; // Token is invalid
  }
}
