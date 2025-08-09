import React from 'react'
import type { Route } from "./+types/signup";
import SignupPage from '~/pages/signup/signupPage';


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Munitorum" },
    { name: "description", content: "Sign up for Munitorum" },
  ];
}

export default function signup() {
  return (
    <SignupPage />
  )
}
