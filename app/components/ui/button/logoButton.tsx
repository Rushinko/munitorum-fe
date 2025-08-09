import React from 'react'
import { Button } from './button'
import { Link } from 'react-router'
import { ShieldCheck } from 'lucide-react'

export default function LogoButton() {
  return (
    <Button asChild variant="ghost" className="flex hover:bg-transparent dark:hover:bg-transparent items-center gap-2">
          <Link to="/">
            <ShieldCheck className="min-h-7 min-w-7 text-primary" />
            <span className="text-xl font-bold tracking-wider text-foreground">
              MUNITORUM
            </span>
          </Link>
        </Button>
  )
}
