import { useState } from 'react';
import { Maximize2, Zap, Copy, Info, RefreshCw } from 'lucide-react';

export default function GoldenRatio() {
    const [base, setBase] = useState(600);
    const phi = 1.618;

    const small = Math.round(base / phi);
    const larger = Math.round(base);
    const total = small + larger;

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-sidebar p-8 rounded-[40px] border border-border space-y-8">
                    <div className="text-center space-y-2">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-lg border border-border">
                            <Zap className="text-primary" size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-text-primary">Divine Proportions</h3>
                        <p className="text-xs text-text-secondary">Using Phi (1.618) for natural balance.</p>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-text-secondary tracking-widest px-1">Base Component Size (px)</label>
                            <div className="flex gap-4 items-center">
                                <input type="range" min="100" max="1200" value={base} onChange={(e) => setBase(parseInt(e.target.value))} className="flex-1 accent-primary" />
                                <span className="w-16 text-center font-bold text-primary">{base}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <div className="bg-white p-6 rounded-3xl border border-border shadow-sm flex items-center justify-between group hover:border-primary transition-all">
                        <div>
                            <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-1">Small Segment</p>
                            <p className="text-2xl font-black text-text-primary">{small}px</p>
                        </div>
                        <button onClick={() => navigator.clipboard.writeText(`${small}px`)} className="p-3 bg-sidebar rounded-xl opacity-0 group-hover:opacity-100 transition-all text-text-secondary hover:text-primary"><Copy size={16} /></button>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-border shadow-sm flex items-center justify-between group hover:border-primary transition-all">
                        <div>
                            <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-1">Large Segment</p>
                            <p className="text-2xl font-black text-text-primary">{larger}px</p>
                        </div>
                        <button onClick={() => navigator.clipboard.writeText(`${larger}px`)} className="p-3 bg-sidebar rounded-xl opacity-0 group-hover:opacity-100 transition-all text-text-secondary hover:text-primary"><Copy size={16} /></button>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
                <div className="flex justify-between items-center px-1">
                    <h3 className="text-sm font-bold text-text-primary">Relationship Preview</h3>
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">Total Width: {total}px</span>
                </div>

                <div className="bg-sidebar rounded-[40px] border border-border p-12 flex flex-col gap-8 justify-center min-h-[400px]">
                    {/* Split View */}
                    <div className="flex h-48 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                        <div className="bg-primary flex items-center justify-center p-4 relative group" style={{ flex: larger }}>
                            <span className="text-white font-black text-lg">A</span>
                            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-black uppercase tracking-widest">{larger}px</div>
                        </div>
                        <div className="bg-primary/20 flex items-center justify-center p-4 relative group" style={{ flex: small }}>
                            <span className="text-primary font-black text-lg">B</span>
                            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-primary text-[10px] font-black uppercase tracking-widest">{small}px</div>
                        </div>
                    </div>

                    {/* Recursive Spirals Visual (Simplified) */}
                    <div className="flex gap-4 mt-8 items-end">
                        <div className="w-32 h-32 rounded-full border-4 border-primary/10 flex items-center justify-center relative">
                            <RefreshCw className="text-primary/20 animate-spin-slow" size={48} />
                            <div className="absolute inset-4 rounded-full border-2 border-primary/20" />
                        </div>
                        <div className="flex-1 bg-surface border-2 border-dashed border-border p-6 rounded-2xl flex items-center gap-4">
                            <Info className="text-primary" size={24} />
                            <p className="text-xs text-text-secondary leading-relaxed">
                                The ratio of <strong>A+B to A</strong> is the same as <strong>A to B</strong>. This mathematical beauty is found everywhere from galaxy spirals to shell growth.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
