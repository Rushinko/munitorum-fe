import React from 'react'
import { Menu, Shield, ShieldCheck } from "lucide-react"
import { Button } from "~/components/ui/button"
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from "~/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet"
import { cn } from "~/lib/utils"


export default function AppHeader() {

  const navItems = [
    { name: 'Browse Lists', href: '#' },
    { name: 'Battle Reports', href: '#' },
    { name: 'About', href: '#' },
  ]
  return (
    <header className="sticky top-0 z-50 w-full border-accent mask-to-t backdrop-filter backdrop-blur-sm">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <a href="#" className="flex items-center gap-2">
          <ShieldCheck className="h-7 w-7 text-amber-400" />
          <span className="text-xl font-bold tracking-wider text-gray-50">
            MUNITORUM
          </span>
        </a>
        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {navItems.map((item) => (
              <NavigationMenuItem key={item.name}>
                <a href={item.href} className={cn(navigationMenuTriggerStyle(), 'bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white')}>
                  {item.name}
                </a>
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
            <SheetContent side="right" className="w-full max-w-xs bg-gray-900 border-l border-gray-800 text-gray-50">
              <div className="flex flex-col p-6 space-y-4">
                 <a href="#" className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="h-7 w-7 text-amber-400" />
                  <span className="text-lg font-bold">MUNITORUM</span>
                </a>
                {navItems.map((item) => (
                   <a key={item.name} href={item.href} className="text-lg font-medium hover:text-amber-400">
                     {item.name}
                   </a>
                ))}
                 <div className="border-t border-gray-800 pt-4 space-y-2">
                    <Button className="w-full bg-amber-500 hover:bg-amber-600 text-gray-950">Login</Button>
                    <Button variant="outline" className="w-full border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-gray-950">Sign Up</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden lg:flex items-center gap-2">
          <Button variant="ghost" className="text-gray-300 hover:bg-gray-800 hover:text-white">Login</Button>
          <Button className="bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold">Sign Up</Button>
        </div>
      </div>
    </header>
  )
}
