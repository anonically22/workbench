import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function ToolShell({ title, description, badge, children }) {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-4">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to all tools
                </Link>
                <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold text-text-primary">{title}</h1>
                    {badge && (
                        <span className="px-2 py-0.5 text-xs font-semibold bg-primary/10 text-primary rounded-full">
                            {badge}
                        </span>
                    )}
                </div>
                <p className="text-lg text-text-secondary max-w-2xl border-l-2 border-border pl-4">
                    {description}
                </p>
            </div>

            <div className="bg-surface rounded-card border border-border shadow-soft overflow-hidden min-h-[400px]">
                {children}
            </div>
        </div>
    );
}
