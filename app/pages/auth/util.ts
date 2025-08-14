import type { UseFormReturn } from "react-hook-form";
import type { ApiError } from "~/lib/service";
import * as z from "zod";
import type { loginFormSchema } from "~/pages/auth/login/loginForm";
import type { signupFormSchema } from "~/pages/auth/signup/signupForm";

export type AuthError = {
  errors: {
    field: string;
    message: string;
  }[],
} & ApiError

export const setFormErrors = (form: UseFormReturn<any>, errors: AuthError) => {
  if (errors && errors.errors) {
    errors.errors.forEach((error) => {
      form.setError(error.field as keyof z.infer<typeof loginFormSchema | typeof signupFormSchema>, { type: "manual", message: error.message });
    });
  }
}