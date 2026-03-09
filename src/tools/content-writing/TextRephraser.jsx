import { useState } from 'react';
import { RefreshCw, Copy, Repeat, Info, MessageSquare } from 'lucide-react';

const SYNONYMS = {
    'build': ['construct', 'develop', 'create', 'engineer'],
    'fast': ['rapid', 'efficient', 'quick', 'swift'],
    'beautiful': ['stunning', 'elegant', 'aesthetic', 'gorgeous'],
    'important': ['critical', 'essential', 'pivotal', 'vital'],
    'easy': ['intuitive', 'seamless', 'simple', 'effortless']
};

export default function TextRephraser() {
    const [text, setText] = useState('Nixby helps you build beautiful UIs fast.');
    const [result, setResult] = useState('');

    const rephrase = () => {
        let rephrased = text;
        Object.entries(SYNONYMS).forEach(([word, list]) => {
            const regex = new RegExp(`\\b${word}\\b`, 'gi');
            if (text.match(regex)) {
                const replacement = list[Math.floor(Math.random() * list.length)];
                rephrased = rephrased.replace(regex, replacement);
            }
        });
        setResult(rephrased);
    };

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 space-y-6">
                <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase text-text-secondary tracking-widest px-1">Original Pitch / Copy</label>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full h-48 p-8 rounded-[40px] border-2 border-border bg-background focus:border-primary outline-none transition-all text-xl font-bold leading-relaxed shadow-soft"
                        placeholder="Nixby makes design faster..."
                    />
                </div>

                <div className="bg-primary/5 h-48 rounded-[40px] border-2 border-dashed border-primary/20 p-8 flex flex-col justify-center items-center text-center relative group">
                    {result ? (
                        <p className="text-xl font-black text-primary animate-in fade-in slide-in-from-bottom-2 duration-500">
                            {result}
                        </p>
                    ) : (
                        <div className="opacity-20 flex flex-col items-center gap-2">
                            <MessageSquare size={32} />
                            <p className="text-sm font-bold uppercase tracking-widest">Output variations will appear here</p>
                        </div>
                    )}

                    {result && (
                        <button
                            onClick={() => navigator.clipboard.writeText(result)}
                            className="absolute bottom-6 right-6 p-3 bg-white border border-border rounded-2xl shadow-sm text-primary hover:shadow-md transition-all"
                        >
                            <Copy size={18} />
                        </button>
                    )}
                </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
                <div className="bg-sidebar p-8 rounded-[40px] border border-border space-y-8">
                    <div className="text-center space-y-2">
                        <Repeat className="text-primary mx-auto" size={32} />
                        <h3 className="text-xl font-bold text-text-primary">Content Variations</h3>
                        <p className="text-xs text-text-secondary">Swap keywords for fresh perspective.</p>
                    </div>

                    <button
                        onClick={rephrase}
                        className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-white rounded-2xl font-bold hover:shadow-xl transition-all active:scale-95"
                    >
                        <RefreshCw size={18} />
                        Generate Rephrase
                    </button>
                </div>

                <div className="p-6 bg-surface border border-border rounded-3xl space-y-4">
                    <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest">
                        <Info size={14} />
                        How it works
                    </div>
                    <p className="text-[11px] text-text-secondary leading-relaxed">
                        Nixby scans your text for common design keywords and swaps them with high-impact synonyms. Perfect for A/B testing copy.
                    </p>
                </div>
            </div>
        </div>
    );
}
