import { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { Search, Copy, Grid, Info, Layout } from 'lucide-react';

export default function SimpleIconSet() {
    const [search, setSearch] = useState('');
    const [size, setSize] = useState(24);
    const [stroke, setStroke] = useState(2);
    const [color, setColor] = useState('#6366F1');

    const filteredIcons = Object.keys(LucideIcons)
        .filter(name => name.toLowerCase().includes(search.toLowerCase()))
        .slice(0, 100); // Limit for performance

    const copySVG = (name) => {
        // This is a simplified way to get SVG string for the user
        alert(`Icon component name "${name}" copied! Ready for React projects.`);
        navigator.clipboard.writeText(`<${name} size={${size}} strokeWidth={${stroke}} color="${color}" />`);
    };

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-sidebar p-8 rounded-[40px] border border-border space-y-6">
                    <div className="relative">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search icons..."
                            className="w-full p-4 pl-12 bg-white border border-border rounded-2xl font-bold text-sm outline-none focus:border-primary"
                        />
                        <Search className="absolute left-4 top-4 text-text-secondary" size={20} />
                    </div>

                    <div className="space-y-6 pt-4 border-t border-border">
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-4 flex justify-between">Size <span className="text-primary">{size}px</span></label>
                            <input type="range" min="16" max="64" value={size} onChange={(e) => setSize(parseInt(e.target.value))} className="w-full accent-primary" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-4 flex justify-between">Stroke <span className="text-primary">{stroke}px</span></label>
                            <input type="range" min="0.5" max="3" step="0.5" value={stroke} onChange={(e) => setStroke(parseFloat(e.target.value))} className="w-full accent-primary" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-2">Color</label>
                            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-full h-10 rounded-xl cursor-pointer" />
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-surface border-2 border-dashed border-border rounded-[40px] flex flex-col items-center text-center gap-3">
                    <Info className="text-primary" size={24} />
                    <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Icon Library</p>
                    <p className="text-[11px] text-text-secondary leading-relaxed">
                        Workbench integrates the full Lucide icon set. Use these for rapid prototyping or production apps.
                    </p>
                </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
                <div className="flex justify-between items-center px-1">
                    <h3 className="text-sm font-bold text-text-primary">Curated Assets</h3>
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">{filteredIcons.length} Found</span>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
                    {filteredIcons.map(name => {
                        const Icon = LucideIcons[name];
                        return (
                            <button
                                key={name}
                                onClick={() => copySVG(name)}
                                className="aspect-square bg-white border border-border rounded-2xl flex items-center justify-center group hover:border-primary hover:shadow-soft transition-all active:scale-90"
                                title={name}
                            >
                                <Icon size={size} strokeWidth={stroke} color={color} className="group-hover:scale-110 transition-transform" />
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
