import { useState, useEffect } from 'react';
import chroma from 'chroma-js';
import { ArrowRightLeft, Copy, Info } from 'lucide-react';

export default function CMYKRGBConverter() {
    const [cmyk, setCmyk] = useState({ c: 0, m: 100, y: 100, k: 0 });
    const [rgb, setRgb] = useState({ r: 255, g: 0, b: 0 });
    const [hex, setHex] = useState('#FF0000');

    useEffect(() => {
        // CMYK to RGB
        const color = chroma.cmyk(cmyk.c / 100, cmyk.m / 100, cmyk.y / 100, cmyk.k / 100);
        const [r, g, b] = color.rgb();
        setRgb({ r, g, b });
        setHex(color.hex().toUpperCase());
    }, [cmyk]);

    const update = (key, val) => {
        setCmyk(prev => ({ ...prev, [key]: parseInt(val) || 0 }));
    };

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
                <div className="space-y-6">
                    <h3 className="text-sm font-bold text-text-primary px-1 flex items-center gap-2">
                        <ArrowRightLeft size={16} className="text-primary" />
                        CMYK Input (Print)
                    </h3>
                    <div className="space-y-4">
                        {['c', 'm', 'y', 'k'].map(key => (
                            <div key={key} className="space-y-1">
                                <div className="flex justify-between text-[10px] font-black uppercase text-text-secondary tracking-widest mb-1">
                                    <span>{key === 'c' ? 'Cyan' : key === 'm' ? 'Magenta' : key === 'y' ? 'Yellow' : 'Key (Black)'}</span>
                                    <span className="text-primary">{cmyk[key]}%</span>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <input
                                        type="range"
                                        min="0" max="100"
                                        value={cmyk[key]}
                                        onChange={(e) => update(key, e.target.value)}
                                        className="flex-1 h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                    <input
                                        type="number"
                                        min="0" max="100"
                                        value={cmyk[key]}
                                        onChange={(e) => update(key, e.target.value)}
                                        className="w-16 p-2 rounded-lg border border-border bg-surface text-center font-mono text-sm"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-4 bg-sidebar rounded-xl border border-border border-dashed flex gap-3 text-[11px] text-text-secondary leading-relaxed">
                    <Info size={18} className="text-primary shrink-0 mt-0.5" />
                    CMYK to RGB conversion is subjective and depends on color profiles. Nixby uses standard mathematical conversion (SWOP approximation).
                </div>
            </div>

            <div className="space-y-6">
                <h3 className="text-sm font-bold text-text-primary px-1">Digital Preview (RGB)</h3>

                <div
                    className="h-48 rounded-3xl border-8 border-white shadow-soft transition-colors duration-500 flex items-center justify-center"
                    style={{ backgroundColor: hex }}
                >
                    <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-2xl flex flex-col items-center">
                        <span className="text-[10px] font-black uppercase text-white/80 tracking-widest mb-1">HEX</span>
                        <span className="text-2xl font-black text-white">{hex}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                    <div className="group bg-surface border border-border p-4 rounded-2xl flex items-center justify-between hover:border-primary/30 transition-all">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary/50 mb-1">RGB</p>
                            <p className="font-mono text-sm text-text-primary">rgb({rgb.r}, {rgb.g}, {rgb.b})</p>
                        </div>
                        <button
                            onClick={() => navigator.clipboard.writeText(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}
                            className="p-3 bg-sidebar rounded-xl hover:bg-primary hover:text-white transition-all"
                        >
                            <Copy size={16} />
                        </button>
                    </div>

                    <div className="group bg-surface border border-border p-4 rounded-2xl flex items-center justify-between hover:border-primary/30 transition-all">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary/50 mb-1">HEX CSS</p>
                            <p className="font-mono text-sm text-text-primary">{hex}</p>
                        </div>
                        <button
                            onClick={() => navigator.clipboard.writeText(hex)}
                            className="p-3 bg-sidebar rounded-xl hover:bg-primary hover:text-white transition-all"
                        >
                            <Copy size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
