import { useState, useEffect } from 'react';
import chroma from 'chroma-js';
import { Copy, Plus, Minus, MoveRight } from 'lucide-react';

export default function TintShadeGenerator() {
    const [baseColor, setBaseColor] = useState('#6366F1');
    const [tints, setTints] = useState([]);
    const [shades, setShades] = useState([]);

    useEffect(() => {
        generate();
    }, [baseColor]);

    const generate = () => {
        // Tints: Base to White (8 stops)
        const tintScale = chroma.scale([baseColor, 'white']).colors(10).slice(0, 9);
        // Shades: Base to Black (8 stops)
        const shadeScale = chroma.scale([baseColor, 'black']).colors(10).slice(0, 9);

        setTints(tintScale);
        setShades(shadeScale);
    };

    const ColorStrip = ({ title, colors, label }) => (
        <div className="space-y-3">
            <div className="flex justify-between items-end px-1">
                <h3 className="text-sm font-bold text-text-primary">{title}</h3>
                <span className="text-[10px] font-black uppercase text-text-secondary tracking-widest">{label}</span>
            </div>
            <div className="flex rounded-xl overflow-hidden border border-border shadow-soft h-20">
                {colors.map((c, i) => (
                    <div
                        key={i}
                        style={{ backgroundColor: c }}
                        onClick={() => navigator.clipboard.writeText(c.toUpperCase())}
                        className="flex-1 group relative cursor-pointer hover:flex-[1.5] transition-all flex items-end justify-center pb-2"
                    >
                        <div className={`opacity-0 group-hover:opacity-100 transition-opacity absolute inset-0 flex items-center justify-center bg-black/10`}>
                            <Copy size={14} className={chroma(c).luminance() > 0.5 ? 'text-black/40' : 'text-white/40'} />
                        </div>
                        <span className={`text-[8px] font-bold ${chroma(c).luminance() > 0.5 ? 'text-black/40' : 'text-white/40'}`}>
                            {Math.round(i * 12.5)}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="p-6 space-y-8">
            <div className="flex flex-col md:flex-row items-center gap-6 bg-sidebar p-6 rounded-2xl border border-border">
                <div className="space-y-1 shrink-0">
                    <label className="block text-xs font-black uppercase text-text-secondary tracking-widest">Base Color</label>
                    <div className="flex gap-3">
                        <input
                            type="color"
                            value={baseColor}
                            onChange={(e) => setBaseColor(e.target.value)}
                            className="w-16 h-16 rounded-xl border border-border cursor-pointer overflow-hidden p-1 bg-white shadow-soft"
                        />
                        <div className="flex flex-col justify-center">
                            <input
                                type="text"
                                value={baseColor.toUpperCase()}
                                onChange={(e) => setBaseColor(e.target.value)}
                                className="bg-transparent border-none font-mono text-xl font-black text-text-primary p-0 outline-none w-28"
                            />
                            <p className="text-[10px] text-text-secondary font-medium">HSL: {chroma(baseColor).css('hsl')}</p>
                        </div>
                    </div>
                </div>

                <div className="hidden md:block h-12 w-[2px] bg-border mx-4" />

                <div className="flex-1 space-y-2">
                    <p className="text-xs font-bold text-text-primary flex items-center gap-2">
                        <MoveRight size={14} className="text-primary" />
                        How it works
                    </p>
                    <p className="text-xs text-text-secondary leading-relaxed max-w-xl">
                        This tool generates a balanced scale of tints (adding white) and shades (adding black) based on your base color. Useful for building consistent UI depth and variations.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-12">
                <ColorStrip title="Tints" colors={tints} label="Lighter" />
                <ColorStrip title="Shades" colors={shades} label="Darker" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {['Complementary', 'Triadic', 'Analogous', 'Monochrome'].map((p) => (
                    <div key={p} className="p-4 bg-surface rounded-xl border border-border border-dashed flex items-center justify-between group hover:border-primary transition-all cursor-not-allowed grayscale">
                        <span className="text-xs font-bold text-text-secondary group-hover:text-primary">{p} Variations</span>
                        <span className="text-[9px] px-2 py-0.5 bg-sidebar rounded text-text-secondary">Soon</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
