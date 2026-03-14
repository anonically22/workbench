import { useState } from 'react';
import { Layout, Columns, RefreshCw, Copy, Info } from 'lucide-react';

export default function GridOverlay() {
    const [cols, setCols] = useState(12);
    const [gutter, setGutter] = useState(24);
    const [margin, setMargin] = useState(40);
    const [opacity, setOpacity] = useState(0.1);

    const css = `
.grid-overlay {
    display: grid;
    grid-template-columns: repeat(${cols}, 1fr);
    gap: ${gutter}px;
    padding: 0 ${margin}px;
    opacity: ${opacity};
    pointer-events: none;
    position: fixed;
    inset: 0;
    z-index: 9999;
}
.grid-col {
    background: #6366F1;
    height: 100vh;
}`.trim();

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-sidebar p-8 rounded-[40px] border border-border space-y-8">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-4 flex justify-between">
                                Columns
                                <span className="text-primary">{cols}</span>
                            </label>
                            <input type="range" min="1" max="24" value={cols} onChange={(e) => setCols(parseInt(e.target.value))} className="w-full accent-primary" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-4 flex justify-between">
                                Gutter
                                <span className="text-primary">{gutter}px</span>
                            </label>
                            <input type="range" min="0" max="64" value={gutter} onChange={(e) => setGutter(parseInt(e.target.value))} className="w-full accent-primary" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-4 flex justify-between">
                                Margin
                                <span className="text-primary">{margin}px</span>
                            </label>
                            <input type="range" min="0" max="120" value={margin} onChange={(e) => setMargin(parseInt(e.target.value))} className="w-full accent-primary" />
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-surface border-2 border-dashed border-border rounded-3xl flex flex-col items-center text-center gap-3">
                    <Info className="text-primary" size={24} />
                    <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Layout Debugging</p>
                    <p className="text-[11px] text-text-secondary leading-relaxed">
                        Visualise your layout framework. Use these values in your Tailwind or CSS Grid configs for pixel-perfect alignment.
                    </p>
                </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
                <div className="bg-sidebar h-[400px] rounded-[40px] border border-border relative overflow-hidden flex flex-col">
                    <div className="p-4 border-b border-border bg-white flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Interactive Canvas Preview</span>
                        <div className="flex gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-400" />
                            <div className="w-2 h-2 rounded-full bg-amber-400" />
                            <div className="w-2 h-2 rounded-full bg-green-400" />
                        </div>
                    </div>
                    <div
                        className="flex-1 transition-all duration-300 grid"
                        style={{
                            gridTemplateColumns: `repeat(${cols}, 1fr)`,
                            padding: `0 ${margin}px`,
                            gap: `${gutter}px`
                        }}
                    >
                        {Array.from({ length: cols }).map((_, i) => (
                            <div key={i} className="h-full bg-primary/10 border-x border-primary/20 flex items-center justify-center">
                                <span className="text-[8px] font-black text-primary/30">{i + 1}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-slate-900 p-8 rounded-[40px] text-white space-y-4 shadow-xl">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Columns size={16} className="text-primary" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">CSS Implementation</span>
                        </div>
                        <button
                            onClick={() => navigator.clipboard.writeText(css)}
                            className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest hover:underline"
                        >
                            <Copy size={14} /> Copy Code
                        </button>
                    </div>
                    <pre className="font-mono text-xs opacity-80 overflow-x-auto whitespace-pre leading-relaxed">
                        {css}
                    </pre>
                </div>
            </div>
        </div>
    );
}
