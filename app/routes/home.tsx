import type { Route } from "./+types/home";
import { MunitorumLandingPage } from "../pages/welcome/welcome";
import { ThemeProvider } from "~/components/theme-provider";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Munitorum" },
    { name: "description", content: "Welcome to Munitorum!" },
  ];
}

export default function Home() {
  return (
      <MunitorumLandingPage />
  );
}
