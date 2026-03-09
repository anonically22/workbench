import { useState, useEffect } from 'react';
import { Smartphone, Monitor, Tablet, Layers, Info, RotateCw } from 'lucide-react';

const DEVICES = [
    { name: 'iPhone 15', w: 393, h: 852, icon: Smartphone },
    { name: 'Pixel 7', w: 412, h: 915, icon: Smartphone },
    { name: 'iPad Pro', w: 1024, h: 1366, icon: Tablet },
    { name: 'MacBook Air', w: 1280, h: 800, icon: Monitor },
    { name: 'FHD Desktop', w: 1920, h: 1080, icon: Monitor }
];

export default function ViewportHelper() {
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-primary p-8 rounded-[40px] text-white space-y-4 shadow-xl flex flex-col items-center text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Current Viewport</p>
                    <div className="space-y-1">
                        <span className="text-5xl font-black">{width} × {height}</span>
                        <p className="text-[10px] font-bold opacity-70">Physical Pixels (Approx)</p>
                    </div>
                </div>

                <div className="bg-sidebar p-6 rounded-[40px] border border-border space-y-4">
                    <h3 className="text-xs font-bold text-text-primary px-1">Common Breakpoints</h3>
                    <div className="space-y-2">
                        {DEVICES.map(d => (
                            <button
                                key={d.name}
                                className="w-full p-4 bg-white border border-border rounded-2xl flex items-center justify-between group hover:border-primary hover:shadow-soft transition-all"
                            >
                                <div className="flex items-center gap-3">
                                    <d.icon size={18} className="text-text-secondary group-hover:text-primary" />
                                    <span className="text-xs font-bold text-text-primary">{d.name}</span>
                                </div>
                                <span className="text-[10px] font-mono text-text-secondary">{d.w}×{d.h}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
                <div className="bg-sidebar rounded-[40px] border border-border p-12 flex flex-col items-center justify-center min-h-[400px] gap-8">
                    <div className="relative">
                        <div className="w-64 h-96 bg-white border-8 border-slate-900 rounded-[3rem] shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 inset-x-0 h-6 bg-slate-900 flex items-center justify-center">
                                <div className="w-16 h-3 bg-black rounded-full" />
                            </div>
                            <div className="flex flex-col items-center justify-center h-full p-6 text-center space-y-4 opacity-10">
                                <Layers size={48} className="text-slate-400" />
                                <p className="text-xs font-bold text-slate-400">Content bounds adapt to {width}px width</p>
                            </div>
                        </div>
                        {/* Visual annotations */}
                        <div className="absolute -left-12 top-1/2 -translate-y-1/2 h-full flex flex-col items-center justify-center gap-2">
                            <div className="w-1 h-32 bg-primary/20 rounded-full" />
                            <span className="text-[8px] font-black text-primary/40 uppercase vertical-text">Height</span>
                        </div>
                        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full flex items-center justify-center gap-2">
                            <div className="h-1 flex-1 bg-primary/20 rounded-full" />
                            <span className="text-[8px] font-black text-primary/40 uppercase">Width</span>
                            <div className="h-1 flex-1 bg-primary/20 rounded-full" />
                        </div>
                    </div>

                    <div className="max-w-md p-6 bg-white border border-border rounded-3xl flex items-start gap-4">
                        <Info size={24} className="text-primary shrink-0" />
                        <div className="space-y-1">
                            <p className="text-xs font-bold text-text-primary">Device Pixel Ratio (DPR): {window.devicePixelRatio}</p>
                            <p className="text-[10px] text-text-secondary leading-relaxed">
                                Your browser is currently reporting coordinates in CSS pixels. Multiply these by DPR for true physical resolution.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
