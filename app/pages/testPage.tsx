
import { Button } from "~/components/ui/button";
import { Slider } from "~/components/ui/slider";

export function TestPage() {
  return (
    <main className="w-screen h-screen flex items-center justify-center p-4">
      <div className="flex flex-col items-center justify-center gap-12 w-full">
        <div className="flex flex-row items-center justify-center gap-4">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
        <Slider defaultValue={[50]} max={100} step={1} className="w-64" />
      </div>

    </main>
  );
}
