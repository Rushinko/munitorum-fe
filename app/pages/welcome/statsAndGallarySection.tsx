import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

function StatsAndGallerySection() {
    return (
        <section className="py-20 md:py-28 bg-gray-900">
            <div className="container mx-auto max-w-7xl px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">Data-Driven Dominance</h2>
                        <p className="mt-4 text-lg text-gray-400">
                           Analyze your performance with detailed battle reports. Track your winrates against different armies and see your list's evolution over time. Make informed decisions backed by your own gameplay data.
                        </p>
                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <Card className="bg-gray-800 border-gray-700">
                                <CardHeader>
                                    <CardTitle className="text-amber-400">Winrate vs. Factions</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2 text-sm">
                                    <p>vs T'au Empire: <span className="font-bold text-green-400">75% (3-1)</span></p>
                                    <p>vs Aeldari: <span className="font-bold text-red-400">33% (1-2)</span></p>
                                    <p>vs Orks: <span className="font-bold text-green-400">100% (2-0)</span></p>
                                </CardContent>
                            </Card>
                             <Card className="bg-gray-800 border-gray-700">
                                <CardHeader>
                                    <CardTitle className="text-amber-400">Overall Performance</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-4xl font-bold text-white">6W - 3L</p>
                                    <p className="text-lg text-green-400 font-semibold">66.7%</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                     <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[400px]">
                        <div className="col-span-1 row-span-2 rounded-lg overflow-hidden">
                            <img src="https://i.imgur.com/7bM555U.jpeg" alt="Warhammer Army 1" className="w-full h-full object-cover"/>
                        </div>
                         <div className="col-span-1 row-span-1 rounded-lg overflow-hidden">
                            <img src="https://i.imgur.com/N7a6tGk.jpeg" alt="Warhammer Army 2" className="w-full h-full object-cover"/>
                        </div>
                         <div className="col-span-1 row-span-1 rounded-lg overflow-hidden">
                            <img src="https://i.imgur.com/1nLqK9O.jpeg" alt="Warhammer Army 3" className="w-full h-full object-cover"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default StatsAndGallerySection;
