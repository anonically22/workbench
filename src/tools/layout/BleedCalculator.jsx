import { useState } from 'react';
import { Layout, Copy, RefreshCw, Maximize2, Info, Droplets } from 'lucide-react';

export default function BleedCalculator() {
    const [w, setW] = useState(210);
    const [h, setH] = useState(297);
    const [bleed, setBleed] = useState(3);
    const [unit, setUnit] = useState('mm');

    const totalW = w + (bleed * 2);
    const totalH = h + (bleed * 2);

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-sidebar p-8 rounded-[40px] border border-border space-y-6 shadow-sm">
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-2 px-1">Width ({unit})</label>
                                <input type="number" value={w} onChange={(e) => setW(parseFloat(e.target.value))} className="w-full p-4 bg-background border border-border rounded-xl font-bold text-sm outline-none focus:border-primary" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-2 px-1">Height ({unit})</label>
                                <input type="number" value={h} onChange={(e) => setH(parseFloat(e.target.value))} className="w-full p-4 bg-background border border-border rounded-xl font-bold text-sm outline-none focus:border-primary" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-2 px-1">Bleed ({unit})</label>
                            <input type="number" value={bleed} onChange={(e) => setBleed(parseFloat(e.target.value))} className="w-full p-4 bg-background border border-border rounded-xl font-bold text-sm outline-none focus:border-primary" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-4 px-1">Unit</label>
                            <div className="flex gap-2 p-1 bg-white border border-border rounded-2xl">
                                {['mm', 'cm', 'in'].map(u => (
                                    <button
                                        key={u}
                                        onClick={() => setUnit(u)}
                                        className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${unit === u ? 'bg-primary text-white shadow-md' : 'text-text-secondary hover:text-text-primary'}`}
                                    >
                                        {u}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-blue-50 border border-blue-100 rounded-[40px] flex items-start gap-4">
                    <Droplets size={24} className="text-blue-500 shrink-0" />
                    <div className="space-y-1">
                        <p className="text-xs font-bold text-blue-700">Printer Requirements</p>
                        <p className="text-[11px] text-blue-700/70 leading-relaxed">
                            Most professional printers require <strong>3mm</strong> bleed. This allows for slight inaccuracies during the cutting process.
                        </p>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
                <div className="bg-sidebar rounded-[40px] border border-border p-12 flex flex-col items-center justify-center min-h-[450px] shadow-inner relative overflow-hidden group">
                    {/* Visual Bleed Box */}
                    <div className="relative">
                        <div className="absolute -inset-8 border-2 border-dashed border-primary opacity-30 animate-pulse" />
                        <div className="w-64 h-80 bg-white border-2 border-border shadow-xl flex flex-col items-center justify-center text-center p-8 relative z-10 transition-transform group-hover:scale-105 duration-500">
                            <Maximize2 className="text-primary/20 mb-4" size={48} />
                            <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest mb-2">Trim Size</p>
                            <p className="text-2xl font-black text-text-primary">{w} x {h}</p>
                        </div>
                    </div>

                    <div className="mt-12 grid grid-cols-2 gap-8 w-full">
                        <div className="text-center">
                            <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest mb-1">Total Width</p>
                            <p className="text-4xl font-black text-primary">{totalW.toFixed(1)}<span className="text-sm ml-1">{unit}</span></p>
                        </div>
                        <div className="text-center">
                            <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest mb-1">Total Height</p>
                            <p className="text-4xl font-black text-primary">{totalH.toFixed(1)}<span className="text-sm ml-1">{unit}</span></p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => navigator.clipboard.writeText(`Trim: ${w}x${h} ${unit}\nBleed: ${bleed}${unit}\nTotal Document: ${totalW}x${totalH} ${unit}`)}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-white border border-border text-primary rounded-2xl font-bold hover:shadow-lg transition-all active:scale-95"
                >
                    <Copy size={18} /> Copy Setup specs
                </button>
            </div>
        </div>
    );
}
