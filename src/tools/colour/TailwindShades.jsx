import { useState, useEffect } from 'react';
import chroma from 'chroma-js';
import { Copy, Download, Layers } from 'lucide-react';

export default function TailwindShades() {
    const [baseColor, setBaseColor] = useState('#6366F1');
    const [name, setName] = useState('indigo');
    const [shades, setShades] = useState({});

    useEffect(() => {
        generateShades(baseColor);
    }, [baseColor]);

    const generateShades = (color) => {
        try {
            // Use chroma scale to generate 11 stops
            // 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950
            const scale = chroma.scale(['white', color, 'black'])
                .domain([0, 0.5, 1])
                .mode('lch')
                .colors(12); // Using 12 to pick specific ones for better range

            setShades({
                50: scale[1],
                100: scale[2],
                200: scale[3],
                300: scale[4],
                400: scale[5],
                500: scale[6],
                600: scale[7],
                700: scale[8],
                800: scale[9],
                900: scale[10],
                950: scale[11]
            });
        } catch (e) {
            console.error(e);
        }
    };

    const copyConfig = () => {
        const config = `"${name}": {\n${Object.entries(shades).map(([s, hex]) => `  ${s}: "${hex.toUpperCase()}"`).join(',\n')}\n}`;
        navigator.clipboard.writeText(config);
    };

    const copyCSS = () => {
        const css = Object.entries(shades).map(([s, hex]) => `--color-${name}-${s}: ${hex.toUpperCase()};`).join('\n');
        navigator.clipboard.writeText(css);
    };

    const copySingle = (hex) => {
        navigator.clipboard.writeText(hex.toUpperCase());
    };

    return (
        <div className="p-6 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold mb-2">Base Colour</label>
                        <div className="flex gap-2">
                            <input
                                type="color"
                                value={baseColor}
                                onChange={(e) => setBaseColor(e.target.value)}
                                className="w-14 h-14 rounded-xl border border-border cursor-pointer overflow-hidden p-1 bg-white shadow-sm"
                            />
                            <input
                                type="text"
                                value={baseColor.toUpperCase()}
                                onChange={(e) => setBaseColor(e.target.value)}
                                className="flex-1 px-4 rounded-xl border border-border bg-background font-mono text-lg"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Color Name (for export)</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                            className="w-full px-4 py-3 rounded-xl border border-border bg-background font-medium"
                            placeholder="brand-primary"
                        />
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={copyConfig}
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-primary text-white rounded-xl font-bold hover:shadow-lg transition-all active:scale-95"
                    >
                        <Layers size={18} />
                        Copy Tailwind
                    </button>
                    <button
                        onClick={copyCSS}
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-surface text-text-primary border border-border rounded-xl font-bold hover:bg-white transition-all active:scale-95 shadow-sm"
                    >
                        <Copy size={18} />
                        CSS Vars
                    </button>
                </div>
            </div>

            <div className="space-y-2">
                <div className="grid grid-cols-11 h-32 rounded-xl overflow-hidden shadow-soft border border-border">
                    {Object.entries(shades).map(([stop, hex]) => (
                        <div
                            key={stop}
                            style={{ backgroundColor: hex }}
                            onClick={() => copySingle(hex)}
                            className="group relative flex items-end justify-center pb-4 cursor-pointer hover:flex-[1.5] transition-all"
                        >
                            <div className="opacity-0 group-hover:opacity-100 absolute inset-0 flex items-center justify-center bg-black/10">
                                <Copy size={14} className={chroma(hex).luminance() > 0.5 ? 'text-black/40' : 'text-white/40'} />
                            </div>
                            <span className={`text-[10px] font-black ${chroma(hex).luminance() > 0.5 ? 'text-black/60' : 'text-white/60'}`}>
                                {stop}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-11 text-center">
                    {Object.values(shades).map((hex, i) => (
                        <span key={i} className="text-[9px] font-mono text-text-secondary truncate px-1">
                            {hex.toUpperCase()}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
