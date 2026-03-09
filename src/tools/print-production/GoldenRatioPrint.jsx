import { useState } from 'react';
import { Grid, Copy, RefreshCw, Maximize, Info, Layers } from 'lucide-react';

export default function GoldenRatioPrint() {
    const [base, setBase] = useState(210);
    const phi = 1.618;

    const large = base / phi;
    const small = base - large;

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-sidebar p-8 rounded-[40px] border border-border space-y-6">
                    <div>
                        <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-4 px-1">Base Dimension (mm)</label>
                        <input
                            type="number"
                            value={base}
                            onChange={(e) => setBase(parseFloat(e.target.value))}
                            className="w-full p-4 bg-background border border-border rounded-xl font-bold text-sm outline-none focus:border-primary"
                        />
                    </div>

                    <button
                        onClick={() => setBase(210)}
                        className="w-full py-3 bg-white border border-border text-text-secondary font-bold text-xs rounded-xl hover:text-primary transition-all"
                    >
                        Reset to A4 Width
                    </button>
                </div>

                <div className="p-6 bg-primary/5 rounded-[40px] border border-primary/10 flex flex-col items-center text-center gap-3">
                    <Layers className="text-primary" size={24} />
                    <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Layout Harmony</p>
                    <p className="text-[11px] text-text-secondary leading-relaxed font-medium">
                        Use these dimensions to set your primary column and sidebar widths for perfectly balanced print layouts.
                    </p>
                </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
                <div className="bg-sidebar rounded-[40px] border border-border p-12 min-h-[400px] flex flex-col items-center justify-center relative shadow-inner group">
                    {/* Golden Sections */}
                    <div className="w-full max-w-2xl flex gap-1 items-stretch group-hover:scale-105 transition-transform duration-500">
                        <div
                            className="bg-primary flex flex-col items-center justify-center p-8 rounded-l-[40px] border border-primary/20 shadow-lg"
                            style={{ flex: phi }}
                        >
                            <p className="text-[10px] font-black uppercase text-white/40 tracking-widest mb-2">Major Section</p>
                            <p className="text-3xl font-black text-white">{large.toFixed(1)}mm</p>
                        </div>
                        <div
                            className="bg-white flex flex-col items-center justify-center p-8 rounded-r-[40px] border border-border shadow-soft"
                            style={{ flex: 1 }}
                        >
                            <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest mb-2">Minor Section</p>
                            <p className="text-3xl font-black text-text-primary">{small.toFixed(1)}mm</p>
                        </div>
                    </div>

                    <div className="mt-12 flex gap-12 text-center">
                        <div className="space-y-1">
                            <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Ratio</p>
                            <p className="text-2xl font-black text-primary">1 : 1.618</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Balance Score</p>
                            <p className="text-2xl font-black text-primary">Golden</p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => navigator.clipboard.writeText(`Major: ${large.toFixed(1)}mm\nMinor: ${small.toFixed(1)}mm`)}
                    className="w-full py-4 bg-slate-900 text-white rounded-[24px] font-black uppercase tracking-[0.2em] text-[10px] shadow-xl hover:bg-slate-800 transition-all active:scale-95"
                >
                    Copy Dimensional Set
                </button>
            </div>
        </div>
    );
}
