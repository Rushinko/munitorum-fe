import { ChevronRight } from "lucide-react";
import { Button } from "~/components/ui/button/button";

function CallToActionSection() {
  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">Ready for Battle?</h2>
        <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
          Join a community of commanders and start building your legacy today. Your next victory starts here.
        </p>
        <div className="mt-8">
          <Button size="lg" className=" font-bold text-lg px-8 py-6">
            Sign Up for Free
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default CallToActionSection;