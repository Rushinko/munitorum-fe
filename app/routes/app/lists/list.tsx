import DashboardPage from "~/routes/app/dashboard/index";
import type { Route } from "./+types/list";
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

export default function List(props: Route.ComponentProps) {
  return (
    <div>
      List
    </div>
  );
}
