import LandingPage from "~/pages/landingPage";
import type { Route } from "./+types/landing";
import { TestPage } from "~/pages/testPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <LandingPage />;
}
