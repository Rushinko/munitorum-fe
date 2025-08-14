import DashboardPage from "~/pages/dashboard";
import type { Route } from "./+types/dashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Munitorum" },
    { name: "Dashboard", content: "Welcome to the Dashboard!" },
  ];
}

export default function Home() {
  return (
      <DashboardPage />
  );
}
