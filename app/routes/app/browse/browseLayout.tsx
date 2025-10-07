import type { Route } from "./+types/browseLayout";
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
