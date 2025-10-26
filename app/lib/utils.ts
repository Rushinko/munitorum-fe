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

export function camelCaseToString(text: string): string {
  return text
    // Insert a space before all caps
    .replace(/([A-Z])/g, ' $1')
    // Uppercase the first character
    .replace(/^./, function(str){ return str.toUpperCase(); })
    .trim(); 
}

export function formatNumber(num: number, decimals?: number, formatString?: string): string | number{
  if (decimals !== undefined) {
    return num.toFixed(decimals);
  }
  if (!formatString) {
    formatString = 'decimal';
  }
  if (formatString === 'percent') {
    return num = (num * 100).toFixed(2) as unknown as number;
  }
  // Use Intl.NumberFormat to format the number according to the specified style
  return new Intl.NumberFormat('en-CA', {
    style: formatString as Intl.NumberFormatOptions['style'],
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
}

/**
 * Compares two objects and returns an object of the differences.
 * This is a "shallow" comparison.
 */
export function findDiff(obj1: Record<string, any>, obj2: Record<string, any>) {
  const diff = {} as Record<string, { from: any; to: any }>;
  // Get all unique keys from both objects
  const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

  for (const key of allKeys) {
    // 1. Key was added (exists in obj2 but not obj1)
    if (!obj1.hasOwnProperty(key)) {
      diff[key as keyof typeof obj2] = { from: undefined, to: obj2[key] };
    } 
    // 2. Key was removed (exists in obj1 but not obj2)
    else if (!obj2.hasOwnProperty(key)) {
      diff[key as keyof typeof obj1] = { from: obj1[key], to: undefined };
    } 
    // 3. Key was modified (exists in both but values are different)
    else if (obj1[key] !== obj2[key]) {
      diff[key as keyof typeof obj1] = { from: obj1[key], to: obj2[key] };
    }
  }
  
  return diff;
}