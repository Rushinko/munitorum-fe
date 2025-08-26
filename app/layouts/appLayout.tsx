import { useEffect, useLayoutEffect } from "react";
import type { Route } from "./+types/appLayout";
import { Outlet, redirect } from "react-router";
import { handleLoggedInCheck, type ApiError } from "~/lib/service";
import { getProfile } from "~/components/profile/service";
import useAppStore from "~/lib/store";
import { AxiosError } from "axios";
import { any } from "zod";
import AppHeader from "~/components/ui/appHeader";
import type { User } from "~/lib/types";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  await handleLoggedInCheck();
  try {
    const getProfileResponse = await getProfile();
    const { user } = getProfileResponse.data;
    return { user };
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError) {
      if (axiosError && axiosError.status !== 200) {
        return redirect("/login");
      }
    }
    console.error("Error fetching user profile:", axiosError.response?.data);
  }
}

export default function AppLayout({
  loaderData,
}: Route.ComponentProps) {

  const setUser = useAppStore((state) => state.setUser);
  const user = useAppStore((state) => state.user);

  useLayoutEffect(() => {
    if (loaderData) {
      console.log("Setting user in store:", loaderData.user);
      setUser(loaderData.user);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex-grow p-4 bg-background">
        <Outlet />
      </main>
      <footer className="bg-card text-foreground p-4 text-center">
        © 2025 Rushsoft
      </footer>
    </div>
  );
} 