import { useState, useEffect } from 'react';
import chroma from 'chroma-js';
import { colornames as colorNameList } from 'color-name-list';
import { Search, Copy, Tag, RefreshCw } from 'lucide-react';
import ToolShell from '../../components/ToolShell';

export default function ColourNameFinder() {
    const [color, setColor] = useState('#6366F1');
    const [foundNames, setFoundNames] = useState([]);

    useEffect(() => {
        findNames();
    }, [color]);

    const findNames = () => {
        try {
            if (!chroma.valid(color)) return;
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
        <ToolShell
            title="Color Name Finder"
            description="Identify the closest named color from a HEX value using a massive curated database."
        >
            <div className="grid md:grid-cols-2 gap-8">
                {/* Control Panel */}
                <div className="space-y-6 p-6 border-2 border-black bg-white brutalist-shadow-sm">
                    <div className="space-y-2">
                        <label className="block text-sm font-bold uppercase tracking-[0.2em] text-black">Pick a Color</label>
                        <div className="flex gap-4 items-center">
                            <input
                                type="color"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                className="w-16 h-16 border-2 border-black cursor-pointer brutalist-shadow-sm shrink-0 p-0"
                            />
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    value={color.toUpperCase()}
                                    onChange={(e) => setColor(e.target.value)}
                                    className="w-full p-3 border-2 border-black brutalist-shadow-sm focus:outline-none focus:ring-2 focus:ring-accent font-mono text-lg uppercase"
                                />
                                <Search className="absolute right-3 top-3.5 text-black opacity-30" size={20} />
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => setColor(chroma.random().hex())}
                        className="w-full px-6 py-3 bg-accent text-white font-bold tracking-[0.2em] uppercase border-2 border-black brutalist-shadow-hover flex items-center justify-center gap-2"
                    >
                        <RefreshCw size={18} />
                        Random Color
                    </button>
                    <div
                        className="h-32 border-2 border-black flex items-center justify-center brutalist-shadow-sm"
                        style={{ backgroundColor: chroma.valid(color) ? color : '#fff' }}
                    >
                        <span className={`text-xs font-bold uppercase tracking-widest px-4 py-2 bg-white/30 border-2 border-black backdrop-blur-sm ${chroma.valid(color) && chroma(color).luminance() > 0.5 ? 'text-black' : 'text-white'}`}>
                            Sampling Area
                        </span>
                    </div>
                </div>

                {/* Results List */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                        <Tag size={20} className="text-accent" />
                        Closest Matches
                    </h3>

                    <div className="space-y-4">
                        {foundNames.map((n, i) => (
                            <div
                                key={`${n.hex}-${i}`}
                                className={`group relative bg-white border-2 border-black p-4 flex items-center gap-4 transition-all hover:-translate-y-1 brutalist-shadow-hover ${i === 0 ? 'bg-slate-50' : ''}`}
                            >
                                <div className="w-16 h-16 border-2 border-black brutalist-shadow-sm shrink-0" style={{ backgroundColor: n.hex }} />
                                <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                        <h4 className="font-bold text-lg uppercase tracking-wider">{n.name}</h4>
                                        {i === 0 && <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-accent border-2 border-black text-white">Top Match</span>}
                                    </div>
                                    <p className="font-mono text-xs text-black opacity-70 uppercase tracking-widest">{n.hex}</p>
                                </div>
                                <button
                                    onClick={() => navigator.clipboard.writeText(n.name)}
                                    className="p-3 opacity-0 group-hover:opacity-100 bg-white border-2 border-black text-black hover:bg-accent hover:text-white transition-colors brutalist-shadow-hover"
                                    title="Copy Name"
                                >
                                    <Copy size={18} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <p className="text-[10px] font-bold tracking-widest uppercase text-slate-500 text-center mt-6">
                        Curated from 30,000+ named colors
                    </p>
                </div>
            </div>
        </ToolShell>
    );
}
