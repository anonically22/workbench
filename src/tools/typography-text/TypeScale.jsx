import { useState, useEffect } from 'react';
import { Type, ArrowRight, Copy, Info } from 'lucide-react';

const SCALES = [
    { name: 'Minor Second', ratio: 1.067 },
    { name: 'Major Second', ratio: 1.125 },
    { name: 'Minor Third', ratio: 1.200 },
    { name: 'Major Third', ratio: 1.250 },
    { name: 'Perfect Fourth', ratio: 1.333 },
    { name: 'Augmented Fourth', ratio: 1.414 },
    { name: 'Perfect Fifth', ratio: 1.500 },
    { name: 'Golden Ratio', ratio: 1.618 }
];

export default function TypeScale() {
    const [baseSize, setBaseSize] = useState(16);
    const [scale, setScale] = useState(1.250);
    const [steps, setSteps] = useState(10);
    const [results, setResults] = useState([]);

    useEffect(() => {
        generate();
    }, [baseSize, scale, steps]);

    const generate = () => {
        const res = [];
        for (let i = steps - 1; i >= 0; i--) {
            const px = baseSize * Math.pow(scale, i);
            res.push({
                step: i,
                px: Math.round(px),
                rem: (px / baseSize).toFixed(3)
            });
        }
        setResults(res);
    };

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-6">
                <div className="bg-sidebar p-6 rounded-3xl border border-border space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-text-secondary tracking-widest px-1">Base Size (px)</label>
                            <input
                                type="number" value={baseSize} onChange={(e) => setBaseSize(parseInt(e.target.value) || 0)}
                                className="w-full p-4 bg-background border border-border rounded-xl font-mono text-xl font-bold text-primary outline-none focus:border-primary"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-text-secondary tracking-widest px-1">Harmonic Scale</label>
                            <select
                                value={scale}
                                onChange={(e) => setScale(parseFloat(e.target.value))}
                                className="w-full p-4 bg-background border border-border rounded-xl font-bold text-sm text-text-primary outline-none focus:border-primary appearance-none cursor-pointer"
                            >
                                {SCALES.map(s => (
                                    <option key={s.name} value={s.ratio}>{s.name} ({s.ratio})</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-text-secondary tracking-widest px-1">Steps: {steps}</label>
                            <input type="range" min="3" max="15" value={steps} onChange={(e) => setSteps(parseInt(e.target.value))} className="w-full accent-primary" />
                        </div>
                    </div>
                </div>

                <div className="p-5 bg-primary/5 border border-primary/10 rounded-2xl space-y-3">
                    <div className="flex items-center gap-2 text-primary font-bold text-[10px] tracking-widest uppercase">
                        <Info size={14} />
                        Typographic Hierarchy
                    </div>
                    <p className="text-[11px] text-text-secondary leading-relaxed">
                        Establishing a modular scale ensures that all font sizes in your design system are mathematically related, creating a sense of rhythm and balance.
                    </p>
                </div>
            </div>

            <div className="lg:col-span-2 space-y-4">
                <h3 className="text-sm font-bold text-text-primary px-1">Preview Scale</h3>
                <div className="bg-sidebar rounded-3xl border border-border overflow-hidden">
                    {results.map((r, i) => (
                        <div
                            key={r.step}
                            className={`group flex items-center justify-between p-6 hover:bg-white transition-all border-b border-border last:border-0`}
                        >
                            <div className="flex-1 overflow-hidden">
                                <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-2">Step {r.step} — {r.px}px / {r.rem}rem</p>
                                <p
                                    className="font-medium text-text-primary truncate"
                                    style={{ fontSize: `${r.px}px` }}
                                >
                                    The quick brown fox
                                </p>
                            </div>
                            <button
                                onClick={() => navigator.clipboard.writeText(`${r.rem}rem`)}
                                className="p-3 bg-surface border border-border rounded-xl opacity-0 group-hover:opacity-100 transition-all text-text-secondary hover:text-primary hover:border-primary shadow-sm"
                                title="Copy as rem"
                            >
                                <Copy size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
