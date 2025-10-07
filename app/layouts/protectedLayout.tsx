import { useLayoutEffect } from "react";
import type { Route } from "./+types/protectedLayout";
import { Outlet, redirect } from "react-router";
import { handleLoggedInCheck } from "~/lib/service";
import { getProfile } from "~/components/profile/service";
import useAppStore from "~/lib/store";
import { AxiosError } from "axios";

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

export default function ProtectedLayout({
  loaderData,
}: Route.ComponentProps) {

  const setUser = useAppStore((state) => state.setUser);
  const user = useAppStore((state) => state.user);

  useLayoutEffect(() => {
    if (loaderData) {
      setUser(loaderData.user);
    }
  }, []);

  return (
    <Outlet />
  );
} 