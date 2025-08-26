import DashboardPage from "~/pages/dashboard";
import type { Route } from "./+types/lists";
import { getBattleReports, getLists } from "~/components/armyList/service";
import useAppStore from "~/lib/store";
import { Outlet } from "react-router";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Munitorum" },
    { name: "Browse Lists", content: "Browse Lists!" },
  ];
}
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return {}
}

export default function Lists(props: Route.ComponentProps) {
  return (
    <div>
      Browse Lists
    </div>
  );
}
