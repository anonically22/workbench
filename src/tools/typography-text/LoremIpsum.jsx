import { useState } from 'react';
import { Type, Copy, RefreshCw, Layers, AlignLeft } from 'lucide-react';

const LOREM = [
    "Nixby is the ultimate design toolkit for modern creators. Build faster, smarter, and more efficiently with locally running browser tools.",
    "Typography is the soul of any interface. Choosing the right scale and weight can transform a basic layout into a premium experience.",
    "Color theory is both a science and an art. Use harmonic rules to create palettes that evoke the right emotions in your audience.",
    "Digital assets require precision. From SVG optimization to pixel-perfect resizes, every byte matters in high-performance web development.",
    "User research should be accessible. Simplify your workflows with tools designed for speed without compromising on data integrity.",
    "Inclusive design is non-negotiable. Test your colors against WCAG standards and simulate vision deficiencies to build for everyone."
];

export default function LoremIpsum() {
    const [count, setCount] = useState(3);
    const [type, setType] = useState('paragraphs');
    const [generated, setGenerated] = useState('');

    const generate = () => {
        let res = [];
        for (let i = 0; i < count; i++) {
            res.push(LOREM[i % LOREM.length]);
        }
        setGenerated(res.join('\n\n'));
    };

    useState(() => generate(), []);

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-sidebar p-8 rounded-3xl border border-border space-y-8">
                    <div className="text-center space-y-2">
                        <AlignLeft className="text-primary mx-auto" size={32} />
                        <h3 className="text-xl font-bold text-text-primary">Semantic Lorem Ipsum</h3>
                        <p className="text-xs text-text-secondary">Meaningful placeholder text for better UIs.</p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-4">Quantity</label>
                            <div className="flex items-center gap-4">
                                <input type="range" min="1" max="10" value={count} onChange={(e) => setCount(parseInt(e.target.value))} className="flex-1 accent-primary" />
                                <span className="w-8 text-center font-bold text-primary">{count}</span>
                            </div>
                        </div>

                        <div className="flex bg-white p-1 rounded-xl border border-border">
                            <button
                                onClick={() => setType('paragraphs')}
                                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${type === 'paragraphs' ? 'bg-primary text-white shadow-md' : 'text-text-secondary hover:text-text-primary'}`}
                            >
                                Paragraphs
                            </button>
                            <button
                                onClick={() => setType('sentences')}
                                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${type === 'sentences' ? 'bg-primary text-white shadow-md' : 'text-text-secondary hover:text-text-primary'}`}
                            >
                                Sentences
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={generate}
                        className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-white rounded-2xl font-bold hover:shadow-xl transition-all active:scale-95"
                    >
                        <RefreshCw size={18} />
                        Generate Variation
                    </button>
                </div>
            </div>

            <div className="lg:col-span-3 space-y-4">
                <div className="flex justify-between items-center px-1">
                    <h3 className="text-sm font-bold text-text-primary">Output Copy</h3>
                    <button
                        onClick={() => navigator.clipboard.writeText(generated)}
                        className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest hover:underline"
                    >
                        <Copy size={14} /> Copy All
                    </button>
                </div>

                <div className="bg-sidebar rounded-3xl border border-border p-8 min-h-[400px] shadow-inner relative group">
                    <div className="prose prose-slate max-w-none">
                        {generated.split('\n\n').map((p, i) => (
                            <p key={i} className="text-lg leading-relaxed text-text-secondary mb-6 last:mb-0">
                                {p}
                            </p>
                        ))}
                    </div>

                    {/* Visual Overlay */}
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-sidebar to-transparent pointer-events-none" />
                </div>

                <p className="text-[10px] text-text-secondary italic text-center">
                    * Nixby uses "Design Ipsum" which results in more realistic line lengths than standard Lorem Ipsum.
                </p>
            </div>
        </div>
    );
}
