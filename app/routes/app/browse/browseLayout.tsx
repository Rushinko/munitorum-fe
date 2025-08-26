import DashboardPage from "~/pages/dashboard";
import type { Route } from "./+types/browseLayout";
import { getBattleReports, getLists } from "~/components/armyList/service";
import useAppStore from "~/lib/store";
import { Outlet } from "react-router";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Munitorum" },
    { name: "Browse", content: "Welcome to the Browse!" },
  ];
}
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return {}
}

export default function BrowseLayout(props: Route.ComponentProps) {
  return (
    <div>
      Browse:
      <Outlet />
    </div>
  );
}
