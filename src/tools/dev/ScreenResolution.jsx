import { useState } from 'react';
import { Smartphone, Copy, RefreshCw, Hash, Info, Maximize } from 'lucide-react';

export default function ScreenResolution() {
    const [w, setW] = useState(1920);
    const [h, setH] = useState(1080);
    const [diag, setDiag] = useState(15.6);

    const ppi = Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2)) / diag;
    const dotPitch = 25.4 / ppi;

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-sidebar p-8 rounded-[40px] border border-border space-y-6 shadow-sm">
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-2 px-1">Res. Width</label>
                                <input type="number" value={w} onChange={(e) => setW(parseInt(e.target.value))} className="w-full p-4 bg-background border border-border rounded-xl font-bold text-sm outline-none focus:border-primary" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-2 px-1">Res. Height</label>
                                <input type="number" value={h} onChange={(e) => setH(parseInt(e.target.value))} className="w-full p-4 bg-background border border-border rounded-xl font-bold text-sm outline-none focus:border-primary" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-4 flex justify-between">Diagonal Size <span className="text-primary">{diag}"</span></label>
                            <input type="range" min="4" max="100" step="0.1" value={diag} onChange={(e) => setDiag(parseFloat(e.target.value))} className="w-full accent-primary" />
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-primary/5 rounded-[40px] border border-primary/10 flex flex-col items-center text-center gap-3">
                    <Maximize className="text-primary" size={24} />
                    <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Pixel Density</p>
                    <p className="text-[11px] text-text-secondary leading-relaxed">
                        Retina displays (HiDPI) typically have a PPI over 200. Standard desktops sit between 90-110 PPI.
                    </p>
                </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
                <div className="bg-primary p-12 rounded-[40px] text-white flex flex-col items-center justify-center text-center shadow-xl group">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-2">Display PPI</p>
                    <span className="text-8xl font-black group-hover:scale-110 transition-transform duration-500">
                        {Math.round(ppi)}
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-sidebar p-8 rounded-[40px] border border-border flex flex-col items-center text-center gap-1 shadow-inner">
                        <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Dot Pitch</p>
                        <p className="text-2xl font-black text-text-primary">{dotPitch.toFixed(4)}<span className="text-[10px] ml-1">mm</span></p>
                    </div>
                    <div className="bg-sidebar p-8 rounded-[40px] border border-border flex flex-col items-center text-center gap-1 shadow-inner">
                        <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Classification</p>
                        <p className="text-2xl font-black text-primary uppercase text-sm tracking-widest">{ppi > 180 ? 'Retina' : 'Standard'}</p>
                    </div>
                </div>

                <button
                    onClick={() => navigator.clipboard.writeText(`${Math.round(ppi)} PPI / ${w}x${h} @ ${diag}"`)}
                    className="w-full py-4 bg-white border border-border rounded-2xl font-bold text-xs uppercase tracking-widest text-primary hover:shadow-lg transition-all"
                >
                    <Copy size={16} /> Copy Display Specs
                </button>
            </div>
        </div>
    );
}
