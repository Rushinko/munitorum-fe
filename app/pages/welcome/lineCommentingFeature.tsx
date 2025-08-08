import { MessageCircle } from "lucide-react";

function LineCommentingFeature() {
  return (
    <section className="py-20 md:py-28 bg-gray-950">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-gray-800 px-3 py-1 text-sm font-medium text-amber-400">
              Tactical Analysis
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
              Line-by-Line Feedback
            </h2>
            <p className="max-w-[600px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Move beyond generic comments. Get granular, line-by-line feedback on your unit choices, wargear, and stratagems, just like a code review on GitHub. Pinpoint weaknesses and optimize every part of your list.
            </p>
          </div>
          <div className="p-6 bg-gray-900 rounded-lg border border-gray-800 font-mono text-sm text-gray-300">
            <div className="flex justify-between items-center mb-2 pb-2 border-b border-gray-700">
              <span className="text-gray-500">++ Arks of Omen Detachment (Chaos - Chaos Space Marines) [102 PL, 2,000pts, 4CP] ++</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-start group">
                <span className="text-gray-500 w-8">255</span>
                <span className="text-amber-300">Abaddon the Despoiler</span>
                <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <MessageCircle className="h-4 w-4 text-blue-400 cursor-pointer" />
                </span>
              </div>
              <div className="relative flex items-start group bg-blue-900/20 border-l-2 border-blue-400 pl-2">
                <span className="text-gray-500 w-8">145</span>
                <span className="text-cyan-300">Master of Possession</span>
                <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <MessageCircle className="h-4 w-4 text-blue-400 cursor-pointer" />
                </span>
                <div className="absolute left-full ml-4 w-64 p-3 rounded-md bg-gray-800 border border-gray-700 shadow-lg hidden lg:block">
                  <p className="font-sans text-xs text-white"><strong className="text-blue-400">@Strategos:</strong> Have you considered Pact of Flesh here? Great for keeping your Terminators alive.</p>
                </div>
              </div>
              <div className="flex items-start group">
                <span className="text-gray-500 w-8">165</span>
                <span className="text-pink-400">10x Legionaries</span>
                <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                   <MessageCircle className="h-4 w-4 text-blue-400 cursor-pointer" />
                </span>
              </div>
              <div className="flex items-start group">
                <span className="text-gray-500 w-8">350</span>
                <span className="text-red-400">10x Chaos Terminators</span>
                <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                   <MessageCircle className="h-4 w-4 text-blue-400 cursor-pointer" />
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