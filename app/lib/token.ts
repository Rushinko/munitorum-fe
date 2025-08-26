import { jwtDecode } from "jwt-decode";

const tokenService = {
  getAccessToken: () => sessionStorage.getItem("accessToken"),
  setAccessToken: (token: string) => sessionStorage.setItem("accessToken", token),
  getRefreshToken: () => sessionStorage.getItem("refreshToken"),
  setRefreshToken: (token: string) => sessionStorage.setItem("refreshToken", token),
  setTokens: (accessToken: string, refreshToken: string) => {
    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("refreshToken", refreshToken);
  },
  clearTokens: () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
  },
  getClaims: () => {
    const token = tokenService.getAccessToken();
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        return decoded;
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
    return null;
  },
};

export default tokenService;