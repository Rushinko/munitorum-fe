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
        <LogoButton />
        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {navItems.map((item) => (
              <NavigationMenuItem key={item.name}>
                <Button asChild variant="ghost" className='hover:bg-accent/50'>
                  <Link to={item.href}>
                    {item.name}
                  </Link>
                </Button>
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
                <a href="#" className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="h-7 w-7 text-primary" />
                  <span className="text-lg font-bold">MUNITORUM</span>
                </a>
                {navItems.map((item) => (
                  <a key={item.name} href={item.href} className="text-lg font-medium hover:text-primary">
                    {item.name}
                  </a>
                ))}
                <div className="border-t border-accent pt-4 space-y-2">
                  <Button className="w-full bg-primary hover:bg-primary text-primary-foreground">Login</Button>
                  <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">Sign Up</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden lg:flex items-center gap-2">
          <Button asChild variant="ghost">
            <Link to="/login">
              Login
            </Link>
          </Button>
          <Button asChild variant="default">
            <Link to="/signup">
              Sign Up
            </Link>
          </Button>
        </div>
      </div>

    </header>
  )
}
