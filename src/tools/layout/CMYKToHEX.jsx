import { useState } from 'react';
import { Palette, Copy, RefreshCw, Layers, Info, CheckCircle2 } from 'lucide-react';

export default function CMYKToHEX() {
    const [c, setC] = useState(0);
    const [m, setM] = useState(100);
    const [y, setY] = useState(100);
    const [k, setK] = useState(0);

    const cmykToHex = (c, m, y, k) => {
        const r = 255 * (1 - c / 100) * (1 - k / 100);
        const g = 255 * (1 - m / 100) * (1 - k / 100);
        const b = 255 * (1 - y / 100) * (1 - k / 100);

        const toHex = (n) => {
            const h = Math.round(n).toString(16);
            return h.length === 1 ? '0' + h : h;
        };

        return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
    };

    const hex = cmykToHex(c, m, y, k);

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-sidebar p-8 rounded-[40px] border border-border space-y-8">
                    <div className="space-y-6">
                        {[
                            { label: 'Cyan', val: c, set: setC, color: 'text-cyan-500' },
                            { label: 'Magenta', val: m, set: setM, color: 'text-pink-500' },
                            { label: 'Yellow', val: y, set: setY, color: 'text-yellow-500' },
                            { label: 'Key (Black)', val: k, set: setK, color: 'text-slate-900' }
                        ].map(p => (
                            <div key={p.label} className="space-y-2">
                                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                    <span className={p.color}>{p.label}</span>
                                    <span className="text-text-secondary">{p.val}%</span>
                                </div>
                                <input type="range" min="0" max="100" value={p.val} onChange={(e) => p.set(parseInt(e.target.value))} className="w-full accent-primary h-1.5" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-6 bg-white border border-border rounded-3xl flex items-center gap-4 shadow-soft">
                    <Info className="text-primary shrink-0" size={20} />
                    <p className="text-[10px] text-text-secondary">
                        CMYK is subtractive color used in print. This conversion is an approximation used for visual matching on screen (RGB).
                    </p>
                </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
                <div
                    className="bg-white rounded-[40px] border border-border p-12 min-h-[400px] flex flex-col items-center justify-center text-center shadow-soft relative overflow-hidden transition-all duration-500"
                    style={{ backgroundColor: hex }}
                >
                    <div className="bg-white/90 backdrop-blur-md p-10 rounded-[32px] border border-white shadow-2xl flex flex-col items-center gap-2">
                        <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Visual Result</p>
                        <h3 className="text-4xl font-black text-text-primary">{hex}</h3>
                        <button
                            onClick={() => navigator.clipboard.writeText(hex)}
                            className="mt-4 flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-bold text-xs shadow-lg active:scale-95 transition-all"
                        >
                            <Copy size={14} /> Copy HEX
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-sidebar p-6 rounded-3xl border border-border flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: 'cyan' }} />
                        <span className="text-xs font-bold text-text-secondary">Primary Cyan</span>
                    </div>
                    <div className="bg-sidebar p-6 rounded-3xl border border-border flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: '#ff00ff' }} />
                        <span className="text-xs font-bold text-text-secondary">Primary Magenta</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
