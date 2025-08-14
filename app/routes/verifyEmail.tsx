import React from 'react'
import type { Route } from "./+types/verifyEmail";
import { Button, LogoButton } from '~/components/ui/button';


export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Munitorum" },
    { name: "description", content: "Sign up for Munitorum" },
  ];
}

export async function clientLoader({ params, request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  // Extract email from the URL query parameters
  const email = url.searchParams.get('email') || '';
  if (!email) {
    throw new Response("Email parameter is required", { status: 404 });
  }
  return { email };
};

export default function verifyEmail({
  loaderData,
}: Route.ComponentProps) {

  const email = loaderData?.email || '';
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">

      <div className="mb-6">
        <LogoButton size="2xl" logo />
      </div>
      <h1>Verify Your Email</h1>
      <p>Email sent to <span className='font-bold'>{email}</span>. Please check your email for a verification link.</p>
      <p className='mb-4'>If you didn't receive an email, please check your spam folder or press the button to resend the verification email
      </p>
      <Button variant="default" className='mb-24' onClick={() => alert('Resend verification email')}>
        Resend Verification Email
      </Button>
      <p className='text-sm text-muted-foreground'>If you have any issues, please contact support.</p>
      <p className="text-sm text-muted-foreground">
        By signing up, you agree to our <a href="/terms" className="text-primary">Terms of Service</a> and <a href="/privacy" className="text-primary">Privacy Policy</a>.
      </p>
    </div>
  )
}
