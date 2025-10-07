import type { Route } from "./+types/home";
import { handleLoggedInCheck } from "~/lib/service";
import { redirect } from "react-router";
import { MunitorumLandingPage } from "~/components/welcome/welcome";

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
