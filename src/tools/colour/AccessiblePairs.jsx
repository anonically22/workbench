import { useState, useEffect } from 'react';
import chroma from 'chroma-js';
import { CheckCircle2, XCircle, Search, Info } from 'lucide-react';

export default function AccessiblePairs() {
    const [bg, setBg] = useState('#6366F1');
    const [testColors, setTestColors] = useState([
        '#FFFFFF', '#000000', '#F8FAFC', '#1E293B', '#FACC15', '#F43F5E'
    ]);
    const [results, setResults] = useState([]);

    useEffect(() => {
        validate();
    }, [bg, testColors]);

    const validate = () => {
        const res = testColors.map(fg => {
            const ratio = chroma.contrast(fg, bg);
            return {
                hex: fg,
                ratio,
                aa: ratio >= 4.5,
                aaa: ratio >= 7.0
            };
        });
        setResults(res.sort((a, b) => b.ratio - a.ratio));
    };

    const addColor = (hex) => {
        if (chroma.valid(hex) && !testColors.includes(hex)) {
            setTestColors([...testColors, hex]);
        }
    };

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold mb-2">Background Colour</label>
                    <div className="flex gap-4 p-4 bg-sidebar rounded-2xl border border-border items-center">
                        <input
                            type="color"
                            value={bg}
                            onChange={(e) => setBg(e.target.value)}
                            className="w-16 h-16 rounded-xl border-4 border-white cursor-pointer shadow-sm overflow-hidden"
                        />
                        <input
                            type="text"
                            value={bg.toUpperCase()}
                            onChange={(e) => setBg(e.target.value)}
                            className="flex-1 bg-background border border-border p-3 rounded-xl font-mono text-lg font-black uppercase"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">Test New Foreground</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Enter HEX..."
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    addColor(e.target.value);
                                    e.target.value = '';
                                }
                            }}
                            className="flex-1 p-4 rounded-xl border border-border bg-surface font-mono"
                        />
                        <button className="px-6 bg-primary text-white rounded-xl font-bold">Add</button>
                    </div>
                </div>

                <div className="p-4 bg-sidebar rounded-xl border border-border border-dashed space-y-2">
                    <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                        <Info size={14} />
                        Accessibility Rule
                    </div>
                    <p className="text-[11px] text-text-secondary leading-relaxed">
                        Finding accessible combinations is easier when you check multiple candidates against a fixed background. We use WCAG 2.1 standards for validation.
                    </p>
                </div>
            </div>

            <div className="lg:col-span-2 space-y-4">
                <h3 className="text-sm font-bold text-text-primary px-1">Foreground Candidates</h3>
                <div className="grid grid-cols-1 gap-3">
                    {results.map((r, i) => (
                        <div key={r.hex} className="group bg-surface border border-border p-4 rounded-2xl flex items-center justify-between hover:border-primary/30 transition-all">
                            <div className="flex items-center gap-4">
                                <div
                                    className="w-24 h-12 rounded-lg border border-white/20 flex items-center justify-center font-bold text-xs"
                                    style={{ backgroundColor: bg, color: r.hex }}
                                >
                                    Aa Bb Cc
                                </div>
                                <div>
                                    <p className="font-mono text-sm font-black text-text-primary uppercase">{r.hex}</p>
                                    <p className="text-[10px] text-text-secondary">Ratio: {r.ratio.toFixed(2)}:1</p>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1 ${r.aa ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {r.aa ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
                                    AA
                                </div>
                                <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1 ${r.aaa ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {r.aaa ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
                                    AAA
                                </div>
                                <button
                                    onClick={() => setTestColors(testColors.filter(c => c !== r.hex))}
                                    className="p-1 px-2 text-text-secondary hover:text-red-500 transition-colors"
                                >
                                    <XCircle size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
