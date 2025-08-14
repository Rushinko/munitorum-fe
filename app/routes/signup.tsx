import React from 'react'
import type { Route } from "./+types/signup";
import { SignupForm } from '~/pages/auth/signup/signupForm';


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Munitorum" },
    { name: "description", content: "Sign up for Munitorum" },
  ];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return "This is the client loader for the signup route.";
};

export default function signup() {
  return (
    <SignupForm />
  )
}
