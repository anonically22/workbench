import { useState } from 'react';
import { Search, Copy, Grid, Info, Layout } from 'lucide-react';

const CATEGORIES = {
    'Basic Latin': [0x0020, 0x007F],
    'Latin-1 Supp': [0x00A0, 0x00FF],
    'Currency': [0x20A0, 0x20CF],
    'Symbols': [0x2190, 0x21FF],
    'Math Operators': [0x2200, 0x22FF]
};

export default function GlyphBrowser() {
    const [range, setRange] = useState('Basic Latin');
    const [search, setSearch] = useState('');

    const getGlyphs = () => {
        const [start, end] = CATEGORIES[range];
        const glyphs = [];
        for (let i = start; i <= end; i++) {
            glyphs.push({
                hex: `U+${i.toString(16).toUpperCase().padStart(4, '0')}`,
                char: String.fromCharCode(i)
            });
        }
        return glyphs.filter(g => g.char.toLowerCase().includes(search.toLowerCase()) || g.hex.toLowerCase().includes(search.toLowerCase()));
    };

    const copy = (g) => {
        navigator.clipboard.writeText(g.char);
    };

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-sidebar p-6 rounded-3xl border border-border space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-text-secondary tracking-widest px-1">Range</label>
                        <div className="flex flex-col gap-2">
                            {Object.keys(CATEGORIES).map(k => (
                                <button
                                    key={k}
                                    onClick={() => setRange(k)}
                                    className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${range === k ? 'bg-primary border-primary text-white shadow-md' : 'bg-white border-border text-text-primary hover:bg-sidebar'
                                        }`}
                                >
                                    {k}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-text-secondary tracking-widest px-1">Filter Glyphs</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search hex or name..."
                                className="w-full p-3 pl-10 border border-border rounded-xl text-xs font-bold outline-none focus:border-primary"
                            />
                            <Search className="absolute left-3 top-3 text-text-secondary" size={16} />
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-surface border-2 border-dashed border-border rounded-3xl flex flex-col items-center text-center gap-2">
                    <Info className="text-primary" size={24} />
                    <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Character Mapping</p>
                    <p className="text-[11px] text-text-secondary leading-relaxed">
                        Browse through system font glyphs and special characters. Click any tile to copy the character.
                    </p>
                </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
                <div className="flex justify-between items-center px-1">
                    <h3 className="text-sm font-bold text-text-primary">Glyph Map: {range}</h3>
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">{getGlyphs().length} Items</span>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
                    {getGlyphs().map(g => (
                        <button
                            key={g.hex}
                            onClick={() => copy(g)}
                            className="aspect-square bg-white border border-border rounded-xl flex flex-col items-center justify-center gap-1 group hover:border-primary hover:shadow-soft transition-all active:scale-95"
                            title={g.hex}
                        >
                            <span className="text-2xl text-text-primary group-hover:scale-125 transition-transform">{g.char}</span>
                            <span className="text-[7px] font-mono text-text-secondary opacity-0 group-hover:opacity-100">{g.hex}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
