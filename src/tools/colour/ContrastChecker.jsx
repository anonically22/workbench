import { useState, useEffect } from 'react';
import chroma from 'chroma-js';
import { CheckCircle2, XCircle, RefreshCw, Contrast } from 'lucide-react';

export default function ContrastChecker() {
    const [fg, setFg] = useState('#6366F1');
    const [bg, setBg] = useState('#FFFFFF');
    const [ratio, setRatio] = useState(0);

    useEffect(() => {
        try {
            const r = chroma.contrast(fg, bg);
            setRatio(r);
        } catch (e) {
            // Invalid color
        }
    }, [fg, bg]);

    const ScoreBadge = ({ label, pass, sub }) => (
        <div className={`p-4 rounded-xl border-2 flex items-center justify-between transition-all ${pass ? 'bg-green-50/50 border-green-100 text-green-700' : 'bg-red-50/50 border-red-100 text-red-700'
            }`}>
            <div>
                <p className="font-bold text-sm">{label}</p>
                <p className="text-[10px] opacity-70">{sub}</p>
            </div>
            {pass ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
        </div>
    );

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold">Foreground</label>
                        <div className="flex gap-2">
                            <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="w-12 h-12 rounded-lg border border-border cursor-pointer shrink-0" />
                            <input type="text" value={fg} onChange={(e) => setFg(e.target.value)} className="w-full px-3 rounded-lg border border-border font-mono text-sm uppercase" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold">Background</label>
                        <div className="flex gap-2">
                            <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="w-12 h-12 rounded-lg border border-border cursor-pointer shrink-0" />
                            <input type="text" value={bg} onChange={(e) => setBg(e.target.value)} className="w-full px-3 rounded-lg border border-border font-mono text-sm uppercase" />
                        </div>
                    </div>
                </div>

                <div
                    className="h-48 rounded-2xl flex flex-col items-center justify-center text-center p-8 shadow-inner border border-border transition-colors duration-500 overflow-hidden"
                    style={{ backgroundColor: bg, color: fg }}
                >
                    <h4 className="text-3xl font-black mb-1">Nixby Design</h4>
                    <p className="text-sm">The quick brown fox jumps over the lazy dog.</p>
                    <div className="mt-6 px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase bg-black/10 backdrop-blur-sm">
                        Live Preview
                    </div>
                </div>

                <button
                    onClick={() => { const oldFg = fg; setFg(bg); setBg(oldFg); }}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-sidebar border border-border rounded-xl text-sm font-bold hover:bg-white transition-all active:scale-95"
                >
                    <RefreshCw size={16} />
                    Swap Colours
                </button>
            </div>

            <div className="space-y-4">
                <div className="bg-primary/5 p-8 rounded-2xl border border-primary/10 flex flex-col items-center text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2">Contrast Ratio</p>
                    <div className="flex items-baseline gap-1">
                        <span className="text-6xl font-black text-text-primary">{ratio.toFixed(2)}</span>
                        <span className="text-xl font-bold text-text-secondary">: 1</span>
                    </div>
                    <div className={`mt-4 px-4 py-1 rounded-full text-[10px] font-black uppercase ${ratio >= 7 ? 'bg-green-500 text-white' : ratio >= 4.5 ? 'bg-primary text-white' : 'bg-red-500 text-white'
                        }`}>
                        {ratio >= 7 ? 'Excellent' : ratio >= 4.5 ? 'Good' : 'Poor Contrast'}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <ScoreBadge label="AA Normal" pass={ratio >= 4.5} sub="Small text (16px+)" />
                    <ScoreBadge label="AA Large" pass={ratio >= 3.0} sub="Large text (18pt+)" />
                    <ScoreBadge label="AAA Normal" pass={ratio >= 7.0} sub="High readability" />
                    <ScoreBadge label="AAA Large" pass={ratio >= 4.5} sub="Large text high" />
                </div>

                <div className="p-4 bg-sidebar rounded-xl border border-border flex gap-3 items-start">
                    <Contrast size={18} className="text-primary mt-0.5" />
                    <p className="text-[10px] leading-relaxed text-text-secondary">
                        WCAG 2.1 recommends a ratio of at least <strong>4.5:1</strong> for normal text and <strong>3:1</strong> for large text (AA). For enhanced accessibility (AAA), use <strong>7:1</strong>.
                    </p>
                </div>
            </div>
        </div>
    );
}
