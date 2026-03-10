import { useState } from 'react';
import { Grid, Layers, Copy, Hash, Info, ChevronRight } from 'lucide-react';

export default function EightPtGrid() {
    const [base, setBase] = useState(8);
    const [multiplier, setMultiplier] = useState(1);

    const steps = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16];

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-6">
                <div className="bg-sidebar p-8 rounded-[40px] border border-border space-y-6">
                    <div className="text-center space-y-2 pb-4">
                        <Grid className="text-primary mx-auto" size={32} />
                        <h3 className="text-xl font-bold text-text-primary">Spacing Rhythm</h3>
                        <p className="text-xs text-text-secondary">Align everything to the base grid.</p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-4 flex justify-between">
                                Grid Base
                                <span className="text-primary">{base}px</span>
                            </label>
                            <div className="flex gap-2">
                                {[4, 8, 10].map(v => (
                                    <button
                                        key={v}
                                        onClick={() => setBase(v)}
                                        className={`flex-1 py-3 rounded-xl border font-bold text-xs transition-all ${base === v ? 'bg-primary border-primary text-white shadow-md' : 'bg-white border-border text-text-primary hover:bg-sidebar'}`}
                                    >
                                        {v}pt
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-primary/5 rounded-[40px] border border-primary/10 space-y-4">
                    <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest">
                        <Info size={14} />
                        The 8pt Rule
                    </div>
                    <p className="text-[11px] text-text-secondary leading-relaxed">
                        Using multiples of 8 (8, 16, 24, 32...) for padding, margins, and component heights creates a clean, predictable rhythm that users "feel" as organized.
                    </p>
                </div>
            </div>

            <div className="lg:col-span-2 space-y-4">
                <h3 className="text-sm font-bold text-text-primary px-1">Scale Multipliers</h3>
                <div className="grid grid-cols-1 gap-2">
                    {steps.map(s => (
                        <div key={s} className="group bg-surface border border-border p-4 rounded-xl flex items-center justify-between hover:border-primary transition-all">
                            <div className="flex items-center gap-6">
                                <span className="text-[10px] font-mono text-text-secondary w-12">{base} x {s}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-black text-text-primary w-12">{base * s}px</span>
                                    <div className="h-6 bg-primary/10 border border-primary/20 rounded hidden sm:block" style={{ width: `${base * s}px` }} />
                                </div>
                            </div>

                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => navigator.clipboard.writeText(`${base * s}px`)}
                                    className="bg-sidebar p-2 rounded-lg text-[9px] font-black uppercase text-text-secondary hover:text-primary border border-border"
                                >
                                    PX
                                </button>
                                <button
                                    onClick={() => navigator.clipboard.writeText(`${(base * s) / 16}rem`)}
                                    className="bg-sidebar p-2 rounded-lg text-[9px] font-black uppercase text-text-secondary hover:text-primary border border-border"
                                >
                                    REM
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 p-8 bg-slate-900 rounded-[40px] text-white flex flex-col md:flex-row items-center gap-8 shadow-xl">
                    <div className="flex-1 space-y-3">
                        <h4 className="text-lg font-bold flex items-center gap-2">
                            <ChevronRight size={18} className="text-primary" />
                            Tailwind Config
                        </h4>
                        <p className="text-xs text-white/50 leading-relaxed">
                            Most design systems map these stops to utility classes. 16px is usually '4', 32px is '8', and so on. Consistent spacing saves hours of decision-making.
                        </p>
                    </div>
                    <div className="w-full md:w-32 aspect-video bg-white/5 rounded-2xl border border-white/10 flex flex-col p-3 gap-2">
                        <div className="h-2 bg-primary/40 rounded w-full" />
                        <div className="h-2 bg-primary/40 rounded w-2/3" />
                        <div className="h-2 bg-primary/40 rounded w-1/2" />
                    </div>
                </div>
            </div>
        </div>
    );
}
