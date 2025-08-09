import React from 'react'
import type { Route } from "./+types/login";
import LoginPage from '~/pages/login/loginPage';


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Munitorum" },
    { name: "description", content: "Login to Munitorum" },
  ];
}

export default function login() {
  return (
    <LoginPage />
  )
}
