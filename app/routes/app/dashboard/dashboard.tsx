import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card/card";
import useAppStore from "~/lib/store";
import type { Route } from "./+types/dashboard";
import { ButtonLink } from "~/components/ui/button/button";
import { getBattleReports, getLists } from "~/components/armyList/service";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Munitorum" },
    { name: "Dashboard", content: "Welcome to the Dashboard!" },
  ];
}
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  try {
    const lists = (await getLists()).data;
    const battleReports = (await getBattleReports()).data;
    return { lists, battleReports };
  } catch (error) {
    console.error("Error getting dashboard data:", error);
  }
  return {}
}

export default function Dashboard(props: Route.ComponentProps) {
  const currentUser = useAppStore((state) => state.user);
  const { loaderData } = props;
  const { lists } = loaderData;
  const { battleReports } = loaderData;

  return (
    <div className="m-8">
      <h1 className="text-2xl font-bold m-6">
        Welcome {currentUser?.name ? currentUser.name : currentUser?.username}!
      </h1>
      <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4">
        <Card >
          <CardHeader>
            <CardTitle>
              My Lists
            </CardTitle>
          </CardHeader>
          <CardContent>
            {
              lists && lists.length > 0 ? (
                <p>You have {lists.length} lists.</p>
              ) : (
                <p>You have not created any lists...</p>
              )
            }
          </CardContent>
          <CardFooter>
            <ButtonLink to="./lists" variant="outline">BROWSE LISTS</ButtonLink>
            <ButtonLink to="./lists/create" variant="default">CREATE AN ARMY</ButtonLink>
          </CardFooter>
        </Card>
        <Card >
          <CardHeader>
            <CardTitle>
              My Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            {
              battleReports && battleReports.length > 0 ? (
                <p>You have {battleReports.length} reports.</p>
              ) : (
                <p>You don't have any battle reports.</p>
              )
            }
          </CardContent>
          <CardFooter>
            <ButtonLink to="./battles" variant="outline">BROWSE REPORTS</ButtonLink>
            <ButtonLink to="./battles/create" variant="default">START A BATTLE</ButtonLink>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Dashboard",
  description: "Your personal dashboard",
};