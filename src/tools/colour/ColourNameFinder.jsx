import { useState, useEffect } from 'react';
import chroma from 'chroma-js';
import colorNameList from 'color-name-list';
import { Search, Copy, Tag, RefreshCw } from 'lucide-react';

export default function ColourNameFinder() {
    const [color, setColor] = useState('#6366F1');
    const [foundNames, setFoundNames] = useState([]);

    useEffect(() => {
        findNames();
    }, [color]);

    const findNames = () => {
        try {
            // Find closest color in the list
            // The list is huge, so we might want to sample or use a more efficient search if it's too slow
            // But for now, let's find the absolute closest
            const target = chroma(color).rgb();

            // We'll calculate Euclidean distance
            const results = colorNameList
                .map(c => {
                    const rgb = chroma(c.hex).rgb();
                    const distance = Math.sqrt(
                        Math.pow(rgb[0] - target[0], 2) +
                        Math.pow(rgb[1] - target[1], 2) +
                        Math.pow(rgb[2] - target[2], 2)
                    );
                    return { ...c, distance };
                })
                .sort((a, b) => a.distance - b.distance)
                .slice(0, 5); // Top 5 closest

            setFoundNames(results);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold mb-2">Pick a Colour</label>
                    <div className="flex gap-4 p-6 bg-sidebar rounded-2xl border border-border items-center">
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="w-24 h-24 rounded-2xl border-4 border-white cursor-pointer shadow-soft shrink-0"
                        />
                        <div className="flex-1 space-y-2">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={color.toUpperCase()}
                                    onChange={(e) => setColor(e.target.value)}
                                    className="w-full bg-background border border-border p-3 rounded-xl font-mono text-lg font-black uppercase text-primary transition-all focus:border-primary outline-none"
                                />
                                <Search className="absolute right-3 top-3.5 text-text-secondary opacity-30" size={20} />
                            </div>
                            <button
                                onClick={() => setColor(chroma.random().hex())}
                                className="flex items-center gap-2 text-xs font-bold text-text-secondary hover:text-primary transition-colors"
                            >
                                <RefreshCw size={14} />
                                Surprise me
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className="h-32 rounded-2xl border border-border shadow-inner transition-colors duration-500 flex items-center justify-center"
                    style={{ backgroundColor: color }}
                >
                    <span className={`text-[10px] font-black uppercase tracking-[0.4em] px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm ${chroma(color).luminance() > 0.5 ? 'text-black/60' : 'text-white/60'}`}>
                        Sampling Area
                    </span>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <Tag size={18} className="text-primary" />
                    <h3 className="text-sm font-bold text-text-primary">Closest Named Matches</h3>
                </div>

                <div className="space-y-3">
                    {foundNames.map((n, i) => (
                        <div
                            key={`${n.hex}-${i}`}
                            className={`group relative bg-surface border border-border p-5 rounded-2xl flex items-center gap-4 transition-all hover:border-primary/30 ${i === 0 ? 'ring-2 ring-primary/10 bg-primary/5' : ''}`}
                        >
                            <div className="w-12 h-12 rounded-xl shadow-sm border border-white/20 shrink-0" style={{ backgroundColor: n.hex }} />
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <h4 className={`font-bold ${i === 0 ? 'text-primary text-base' : 'text-text-primary text-sm'}`}>{n.name}</h4>
                                    {i === 0 && <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-primary text-white rounded-full">Top Match</span>}
                                </div>
                                <p className="font-mono text-[10px] text-text-secondary opacity-70 uppercase tracking-widest">{n.hex}</p>
                            </div>
                            <button
                                onClick={() => navigator.clipboard.writeText(n.name)}
                                className="p-3 opacity-0 group-hover:opacity-100 bg-white shadow-sm border border-border rounded-xl text-text-secondary hover:text-primary transition-all active:scale-90"
                                title="Copy Name"
                            >
                                <Copy size={16} />
                            </button>
                        </div>
                    ))}
                </div>

                <p className="text-[10px] text-text-secondary text-center italic mt-4">
                    Curated from a database of over 30,000 unique color names.
                </p>
            </div>
        </div>
    );
}
