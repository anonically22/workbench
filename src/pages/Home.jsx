import { useState } from 'react';
import { motion } from 'framer-motion';
import { tools } from '../data/tools';
import ToolCard from '../components/ToolCard';
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function Home() {
    const [activeCategory, setActiveCategory] = useState("ALL TOOLS");

    const categories = ["ALL TOOLS", ...new Set(tools.map(t => t.category))];

    const filteredTools = tools.filter(tool => {
        return activeCategory === "ALL TOOLS" || tool.category === activeCategory;
    });

    return (
        <div className="animate-in fade-in duration-500">
            {/* Navigation / Categories */}
            <nav className="flex flex-wrap gap-4 mb-12 items-center">
                <div className="flex overflow-x-auto gap-4 pb-2 w-full flex-wrap">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={cn(
                                "whitespace-nowrap px-6 py-2 font-bold uppercase border-2 border-black transition-colors focus:outline-none",
                                activeCategory === cat
                                    ? "bg-black text-white"
                                    : "bg-white text-black hover:bg-slate-100"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </nav>

            {/* Tools Grid */}
            {filteredTools.length > 0 ? (
                <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
                    {filteredTools.map((tool, idx) => (
                        <motion.div
                            key={tool.slug}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: idx * 0.05 }}
                            className="h-full"
                        >
                            <ToolCard {...tool} />
                        </motion.div>
                    ))}
                </main>
            ) : (
                <div className="py-20 text-center border-2 border-black border-dashed">
                    <p className="text-2xl font-black uppercase">No tools found.</p>
                </div>
            )}
        </div>
    );
}
