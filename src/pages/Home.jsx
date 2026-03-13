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

    const categories = ["ALL TOOLS", ...new Set(tools.map(t => t.category).filter(Boolean))];

    const filteredTools = tools.filter(tool => {
        return activeCategory === "ALL TOOLS" || tool.category === activeCategory;
    });

    return (
        <div className="animate-in fade-in duration-500">
            {/* Hero Section */}
            <div className="mb-14 mt-4 max-w-2xl">
                <p className="text-xl md:text-2xl font-bold leading-relaxed mb-6">
                    A handcrafted collection of {tools.length} tools for designers and builders.<br/>
                    <span className="opacity-70">Small utilities. High utility. Zero friction.</span>
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-widest">
                    <span className="bg-accent/10 text-accent border-2 border-accent px-3 py-1">{tools.length} Tools</span>
                    <span className="bg-slate-100 border-2 border-slate-200 px-3 py-1">{categories.length - 1} Categories</span>
                    <span className="bg-slate-100 border-2 border-slate-200 px-3 py-1">100% Browser Based</span>
                </div>
            </div>

            {/* Tools Section Label */}
            <div className="flex items-center gap-4 mb-8">
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-black">{tools.length} Tools in the Workshop</h2>
                <div className="flex-grow h-px bg-slate-200"></div>
            </div>

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
