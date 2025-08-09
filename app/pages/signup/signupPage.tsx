import { useState } from "react";
import { SignupForm } from "./signupForm"
import LogoButton from "~/components/ui/button/logoButton"
import { postSignup } from "./services";
import { ErrorMessage } from "./util";

export type SignupErrors = {
  general?: string;
  username?: string;
  email?: string;
  password?: string;
};

export default function SignupPage() {
  const [signupErrors, setSignupErrors] = useState<SignupErrors>({});

  const handleSignup = async (formData: FormData) => {
    setSignupErrors({});
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      const user = await postSignup({ username, email, password });
      console.log("Signup response:", user);
      const res = await user?.json();
      switch (user?.status) {
        case 200:
        case 201:
          console.log("Signup successful:", res);
          // Redirect or show success message
          break;
        case 400:
        case 401:
        case 500:
          console.error("Signup error:", res);
          setSignupErrors({ general: ErrorMessage.unexpectedError });
          // Show error message to the user
          break;
        case 403:
          break;
        case 409:
          if (res.type === "username") {
            console.error("Username conflict:", res);
            setSignupErrors({ username: ErrorMessage.usernameConflict });
          } else if (res.type === "email") {
            console.error("Email conflict:", res);
            setSignupErrors({ email: ErrorMessage.emailConflict });
          }
          break;
        default:
      }
      console.warn("Unexpected response:", res);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <LogoButton />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm signupErrors={signupErrors} action={handleSignup} />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
