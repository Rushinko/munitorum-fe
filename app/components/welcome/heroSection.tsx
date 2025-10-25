import React from "react";
import { ChevronRight, ShieldCheck, Swords } from "lucide-react";
import { Button } from "~/components/ui/button/button";
import { Link } from "react-router";
import Logo from "~/components/ui/logo";

// 2. Hero Section
function HeroSection() {
  return (
    <section className="relative py-20 md:py-16 flex items-center justify-center h-[75vh] bg-cover bg-no-repeat bg-top" style={{ backgroundImage: 'linear-gradient(to bottom, var(--image-gradient-start) 0%, var(--image-gradient-middle) 60%, var(--image-gradient-end) 100%), url(https://taleofpainters.com/wp-content/uploads/2018/07/ultramarines_stahly_armyshot.jpg.webp)' }}>
      <div className="container mx-auto max-w-7xl px-4 md:px-6 items-center text-center">
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