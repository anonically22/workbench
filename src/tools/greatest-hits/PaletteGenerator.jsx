import { useState, useEffect } from 'react';
import chroma from 'chroma-js';
import { Copy, RefreshCcw, Download, Plus, Trash2 } from 'lucide-react';

export default function PaletteGenerator() {
    const [baseColor, setBaseColor] = useState('#6366F1');
    const [mode, setMode] = useState('analogous');
    const [count, setCount] = useState(5);
    const [palette, setPalette] = useState([]);

    const modes = [
        { id: 'analogous', name: 'Analogous' },
        { id: 'complementary', name: 'Complementary' },
        { id: 'triadic', name: 'Triadic' },
        { id: 'tetradic', name: 'Tetradic' },
        { id: 'monochromatic', name: 'Monochromatic' }
    ];

    useEffect(() => {
        generatePalette();
    }, [baseColor, mode, count]);

    const generatePalette = () => {
        let colors = [];
        try {
            if (mode === 'monochromatic') {
                colors = chroma.scale([chroma(baseColor).brighten(2), baseColor, chroma(baseColor).darken(2)]).colors(count);
            } else if (mode === 'complementary') {
                colors = [baseColor, chroma(baseColor).set('hsl.h', '+180').hex()];
                if (count > 2) {
                    const extra = chroma.scale([colors[0], colors[1]]).colors(count);
                    colors = extra;
                }
            } else if (mode === 'analogous') {
                colors = [
                    chroma(baseColor).set('hsl.h', '-30').hex(),
                    baseColor,
                    chroma(baseColor).set('hsl.h', '+30').hex()
                ];
                if (count > 3) {
                    colors = chroma.scale([colors[0], colors[2]]).colors(count);
                }
            } else if (mode === 'triadic') {
                colors = [
                    baseColor,
                    chroma(baseColor).set('hsl.h', '+120').hex(),
                    chroma(baseColor).set('hsl.h', '+240').hex()
                ];
                if (count > 3) {
                    colors = chroma.scale([colors[0], colors[2]]).colors(count);
                }
            } else if (mode === 'tetradic') {
                colors = [
                    baseColor,
                    chroma(baseColor).set('hsl.h', '+90').hex(),
                    chroma(baseColor).set('hsl.h', '+180').hex(),
                    chroma(baseColor).set('hsl.h', '+270').hex()
                ];
                if (count > 4) {
                    colors = chroma.scale([colors[0], colors[3]]).colors(count);
                }
            }
            setPalette(colors.slice(0, count));
        } catch (e) {
            console.error(e);
        }
    };

    const copyToClipboard = (color) => {
        navigator.clipboard.writeText(color.toUpperCase());
        // Could add a toast here
    };

    const downloadCSS = () => {
        const css = palette.map((c, i) => `--color-${i + 1}: ${c.toUpperCase()};`).join('\n');
        const blob = new Blob([`:root {\n${css}\n}`], { type: 'text/css' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'palette.css';
        link.click();
    };

    return (
        <div className="p-6 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold mb-2">Base Colour</label>
                        <div className="flex gap-2">
                            <input
                                type="color"
                                value={baseColor}
                                onChange={(e) => setBaseColor(e.target.value)}
                                className="w-16 h-12 rounded-lg border border-border cursor-pointer overflow-hidden"
                            />
                            <input
                                type="text"
                                value={baseColor.toUpperCase()}
                                onChange={(e) => setBaseColor(e.target.value)}
                                className="flex-1 px-4 rounded-lg border border-border bg-background font-mono text-sm focus:ring-2 focus:ring-primary outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">Harmony Mode</label>
                        <div className="grid grid-cols-1 gap-2">
                            {modes.map((m) => (
                                <button
                                    key={m.id}
                                    onClick={() => setMode(m.id)}
                                    className={`px-4 py-2 rounded-lg border text-left text-sm transition-all ${mode === m.id
                                            ? 'bg-primary text-white border-primary shadow-sm'
                                            : 'bg-surface text-text-secondary border-border hover:bg-sidebar hover:text-text-primary'
                                        }`}
                                >
                                    {m.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">Colours: {count}</label>
                        <input
                            type="range"
                            min="2"
                            max="10"
                            value={count}
                            onChange={(e) => setCount(parseInt(e.target.value))}
                            className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                    </div>
                </div>

                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div className="flex-1 min-h-[300px] flex rounded-xl border border-border overflow-hidden shadow-soft">
                        {palette.map((color, i) => (
                            <div
                                key={`${color}-${i}`}
                                style={{ backgroundColor: color }}
                                className="flex-1 group relative flex flex-col items-center justify-end pb-8 cursor-pointer transition-all hover:flex-[1.5]"
                                onClick={() => copyToClipboard(color)}
                            >
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-md p-2 rounded-full mb-4 text-white">
                                    <Copy size={16} />
                                </div>
                                <span className={`font-mono text-xs font-bold ${chroma(color).luminance() > 0.5 ? 'text-black/60' : 'text-white/60'}`}>
                                    {color.toUpperCase()}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between items-center bg-sidebar p-4 rounded-xl border border-border">
                        <div className="flex gap-2">
                            <button
                                onClick={() => setBaseColor(chroma.random().hex())}
                                className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg text-sm font-bold hover:bg-white transition-all shadow-sm active:scale-95"
                            >
                                <RefreshCcw size={16} />
                                Randomize
                            </button>
                        </div>
                        <button
                            onClick={downloadCSS}
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:shadow-lg transition-all active:scale-95"
                        >
                            <Download size={16} />
                            Export CSS
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
