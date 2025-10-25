import { Outlet } from "react-router";
import AppHeader from "~/components/ui/appHeader";

export default function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen  min-w-screen">
      <AppHeader />
      <main className="flex flex-col p-6 bg-background justify-center max-w-screen sm:max-w-full mb-auto w-full">
        <Outlet />
      </main>
      <footer className="bg-card text-foreground p-4 relative bottom-0 left-0 right-0  min-w-full text-center">
        © 2025 Rushsoft
      </footer>
    </div>
  );
} 