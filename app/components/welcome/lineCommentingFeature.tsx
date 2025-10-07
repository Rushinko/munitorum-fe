import { MessageCircle } from "lucide-react";
import { Badge } from "~/components/ui/badge";

function LineCommentingFeature() {
  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-4">
            <Badge className=" text-sm" >Tactical Analysis</Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">
              Line-by-Line Feedback
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Move beyond generic comments. Get granular, line-by-line feedback on your unit choices, wargear, and stratagems, just like a code review on GitHub. Pinpoint weaknesses and optimize every part of your list.
            </p>
          </div>
          <div className="p-6 bg-background rounded-lg border border-accent font-mono text-sm text-gray-300">
            <div className="flex justify-between items-center mb-2 pb-2 border-b border-gray-700">
              <span className="text-muted-foreground">++ Lions of the Emperor (Imperium - Adeptus Custodes) [2,000pts] ++</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-start group">
                <span className="text-muted-foreground w-8">140</span>
                <span className="text-foreground">Trajann Valoris</span>
                <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <MessageCircle className="h-4 w-4 text-primary cursor-pointer" />
                </span>
              </div>
              <div className="relative flex items-start group bg-accent/50 border-l-2 border-accent pl-2">
                <span className="text-muted-foreground w-8">145</span>
                <span className="text-foreground">Custodian Wardens</span>
                <span className="ml-auto opacity-0 group-hover:opacity-100 items-center transition-opacity">
                  <MessageCircle className="h-4 w-4 text-primary cursor-pointer" />
                </span>
                <div className="absolute left-full ml-4 w-64 p-3 rounded-md bg-card border border-accent shadow-lg hidden lg:block">
                  <p className="font-sans text-xs text-foreground"><strong className="text-primary">@Strategos:</strong> Have you considered Pact of Flesh here? Great for keeping your Terminators alive.</p>
                </div>
              </div>
              <div className="flex items-start group">
                <span className="text-muted-foreground w-8">165</span>
                <span className="text-foreground">10x Legionaries</span>
                <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                   <MessageCircle className="h-4 w-4 text-primary cursor-pointer" />
                </span>
              </div>
              <div className="flex items-start group">
                <span className="text-muted-foreground w-8">350</span>
                <span className="text-foreground">10x Chaos Terminators</span>
                <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                   <MessageCircle className="h-4 w-4 text-primary cursor-pointer" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LineCommentingFeature;