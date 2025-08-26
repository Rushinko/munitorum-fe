import DashboardPage from "~/pages/dashboard";
import type { Route } from "./+types/calculator";
import { getBattleReports, getLists } from "~/components/armyList/service";
import useAppStore from "~/lib/store";
import { Outlet } from "react-router";
import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card/card";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Munitorum" },
    { name: "Browse", content: "Welcome to the Browse!" },
  ];
}
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return {}
}

export default function Calculator(props: Route.ComponentProps) {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Calculator</CardTitle>
        </CardHeader>
        <CardDescription>
          <p>Calculate damage, charge odds, and more!</p>
        </CardDescription>
      </Card>
    </div>
  );
}
