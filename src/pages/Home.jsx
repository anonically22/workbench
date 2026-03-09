import { tools } from '../data/tools';
import ToolCard from '../components/ToolCard';

export default function Home() {
    const categories = [...new Set(tools.map(tool => tool.category))];

    return (
        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Hero Section */}
            <section className="text-center space-y-4 pt-8">
                <h1 className="text-5xl font-black text-text-primary tracking-tight">
                    Nixby<span className="text-primary">.</span>
                </h1>
                <p className="text-xl text-text-secondary font-medium">
                    A personal toolkit for UI/UX and graphic design.
                </p>
                <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-text-secondary/50">
                    <span className="w-8 h-[1px] bg-border"></span>
                    100% Client-Side • No Tracking • Handmade
                    <span className="w-8 h-[1px] bg-border"></span>
                </div>
            </section>

            {/* Tools Grid */}
            <div className="space-y-12">
                {categories.map(category => (
                    <section key={category} className="space-y-6">
                        <div className="flex items-center gap-4">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-text-secondary shrink-0">
                                {category}
                            </h2>
                            <div className="h-[1px] w-full bg-border"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {tools
                                .filter(tool => tool.category === category)
                                .map(tool => (
                                    <ToolCard key={tool.slug} {...tool} />
                                ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}
