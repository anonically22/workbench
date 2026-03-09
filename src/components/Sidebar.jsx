import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { tools } from '../data/tools';
import { ChevronLeft, ChevronRight, LayoutGrid, Info } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function Sidebar({ isOpen, setIsOpen }) {
    const categories = [...new Set(tools.map(tool => tool.category))];

    return (
        <aside
            className={cn(
                "fixed left-0 top-0 h-screen bg-sidebar border-r border-border transition-all duration-300 z-50 flex flex-col",
                isOpen ? "w-64" : "w-16"
            )}
        >
            <div className="p-4 flex items-center justify-between border-b border-border h-16">
                {isOpen && (
                    <Link to="/" className="flex items-center gap-2 font-bold text-text-primary overflow-hidden whitespace-nowrap">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white shrink-0">
                            N
                        </div>
                        <span>Nixby</span>
                    </Link>
                )}
                {!isOpen && (
                    <Link to="/" className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white mx-auto">
                        N
                    </Link>
                )}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-1 hover:bg-border rounded text-text-secondary transition-colors"
                >
                    {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-3 space-y-6">
                <div>
                    <NavLink
                        to="/"
                        className={({ isActive }) => cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors overflow-hidden whitespace-nowrap",
                            isActive ? "bg-primary text-white" : "text-text-secondary hover:bg-border hover:text-text-primary"
                        )}
                    >
                        <LayoutGrid size={20} className="shrink-0" />
                        {isOpen && <span>All Tools</span>}
                    </NavLink>
                </div>

                {categories.map(category => (
                    <div key={category} className="space-y-1">
                        {isOpen && <h3 className="px-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">{category}</h3>}
                        <div className="space-y-1">
                            {tools.filter(t => t.category === category).map(tool => (
                                <NavLink
                                    key={tool.slug}
                                    to={`/tools/${tool.slug}`}
                                    className={({ isActive }) => cn(
                                        "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors overflow-hidden whitespace-nowrap",
                                        isActive ? "bg-primary/10 text-primary font-medium" : "text-text-secondary hover:bg-border hover:text-text-primary"
                                    )}
                                >
                                    <div className="w-5 h-5 flex items-center justify-center shrink-0">
                                        <span className="text-[10px] font-bold">{tool.name.charAt(0)}</span>
                                    </div>
                                    {isOpen && <span className="truncate">{tool.name}</span>}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                ))}
            </nav>

            <div className="p-4 border-t border-border">
                {isOpen ? (
                    <div className="text-xs text-text-secondary text-center space-y-1">
                        <p className="font-medium">No logins. No tracking.</p>
                        <p>© {new Date().getFullYear()} Nixby</p>
                    </div>
                ) : (
                    <div className="flex justify-center text-text-secondary" title="No logins. No tracking.">
                        <Info size={20} />
                    </div>
                )}
            </div>
        </aside>
    );
}
