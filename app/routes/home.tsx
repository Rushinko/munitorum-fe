import type { Route } from "./+types/home";
import { MunitorumLandingPage } from "../pages/welcome/welcome";
import { ThemeProvider } from "~/components/theme-provider";
import { handleLoggedInCheck } from "~/lib/service";
import { redirect } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Munitorum" },
    { name: "description", content: "Welcome to Munitorum!" },
  ];
}

export async function clientLoader({params}: Route.ClientLoaderArgs) {
  const loggedIn = await handleLoggedInCheck();
  if (loggedIn) {
    return redirect("/app");
  }
}

export default function Home() {
  return (
      <MunitorumLandingPage />
  );
}
