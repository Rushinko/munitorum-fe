import React from 'react'
import { Button, buttonVariants } from './button'
import { Link } from 'react-router'
import { ShieldCheck } from 'lucide-react'
import type { VariantProps } from 'class-variance-authority'

type LogoButtonProps = React.ComponentProps<"button"> & {
  logo?: boolean
}

const logoSizes = {
  default: "min-h-7 min-w-7",
  sm: "min-h-6 min-w-6",
  lg: "min-h-8 min-w-8",
  xl: "min-h-9 min-w-9",
  "2xl": "min-h-10 min-w-10",
  icon: "min-size-8",
}

export default function LogoButton({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"button"> & LogoButtonProps &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  return (
    <Button asChild variant="ghost" size={size} className={`flex hover:bg-transparent dark:hover:bg-transparent items-center gap-2 ${className}`} {...props}>
      <Link to="/">

          <ShieldCheck className={` ${size ? logoSizes[size] : ''}  min-w-7 text-primary`} />
          MUNITORUM
      </Link>
    </Button>
  )
}
