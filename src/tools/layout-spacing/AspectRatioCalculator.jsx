import { useState, useEffect } from 'react';
import { Maximize, ArrowRight, RefreshCw, Hash, Lock, Unlock } from 'lucide-react';
import { gcd } from '../../utils/mathUtils';

export default function AspectRatioCalculator() {
    const [w, setW] = useState(1920);
    const [h, setH] = useState(1080);
    const [ratio, setRatio] = useState('16:9');

    useEffect(() => {
        const common = gcd(w, h);
        setRatio(`${w / common}:${h / common}`);
    }, [w, h]);

    const PRESETS = [
        { name: '16:9 (HD)', w: 1920, h: 1080 },
        { name: '4:3 (SD)', w: 1024, h: 768 },
        { name: '1:1 (Square)', w: 1080, h: 1080 },
        { name: '9:16 (Story)', w: 1080, h: 1920 },
        { name: '21:9 (Ultrawide)', w: 3440, h: 1440 }
    ];

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-6">
                <div className="bg-sidebar p-8 rounded-[40px] border border-border space-y-8">
                    <div className="text-center space-y-2">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-lg border border-border">
                            <Maximize className="text-primary" size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-text-primary">Proportional Calculator</h3>
                        <p className="text-xs text-text-secondary">Find the perfect balance for your assets.</p>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-text-secondary tracking-widest px-1">Width (px)</label>
                            <input
                                type="number" value={w} onChange={(e) => setW(parseInt(e.target.value) || 0)}
                                className="w-full p-4 bg-background border border-border rounded-2xl font-mono text-xl font-black text-primary outline-none focus:border-primary"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-text-secondary tracking-widest px-1">Height (px)</label>
                            <input
                                type="number" value={h} onChange={(e) => setH(parseInt(e.target.value) || 0)}
                                className="w-full p-4 bg-background border border-border rounded-2xl font-mono text-xl font-black text-primary outline-none focus:border-primary"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-primary p-8 rounded-[40px] text-white flex flex-col items-center text-center shadow-xl">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-2">Calculated Ratio</p>
                    <span className="text-5xl font-black">{ratio}</span>
                    <p className="mt-4 text-[10px] font-medium opacity-70">Based on GCD: {gcd(w, h)}</p>
                </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
                <div className="flex justify-between items-center px-1">
                    <h3 className="text-sm font-bold text-text-primary">Visual Representation</h3>
                    <div className="flex gap-2">
                        <Hash className="text-primary" size={16} />
                        <span className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Dimension Scale</span>
                    </div>
                </div>

                <div className="bg-sidebar rounded-[40px] border border-border p-12 flex items-center justify-center min-h-[400px]">
                    <div
                        className="max-w-full max-h-full transition-all duration-500 bg-white border-4 border-primary/20 shadow-2xl rounded-2xl flex items-center justify-center relative overflow-hidden"
                        style={{
                            aspectRatio: ratio.replace(':', '/'),
                            width: w > h ? '100%' : 'auto',
                            height: h >= w ? '100%' : 'auto'
                        }}
                    >
                        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#6366F1 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                        <span className="text-xs font-black text-primary uppercase tracking-[0.4em]">{ratio}</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {PRESETS.map(p => (
                        <button
                            key={p.name}
                            onClick={() => { setW(p.w); setH(p.h); }}
                            className="p-3 bg-surface border border-border rounded-xl text-center hover:border-primary transition-all group"
                        >
                            <p className="text-[8px] font-black uppercase text-text-secondary mb-1 group-hover:text-primary">{p.name}</p>
                            <p className="text-[10px] font-mono font-bold text-text-primary">{p.w}x{p.h}</p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
