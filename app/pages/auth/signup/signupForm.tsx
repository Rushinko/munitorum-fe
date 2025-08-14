import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "~/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { ErrorMessage, validateEmail, validateUsername } from "./util";
import ErrorCard from "~/components/ui/card/errorCard";
import { postSignup } from "./services";
import type { AxiosError } from "axios";
import { setFormErrors, type AuthError } from "../util";

export const signupFormSchema = z.object({
  username: z.string().min(4, { error: "Username must be at least 4 characters long" }).max(20, { error: "Username must be at most 20 characters long" }).regex(/^[a-zA-Z0-9]+$/, {
    error: "Username can only contain alphanumeric characters",
  }),
  email: z.email({ error: "Please enter a valid email address" }),
  password: z.string().min(8, { error: "Password must be at least 8 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/, { error: "Password must contain at least one uppercase letter, one lowercase letter, and one number" }),
  confirmPassword: z.string().min(8, { error: "Confirm Password must be at least 8 characters" }),
}).refine((data) => data.password === data.confirmPassword, {
  error: "Passwords do not match",
  path: ["confirmPassword"],
});

type SignupFormProps = React.ComponentProps<"form">;

export function SignupForm({
  className,
  ...props
}: SignupFormProps) {
  const [signupError, setSignupError] = useState<string>('');
  const navigate = useNavigate();

  // Initialize the form with zod validation
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: z.infer<typeof signupFormSchema>) => {
    setSignupError('');
    console.log("Form submitted with data:", data);
    // Handle form submission logic here

    try {
      const response = await postSignup(data)
      navigate("/verify?email=" + encodeURIComponent(data.email));
    } catch (error: any | AxiosError<AuthError>) {
      console.error("Signup failed:", error);
      setFormErrors(form, error.response?.data as AuthError);
      if (error.response?.data) {
        console.error("Error details:", error.response.data);
        setSignupError(error.response.data.errors.map((e: { message: string }) => e.message).join(", "));
      } else {
        console.error("Unexpected error:", error);
        setSignupError(ErrorMessage.unexpectedError);
      }
    }
  }


  return (
    <Form {...form}>

      <form className='flex flex-col gap-6' onSubmit={form.handleSubmit(onSubmit)} {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Create a new account</h1>
        </div>
        {signupError && (
          <ErrorCard className="mb-4">
            {signupError || ErrorMessage.unexpectedError}
          </ErrorCard>
        )}
        <div className="grid gap-6">
          <FormField
            name="username"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="username">Username</FormLabel>
                <FormControl>
                  <Input type="text" autoComplete="username" placeholder="rowboat-girlyman" {...field} required />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" autoComplete="email" placeholder="rowboat@example.com" required />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" autoComplete="new-password" placeholder="••••••" required />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="confirmPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" autoComplete="new-password" placeholder="••••••" required />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button variant="outline" className="w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            <path d="M1 1h22v22H1z" fill="none" />
          </svg>
          Login with Google
        </Button>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Button asChild variant="link" className="p-0">
            <Link to="/login">Log In</Link>
          </Button>
        </div>
      </form>
    </Form >
  )
}