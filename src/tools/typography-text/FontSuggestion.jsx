import { useState } from 'react';
import { Type, RefreshCw, Star, ArrowRight, ExternalLink } from 'lucide-react';

const PAIRINGS = [
    {
        header: 'Inter',
        body: 'Inter',
        desc: 'Modern, clean, and highly readable. The gold standard for UI.',
        tags: ['Tech', 'SaaS', 'Clean']
    },
    {
        header: 'Playfair Display',
        body: 'Source Sans Pro',
        desc: 'Elegant serif headers with balanced sans body. Perfect for editorial.',
        tags: ['Editorial', 'Luxury', 'Classic']
    },
    {
        header: 'Space Grotesk',
        body: 'Inter',
        desc: 'Brutalist, high-character headers paired with solid body.',
        tags: ['Creative', 'Studio', 'Bold']
    },
    {
        header: 'Outfit',
        body: 'Outfit',
        desc: 'Geometric and premium. Great for modern consumer brands.',
        tags: ['Marketing', 'Brand', 'Modern']
    },
    {
        header: 'Fraunces',
        body: 'Montserrat',
        desc: 'Organic, soft-serif elegance with geometric precision.',
        tags: ['Lifestyle', 'Warm', 'Craft']
    }
];

export default function FontSuggestion() {
    const [index, setIndex] = useState(0);
    const current = PAIRINGS[index];

    const next = () => setIndex((index + 1) % PAIRINGS.length);

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-sidebar p-8 rounded-3xl border border-border space-y-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                            <Star size={14} fill="currentColor" />
                            Pro Pairing
                        </div>
                        <h3 className="text-xl font-bold text-text-primary">Curated pairings for your next project.</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="p-4 bg-white rounded-2xl border border-border shadow-sm">
                            <p className="text-[10px] font-black uppercase text-text-secondary mb-1">Heading Font</p>
                            <p className="text-sm font-bold text-primary">{current.header}</p>
                        </div>
                        <div className="p-4 bg-white rounded-2xl border border-border shadow-sm">
                            <p className="text-[10px] font-black uppercase text-text-secondary mb-1">Body Font</p>
                            <p className="text-sm font-bold text-primary">{current.body}</p>
                        </div>
                    </div>

                    <button
                        onClick={next}
                        className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-white rounded-2xl font-bold hover:shadow-xl transition-all active:scale-95"
                    >
                        <RefreshCw size={18} />
                        Shuffle Recommendation
                    </button>
                </div>

                <div className="p-6 bg-surface border border-border rounded-xl space-y-2">
                    <div className="flex flex-wrap gap-2">
                        {current.tags.map(t => (
                            <span key={t} className="px-2 py-0.5 bg-sidebar rounded-full text-[9px] font-black uppercase text-text-secondary tracking-widest">{t}</span>
                        ))}
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed pt-2">
                        {current.desc}
                    </p>
                </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
                <div className="bg-sidebar min-h-[500px] rounded-3xl border border-border p-12 transition-all duration-500 overflow-hidden relative group">
                    {/* Mock Content Preview */}
                    <div className="space-y-8">
                        <div className="space-y-2">
                            <h1 className="text-5xl font-black text-text-primary leading-[1.1]" style={{ fontFamily: current.header }}>
                                This is a stunning headline example
                            </h1>
                            <div className="flex gap-4 items-center">
                                <div className="h-1 bg-primary w-12 rounded-full" />
                                <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Subheading or Tagline</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <p className="text-lg leading-relaxed text-text-secondary" style={{ fontFamily: current.body }}>
                                Workbench is designed to simplify your creative workflow. Whether you're building a brand new landing page or optimizing assets for social media, our collection of browser-based tools run completely locally, protecting your privacy and speed.
                            </p>
                            <p className="text-lg leading-relaxed text-text-secondary" style={{ fontFamily: current.body }}>
                                Good typography isn't just about choosing a font; it's about the relationship between sizes, weights, and characters. This pairing has been chosen specifically for its balance of visual impact and long-form readability.
                            </p>
                        </div>

                        <div className="pt-4 flex gap-4">
                            <button className="px-8 py-3 bg-primary text-white rounded-xl font-bold shadow-lg" style={{ fontFamily: current.body }}>Get Started</button>
                            <button className="px-8 py-3 border-2 border-border rounded-xl font-bold text-text-primary" style={{ fontFamily: current.body }}>Learn More</button>
                        </div>
                    </div>

                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                        <a href={`https://fonts.google.com/?query=${current.header}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs font-bold text-primary bg-white px-3 py-1.5 rounded-full shadow-sm hover:shadow-md transition-all">
                            Google Fonts <ExternalLink size={12} />
                        </a>
                    </div>
                </div>

                <p className="text-[10px] text-center text-text-secondary italic">
                    * Preview uses fallback fonts. Visit Google Fonts for actual weight samples.
                </p>
            </div>
        </div>
    );
}
