import { useState } from 'react';
import { Layers, MoveRight, Copy, Info } from 'lucide-react';

export default function ExportMultiplier() {
    const [base, setBase] = useState(1);
    const [width, setWidth] = useState(1024);
    const [height, setHeight] = useState(768);

    const scales = [
        { label: '0.5x', factor: 0.5 },
        { label: '1x', factor: 1 },
        { label: '1.5x', factor: 1.5 },
        { label: '2x (Retina)', factor: 2 },
        { label: '3x', factor: 3 },
        { label: '4x', factor: 4 }
    ];

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-6">
                <div className="bg-sidebar p-6 rounded-3xl border border-border space-y-6">
                    <div className="space-y-2 text-center pb-4">
                        <Layers className="text-primary mx-auto" size={32} />
                        <h3 className="text-lg font-bold text-text-primary">Asset Calculator</h3>
                        <p className="text-[10px] text-text-secondary font-black uppercase tracking-widest">Pixel Precise Exports</p>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-text-secondary tracking-widest px-1">Base Width (1x)</label>
                            <input
                                type="number" value={width} onChange={(e) => setWidth(parseInt(e.target.value) || 0)}
                                className="w-full p-4 bg-background border-2 border-border rounded-xl font-mono text-xl font-black text-primary outline-none focus:border-primary"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-text-secondary tracking-widest px-1">Base Height (1x)</label>
                            <input
                                type="number" value={height} onChange={(e) => setHeight(parseInt(e.target.value) || 0)}
                                className="w-full p-4 bg-background border-2 border-border rounded-xl font-mono text-xl font-black text-primary outline-none focus:border-primary"
                            />
                        </div>
                    </div>
                </div>

                <div className="p-5 bg-primary/5 border border-primary/10 rounded-2xl flex gap-4 text-xs leading-relaxed text-text-secondary">
                    <Info className="text-primary shrink-0" size={20} />
                    <p>Use these values when exporting assets for mobile apps or high-density displays (PPI/DPR). Most modern design tools use 1x as base.</p>
                </div>
            </div>

            <div className="lg:col-span-2 space-y-4">
                <h3 className="text-sm font-bold text-text-primary px-1">Multiplied Dimensions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {scales.map((s) => (
                        <div key={s.label} className="group bg-surface border border-border p-5 rounded-2xl flex items-center justify-between hover:border-primary hover:shadow-soft transition-all">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black ${s.factor === 2 ? 'bg-primary text-white' : 'bg-sidebar text-text-secondary'}`}>
                                    {s.label}
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">Resolution</p>
                                    <p className="text-lg font-mono font-black text-text-primary">
                                        {Math.round(width * s.factor)} <span className="text-text-secondary/30">×</span> {Math.round(height * s.factor)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 p-6 bg-slate-900 rounded-3xl text-white space-y-4 shadow-xl">
                    <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Figma / Sketch Rule</span>
                        <span className="px-2 py-0.5 bg-primary rounded text-[9px] font-black uppercase">Standard</span>
                    </div>
                    <p className="text-sm font-medium leading-relaxed opacity-80">
                        To serve Retina displays (2x), your source image must have double the physical pixel count of its CSS/Layout size to avoid blurriness.
                    </p>
                    <div className="flex items-center gap-2 text-primary font-bold text-xs pt-2">
                        <MoveRight size={14} />
                        Higher DPR leads to sharper UI.
                    </div>
                </div>
            </div>
        </div>
    );
}
