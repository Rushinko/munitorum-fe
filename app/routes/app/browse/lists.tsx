import type { Route } from "./+types/lists";


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
