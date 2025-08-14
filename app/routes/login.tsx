import React from 'react'
import type { Route } from "./+types/login";
import { LoginForm } from '~/pages/auth/login/loginForm';


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Munitorum" },
    { name: "description", content: "Login to Munitorum" },
  ];
}

export default function login() {
  return (
    <LoginForm />
  )
}
