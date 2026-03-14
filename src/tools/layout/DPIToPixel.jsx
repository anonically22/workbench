import { useState } from 'react';
import { Smartphone, Copy, RefreshCw, Hash, Info, Grid } from 'lucide-react';

export default function DPIToPixel() {
    const [val, setVal] = useState(1);
    const [dpi, setDpi] = useState(300);
    const [unit, setUnit] = useState('in');

    const px = unit === 'in' ? val * dpi : (val / 25.4) * dpi;

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-sidebar p-8 rounded-[40px] border border-border space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-2 px-1">Physical Size</label>
                            <div className="flex gap-2">
                                <input type="number" value={val} onChange={(e) => setVal(parseFloat(e.target.value))} className="flex-1 p-4 bg-background border border-border rounded-xl font-bold text-sm outline-none focus:border-primary" />
                                <select value={unit} onChange={(e) => setUnit(e.target.value)} className="w-24 p-4 bg-background border border-border rounded-xl font-bold text-xs outline-none">
                                    <option value="in">Inches</option>
                                    <option value="mm">mm</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-4 flex justify-between">Resolution (DPI) <span className="text-primary">{dpi}</span></label>
                            <input type="range" min="72" max="600" step="1" value={dpi} onChange={(e) => setDpi(parseInt(e.target.value))} className="w-full accent-primary" />
                            <div className="flex justify-between mt-2">
                                <span className="text-[10px] font-bold text-text-secondary">72 (Web)</span>
                                <span className="text-[10px] font-bold text-text-secondary">300 (Print)</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-white border border-border rounded-[40px] flex items-start gap-4 shadow-soft">
                    <Info size={24} className="text-primary shrink-0" />
                    <p className="text-[11px] text-text-secondary leading-relaxed">
                        Pixels are relative. Physical size depends on <strong>PPI</strong> (Pixels Per Inch). For high-quality print, 300 DPI is the minimum recommended resolution.
                    </p>
                </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
                <div className="bg-primary p-12 rounded-[40px] text-white flex flex-col items-center justify-center text-center shadow-xl group">
                    <div className="mb-6 p-4 bg-white/20 rounded-2xl backdrop-blur-md">
                        <Grid size={32} />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-2">Required Pixel Dimension</p>
                    <span className="text-8xl font-black group-hover:scale-110 transition-transform duration-500">
                        {Math.round(px)}<span className="text-2xl ml-2 opacity-50">px</span>
                    </span>
                </div>

                <div className="bg-sidebar p-8 rounded-[40px] border border-border flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-1 text-center md:text-left">
                        <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Formula Used</p>
                        <p className="text-xs font-mono font-bold text-text-primary">{unit === 'in' ? 'inches * DPI' : '(mm / 25.4) * DPI'}</p>
                    </div>
                    <button
                        onClick={() => navigator.clipboard.writeText(Math.round(px).toString())}
                        className="flex items-center gap-2 px-8 py-4 bg-white border border-border rounded-2xl font-bold text-sm text-primary hover:shadow-lg transition-all"
                    >
                        <Copy size={18} /> Copy Pixels
                    </button>
                </div>
            </div>
        </div>
    );
}
