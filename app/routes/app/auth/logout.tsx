import React from 'react'
import type { Route } from "../../+types/logout";
import { postLogout } from '~/routes/app/auth/signup/services';
import { handleLogout } from '~/lib/service';
import { redirect } from 'react-router';
import useAppStore from '~/lib/store';
import { set } from 'zod';


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Munitorum" },
    { name: "description", content: "Login to Munitorum" },
  ];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const setUser = useAppStore.getState().setUser;
  setUser(null);
  try {
    await handleLogout(parseInt(params.userId));
  } catch (error) {
    console.error("Error logging out:", error);
  }
  return redirect("/");
}

export default function logout() {
  return null;
}
