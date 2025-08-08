import { BarChart3, Camera, ShieldCheck } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"

function FeatureHighlightSection() {
  const features = [
    {
      icon: ShieldCheck,
      title: 'Craft & Share Lists',
      description: 'Build your army lists with a clean, intuitive interface. Share them with a unique link or make them public for everyone to see.',
    },
    {
      icon: BarChart3,
      title: 'Track Winrates',
      description: 'Log your battle reports and automatically calculate win/loss rates. See how your list performs against different factions.',
    },
    {
      icon: Camera,
      title: 'Showcase Your Army',
      description: 'A picture is worth a thousand words. Upload photos of your painted army in action or staged for the parade ground.',
    },
  ]

  return (
    <section id="features" className="py-20 md:py-28 bg-gray-900">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">The Emperor's Finest Toolkit</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">Everything you need to plan your conquest of the tabletop.</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-gray-900 border-gray-800 hover:border-amber-500/50 transition-colors">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-gray-800 p-3 rounded-full">
                  <feature.icon className="h-6 w-6 text-amber-400" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-100">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeatureHighlightSection