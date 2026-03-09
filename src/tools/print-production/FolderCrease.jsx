import { useState } from 'react';
import { Columns, Copy, RefreshCw, Layout, Info, Scissors } from 'lucide-react';

export default function FolderCrease() {
    const [panels, setPanels] = useState(3);
    const [width, setWidth] = useState(297);
    const [height, setHeight] = useState(210);

    const panelWidth = width / panels;

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-sidebar p-8 rounded-[40px] border border-border space-y-6">
                    <div>
                        <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-4 px-1">Number of Panels</label>
                        <div className="flex gap-2">
                            {[2, 3, 4].map(p => (
                                <button
                                    key={p}
                                    onClick={() => setPanels(p)}
                                    className={`flex-1 py-3 rounded-xl font-bold text-xs border transition-all ${panels === p ? 'bg-primary border-primary text-white shadow-md' : 'bg-white border-border text-text-secondary hover:bg-sidebar'}`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-2 flex justify-between">Total Width <span className="text-primary">{width}mm</span></label>
                            <input type="range" min="100" max="1000" value={width} onChange={(e) => setWidth(parseInt(e.target.value))} className="w-full accent-primary" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-2 flex justify-between">Height <span className="text-primary">{height}mm</span></label>
                            <input type="range" min="100" max="1000" value={height} onChange={(e) => setHeight(parseInt(e.target.value))} className="w-full accent-primary" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
                <div className="bg-sidebar rounded-[40px] border border-border p-12 min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden group">
                    {/* Template Visualization */}
                    <div
                        className="bg-white border-2 border-primary shadow-xl flex relative transition-transform duration-500 group-hover:scale-105"
                        style={{ width: '80%', aspectRatio: `${width}/${height}` }}
                    >
                        {[...Array(panels)].map((_, i) => (
                            <div
                                key={i}
                                className={`flex-1 border-r-2 border-dashed border-primary/20 flex flex-col items-center justify-center text-center p-4 last:border-r-0`}
                            >
                                <p className="text-[10px] font-black uppercase text-primary/40 tracking-widest mb-1">Panel {i + 1}</p>
                                <p className="text-xs font-bold text-text-primary">{panelWidth.toFixed(1)}mm</p>
                            </div>
                        ))}

                        {/* Crease Indicators */}
                        <div className="absolute -top-8 inset-x-0 flex justify-evenly pointer-events-none">
                            {[...Array(panels - 1)].map((_, i) => (
                                <div key={i} className="flex flex-col items-center gap-1">
                                    <Scissors size={14} className="text-primary/40 rotate-90" />
                                    <div className="h-4 w-0.5 bg-primary/20" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-12 flex gap-8">
                        <div className="text-center">
                            <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Panel Width</p>
                            <p className="text-2xl font-black text-text-primary">{panelWidth.toFixed(1)}mm</p>
                        </div>
                        <div className="text-center">
                            <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Fold Type</p>
                            <p className="text-2xl font-black text-primary">{panels === 3 ? 'Tri-fold' : panels === 2 ? 'Bi-fold' : 'Accordion'}</p>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-white border border-border rounded-[40px] flex items-start gap-4 shadow-soft">
                    <Info className="text-primary shrink-0" size={24} />
                    <p className="text-[11px] text-text-secondary leading-relaxed">
                        For tri-fold brochures, the inner-most panel should usually be 2-3mm narrower than the others to allow for a clean fold. This calculator provides a base symmetric template.
                    </p>
                </div>
            </div>
        </div>
    );
}
