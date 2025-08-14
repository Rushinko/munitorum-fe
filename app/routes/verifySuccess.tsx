import React from 'react'
import type { Route } from "./+types/verifySuccess";
import { Link, useNavigate } from 'react-router';
import { Button } from '~/components/ui/button/button';


export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Email Verified!" },
    { name: "description", content: "Your email has been successfully verified." },
  ];
}

export default function verifySuccess({
}: Route.ComponentProps) {

  const navigate = useNavigate();

  React.useEffect(() => {
    // Redirect to success page after verification
    setTimeout(() => {
      navigate('/login');
    }, 3000); // Redirect after 3 seconds
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <div>
        Your email has been successfully verified! you will now be redirected to the login page.
      </div>
      <div className="mt-4">
        <p className='text-sm text-muted-foreground'>If you are not redirected, please click <Button variant="link" asChild><Link to="/login">here</Link></Button></p>
      </div>
    </div>
  )
}
