import type { Axios, AxiosResponse } from "axios";
import apiClient from "~/lib/service";

interface SignupParams {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

// export async function postSignup({ username, email, password }: SignupParams) {
//   // This function will handle the signup logic
//   // It can include form validation, API calls, etc.
//   console.log("Handling signup...");
//   const url = `${import.meta.env.RUSH_API_BASE_URL}/auth/signup`;
//   try {
//     const user = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ username, email, password }),
//     });
//     return user;
//   } catch (error) {
//     console.error("Error during signup:", error);
//   }
// }


export async function postSignup({ username, email, password }: SignupParams): Promise<AxiosResponse<any>> {
  // This function will handle the signup logic
  // It can include form validation, API calls, etc.
  console.log("Handling signup...");
  return apiClient.post('/auth/signup', {
    username,
    email,
    password,
  });
}