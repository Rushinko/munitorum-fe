import React from 'react'
import { Menu, Shield, ShieldCheck } from "lucide-react"
import { Button, ButtonLink } from "~/components/ui/button/button"
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from "~/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet"
import { cn } from "~/lib/utils"
import { Link } from 'react-router'
import LogoButton from '~/components/ui/button/logoButton'


export default function AppHeader() {

  const navItems = [
    { name: 'Browse Lists', href: '#' },
    { name: 'Battle Reports', href: '#' },
    { name: 'About', href: '#' },
  ]
  return (
    <header className="sticky top-0 z-50 w-full border-accent mask-to-t backdrop-blur-sm">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <LogoButton size="lg" />
        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
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
        <div className="hidden lg:flex items-center gap-2">
          <ButtonLink to='/login' variant="ghost">
            Login
          </ButtonLink>
          <ButtonLink to="/signup" variant="default">
            Sign Up
          </ButtonLink>
        </div>
      </div>

    </header>
  )
}
