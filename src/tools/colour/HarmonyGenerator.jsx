import { useState, useEffect } from 'react';
import chroma from 'chroma-js';
import { Copy, RefreshCw, Info } from 'lucide-react';

const HARMONIES = [
    { id: 'complementary', name: 'Complementary', desc: 'Opposite on the color wheel' },
    { id: 'analogous', name: 'Analogous', desc: 'Sideways neighbors' },
    { id: 'triadic', name: 'Triadic', desc: 'Equally spaced triangle' },
    { id: 'split', name: 'Split-Complementary', desc: 'Opposite + two neighbors' },
    { id: 'tetradic', name: 'Tetradic', desc: 'Double complementary rectangle' },
    { id: 'square', name: 'Square', desc: 'Four colors spaced at 90°' }
];

export default function HarmonyGenerator() {
    const [baseColor, setBaseColor] = useState('#6366F1');
    const [mode, setMode] = useState('complementary');
    const [palette, setPalette] = useState([]);

    useEffect(() => {
        generate();
    }, [baseColor, mode]);

    const generate = () => {
        let colors = [baseColor];
        const h = chroma(baseColor).get('hsl.h');
        const s = chroma(baseColor).get('hsl.s');
        const l = chroma(baseColor).get('hsl.l');

        const getHex = (hue) => chroma.hsl((hue + 360) % 360, s, l).hex();

        switch (mode) {
            case 'complementary':
                colors.push(getHex(h + 180));
                break;
            case 'analogous':
                colors = [getHex(h - 30), baseColor, getHex(h + 30)];
                break;
            case 'triadic':
                colors = [baseColor, getHex(h + 120), getHex(h + 240)];
                break;
            case 'split':
                colors = [baseColor, getHex(h + 150), getHex(h + 210)];
                break;
            case 'tetradic':
                colors = [baseColor, getHex(h + 60), getHex(h + 180), getHex(h + 240)];
                break;
            case 'square':
                colors = [baseColor, getHex(h + 90), getHex(h + 180), getHex(h + 270)];
                break;
        }
        setPalette(colors);
    };

    const copy = (hex) => {
        navigator.clipboard.writeText(hex.toUpperCase());
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
                                className="w-16 h-12 rounded-lg border border-border cursor-pointer overflow-hidden shadow-sm"
                            />
                            <input
                                type="text"
                                value={baseColor.toUpperCase()}
                                onChange={(e) => setBaseColor(e.target.value)}
                                className="flex-1 px-4 rounded-lg border border-border bg-background font-mono text-sm uppercase"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-semibold mb-2">Harmony Rule</label>
                        <div className="grid grid-cols-1 gap-2">
                            {HARMONIES.map((h) => (
                                <button
                                    key={h.id}
                                    onClick={() => setMode(h.id)}
                                    className={`group px-4 py-3 rounded-xl border text-left transition-all relative overflow-hidden ${mode === h.id ? 'bg-primary border-primary shadow-md' : 'bg-surface border-border hover:bg-sidebar'
                                        }`}
                                >
                                    <p className={`text-sm font-bold ${mode === h.id ? 'text-white' : 'text-text-primary'}`}>{h.name}</p>
                                    <p className={`text-[10px] ${mode === h.id ? 'text-white/70' : 'text-text-secondary'}`}>{h.desc}</p>
                                    {mode === h.id && (
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20">
                                            <Info size={40} />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <div className="h-[400px] flex gap-2 p-2 bg-sidebar rounded-2xl border border-border border-dashed">
                        {palette.map((hex, i) => (
                            <div
                                key={`${hex}-${i}`}
                                style={{ backgroundColor: hex }}
                                className="flex-1 rounded-xl shadow-soft flex flex-col items-center justify-end pb-8 group relative cursor-pointer hover:flex-[1.5] transition-all duration-500"
                                onClick={() => copy(hex)}
                            >
                                <button className="opacity-0 group-hover:opacity-100 p-3 bg-black/20 backdrop-blur-md rounded-full text-white transition-opacity mb-4">
                                    <Copy size={20} />
                                </button>
                                <div className={`flex flex-col items-center gap-1 ${chroma(hex).luminance() > 0.5 ? 'text-black' : 'text-white'}`}>
                                    <span className="text-[10px] font-black uppercase opacity-60">Color {i + 1}</span>
                                    <span className="font-mono font-bold text-sm tracking-tighter">{hex.toUpperCase()}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between items-center px-2">
                        <p className="text-xs text-text-secondary italic">Click any color to copy HEX code</p>
                        <button
                            onClick={() => setBaseColor(chroma.random().hex())}
                            className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg text-sm font-bold hover:shadow-sm active:scale-95 transition-all"
                        >
                            <RefreshCw size={16} />
                            Randomize
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
