import React from 'react'
import { Menu, Shield, ShieldCheck } from "lucide-react"
import { Button, ButtonLink } from "~/components/ui/button/button"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "~/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet"
import { cn } from "~/lib/utils"
import { Link } from 'react-router'
import LogoButton from '~/components/ui/button/logoButton'
import useAppStore from '~/lib/store'
import apiClient, { handleLogout } from '~/lib/service'
import { postLogout } from '../../routes/app/auth/signup/services'
import { Avatar, AvatarFallback, AvatarImage, ProfileAvatar } from '~/components/ui/avatar'
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '~/components/ui/dropdown-menu'


export default function LandingHeader() {

  const user = useAppStore((state) => state.user);
  const navItems = [
    { name: 'Browse Lists', href: '/app/lists' },
    { name: 'Battle Reports', href: '/app/battles' },
    { name: 'Tools', href: '/app/tools' },
  ]

  return (
    <header className="sticky top-0 z-20 w-full mask-to-t border-accent backdrop-blur-sm">
      <div className="container mx-auto flex h-24 max-w-7xl items-center justify-center px-6 ">
        <div className='flex flex-1'>
          <LogoButton size="xl" />
          {/* Desktop Navigation */}
          <div className='flex justify-center'>
            <NavigationMenu className="hidden lg:flex margin left-4">
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    <ButtonLink to={item.href} variant="ghost" className='hover:bg-accent/50'>
                      {item.name}
                    </ButtonLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-accent border-l border-accent text-foreground">
              <div className="flex flex-col p-6 space-y-4">
                <LogoButton size="lg" />
                {navItems.map((item) => (
                  <ButtonLink
                    key={item.name}
                    to={item.href}
                    variant="ghost"
                    className="w-full text-left hover:bg-accent/50"
                  >
                    {item.name}
                  </ButtonLink>
                ))}

                <ButtonLink to="/login" variant="outline">Login</ButtonLink>
                <ButtonLink to="/signup" variant="default">Sign Up</ButtonLink>

              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className=' hidden lg:flex flex-1 justify-end'>
          <div className="hidden lg:flex items-center gap-2">
            <ButtonLink to='/login' variant="ghost">
              Login
            </ButtonLink>
            <ButtonLink to="/signup" variant="default">
              Sign Up
            </ButtonLink>
          </div>
        </div>
      </div>
    </header >
  )
}
