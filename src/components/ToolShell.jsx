import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function ToolShell({ title, description, badge, children }) {
    return (
        <div className="max-w-5xl mx-auto space-y-12 py-8 animate-in fade-in duration-500">
            {/* Tool Header */}
            <div className="space-y-6">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black hover:bg-black hover:text-white border-2 border-transparent hover:border-black px-3 py-1.5 transition-all group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" strokeWidth={2.5} />
                    Back to Bench
                </Link>

                <div className="space-y-4 border-l-4 border-black pl-6">
                    <h1 className="text-5xl md:text-7xl font-bold text-black tracking-[0.2em] uppercase leading-none">
                        {title}
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-700 font-medium max-w-2xl leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>

            {/* Tool Canvas */}
            <div className="bg-white border-2 border-black brutalist-shadow min-h-[500px] p-6 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 border-b-2 border-l-2 border-black bg-accent/10 opacity-50 select-none pointer-events-none">
                    <span className="font-mono text-xs font-bold tracking-widest uppercase">TOOL_CANVAS ACTIVE</span>
                </div>
                <div className="h-full relative z-10 pt-8">
                    {children}
                </div>
            </div>
        </div>
    );
}
