import React from 'react'
import { Card, CardContent, CardDescription } from './card'
import { Info } from 'lucide-react';

type ErrorCardProps = React.ComponentProps<typeof Card> & {
  className?: string;
  message?: string;
  children?: React.ReactNode;
}

export default function ErrorCard({ message, children, className }: ErrorCardProps) {
  return (
    <div className={`error-bubble absolute grid grid-cols-8 items-center left-full ml-2 mt-4 w-max max-w-xs px-3 py-2 z-10 text-sm font-medium text-error-foreground bg-error rounded-md shadow-lg ${className}`}>
      <Info className="mr-2 mb-1 size-6" />
      <span className="col-span-7">
        {children ? children : (message ? message : "An error occurred. Please try again.")}
      </span>
    </div>
  )
}
