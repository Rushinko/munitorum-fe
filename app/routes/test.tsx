import type { Route } from "./+types/test";
import { TestPage } from "~/routes/app/testPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <TestPage />;
}


