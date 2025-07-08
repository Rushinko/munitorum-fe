import ParticleBackground from "~/components/ParticleBackground";
import LoginForm from "./loginForm";
import { ClientOnly } from "remix-utils/client-only";

export default function Login() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <LoginForm />
    </div>
  )
}