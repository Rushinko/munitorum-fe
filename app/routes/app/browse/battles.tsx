
import type { Route } from "./+types/battles";
import { getBattleReports, getLists } from "~/components/armyList/service";
import useAppStore from "~/lib/store";
import { Outlet } from "react-router";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Munitorum" },
    { name: "Browse Battles", content: "Browse Battles!" },
  ];
}
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return {}
}

export default function Battles(props: Route.ComponentProps) {
  return (
    <div>
      Browse Battles
    </div>
  );
}
