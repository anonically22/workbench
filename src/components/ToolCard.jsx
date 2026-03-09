import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function ToolCard({ slug, name, description, badge }) {
    return (
        <Link
            to={`/tools/${slug}`}
            className="group bg-surface p-6 rounded-card border border-border shadow-sm hover:shadow-soft hover:border-primary/30 transition-all duration-300 flex flex-col h-full relative"
        >
            {badge && (
                <span className="absolute top-4 right-4 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary rounded-full">
                    {badge}
                </span>
            )}
            <div className="flex-1 space-y-3">
                <div className="w-10 h-10 bg-sidebar rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <span className="font-bold">{name.charAt(0)}</span>
                </div>
                <h3 className="text-lg font-bold text-text-primary group-hover:text-primary transition-colors">
                    {name}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                    {description}
                </p>
            </div>
            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Open Tool
                <ArrowRight size={14} />
            </div>
        </Link>
    );
}
