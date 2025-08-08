import React from "react";
import { ChevronRight, Swords } from "lucide-react";
import { Button } from "~/components/ui/button";

// 2. Hero Section
function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 bg-fill bg-bottom" style={{ backgroundImage: 'linear-gradient(rgba(17, 24, 39, 0.8), rgba(17, 24, 39, 1)), url(https://taleofpainters.com/wp-content/uploads/2018/07/ultramarines_stahly_armyshot.jpg.webp)' }}>
      <div className="container mx-auto max-w-7xl px-4 md:px-6 text-center">
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-white">
          Forge Your Legend. Share Your Lists.
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-300 md:text-xl">
          Munitorum is the ultimate arsenal for Warhammer 40,000 players. Craft, share, and refine your army lists with tactical feedback from the entire community.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-lg px-8 py-6">
            <Swords className="mr-2 h-5 w-5" />
            Share Your First List
          </Button>
          <Button size="lg" variant="outline" className="border-2 border-gray-600 text-gray-200 hover:bg-gray-800 hover:text-white hover:border-gray-500 font-bold text-lg px-8 py-6">
            Browse Public Lists
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default HeroSection;