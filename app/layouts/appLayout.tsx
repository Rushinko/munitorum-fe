import { Outlet } from "react-router";
import AppHeader from "~/components/ui/appHeader";

export default function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex flex-grow p-4 bg-background justify-center">
        <Outlet />
      </main>
      <footer className="bg-card text-foreground p-4 text-center">
        © 2025 Rushsoft
      </footer>
    </div>
  );
} 