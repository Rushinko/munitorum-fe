import DashboardPage from "~/pages/dashboard";
import type { Route } from "./+types/index";
import { getBattleReports, getLists } from "~/components/armyList/service";
import useAppStore from "~/lib/store";
import { Outlet } from "react-router";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card/card";
import { Button, ButtonLink } from "~/components/ui/button/button";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Munitorum" },
    { name: "Browse", content: "Welcome to the Browse!" },
  ];
}
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return {}
}

export default function Tools(props: Route.ComponentProps) {
  return (
    <div className="p-4">
      <h1 className="text-xl">Welcome to the tools page!</h1>
      <div className="flex overflow-auto justify-start gap-4 mt-8">
        <Card className="w-sm">
          <CardHeader>
            <CardTitle>Calculator</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Calculate damage, charge odds, and more!</p>
          </CardContent>
          <CardFooter>
            <ButtonLink to="./calculator">OPEN</ButtonLink>
          </CardFooter>
        </Card>
        <Card className="w-sm">
          <CardHeader>
            <CardTitle>List Builder</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Create lists from within Munitorum!</p>
          </CardContent>
          <CardFooter>
            <Button disabled>COMING SOON</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
