import React from "react";
import { ChevronRight, Swords } from "lucide-react";
import { Button } from "~/components/ui/button/button";
import { Link } from "react-router";

// 2. Hero Section
function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 bg-cover bg-bottom" style={{ backgroundImage: 'linear-gradient(var(--image-gradient-start) 0, var(--image-gradient-middle) 50%, var(--image-gradient-end) 100%), url(https://taleofpainters.com/wp-content/uploads/2018/07/ultramarines_stahly_armyshot.jpg.webp)' }}>
      <div className="container mx-auto max-w-7xl px-4 md:px-6 text-center">
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-foreground">
          Forge Your Legend. Share Your Lists.
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg text-accent-foreground md:text-xl">
          Munitorum is the ultimate arsenal for any Warhammer player. Craft, share, and refine your army lists with tactical feedback from the entire community.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button asChild size="lg" className="font-bold text-lg px-8 py-6 shadow-sm">
            <Link to="/signup">
              <Swords className="mr-2 h-5 w-5" />
              Share Your First List
            </Link>
          </Button>
          <Button size="lg" variant="outline" className=" font-bold text-lg px-8 py-6 shadow-sm">
            Browse Public Lists
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default HeroSection;