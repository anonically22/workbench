import { useState } from 'react';
import { Book, Copy, RefreshCw, Layers, Info, Search } from 'lucide-react';

const SIZES = [
    { name: 'A4', size: '210 x 297 mm', ratio: '1:1.41', desc: 'Standard business paper.' },
    { name: 'A5', size: '148 x 210 mm', ratio: '1:1.41', desc: 'Notebooks and flyers.' },
    { name: 'A3', size: '297 x 420 mm', ratio: '1:1.41', desc: 'Posters and drawings.' },
    { name: 'Letter', size: '8.5 x 11 in', ratio: '1:1.29', desc: 'US standard document.' },
    { name: 'Tabloid', size: '11 x 17 in', ratio: '1:1.54', desc: 'US newsletters/posters.' },
    { name: 'Business Card', size: '85 x 55 mm', ratio: '1:1.54', desc: 'Standard networking card.' }
];

export default function PaperSizeReference() {
    const [search, setSearch] = useState('');

    const filtered = SIZES.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-sidebar p-8 rounded-[40px] border border-border space-y-6">
                    <div className="relative">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search sizes..."
                            className="w-full p-4 pl-12 bg-white border border-border rounded-2xl font-bold text-sm outline-none focus:border-primary"
                        />
                        <Search className="absolute left-4 top-4 text-text-secondary" size={20} />
                    </div>

                    <div className="p-6 bg-primary/5 border border-primary/10 rounded-3xl space-y-3">
                        <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest">ISO 216 Standard</p>
                        <p className="text-[11px] text-text-secondary leading-relaxed">
                            The A-series is based on the square root of 2. Half an A4 is exactly an A5.
                        </p>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filtered.map(s => (
                        <div key={s.name} className="bg-sidebar p-8 rounded-[40px] border border-border flex flex-col justify-between hover:border-primary transition-all group">
                            <div className="space-y-4">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-2xl font-black text-text-primary">{s.name}</h3>
                                    <span className="px-3 py-1 bg-white rounded-full border border-border text-[10px] font-black uppercase tracking-widest text-primary">{s.ratio}</span>
                                </div>
                                <p className="text-4xl font-mono font-black text-text-primary/10 group-hover:text-primary/20 transition-colors">{s.size}</p>
                                <p className="text-xs text-text-secondary font-medium">{s.desc}</p>
                            </div>

                            <button
                                onClick={() => navigator.clipboard.writeText(s.size)}
                                className="mt-8 flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest hover:underline"
                            >
                                <Copy size={14} /> Copy Dimensions
                            </button>
                        </div>
                    ))}
                </div>

                <div className="p-8 bg-white border border-border rounded-[40px] flex items-center gap-6 shadow-soft">
                    <Book className="text-primary shrink-0" size={32} />
                    <div className="space-y-1">
                        <h4 className="text-sm font-bold text-text-primary">Printing at Scale</h4>
                        <p className="text-xs text-text-secondary leading-relaxed">
                            Always verify your printer's "Fit to Page" settings. Most modern printers require a 3-5mm margin unless you are printing bleed.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
