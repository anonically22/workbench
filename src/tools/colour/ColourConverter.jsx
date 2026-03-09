import { useState, useEffect } from 'react';
import chroma from 'chroma-js';
import { Copy, Hash, Repeat } from 'lucide-react';

export default function ColourConverter() {
    const [input, setInput] = useState('#6366F1');
    const [formats, setFormats] = useState({});

    useEffect(() => {
        updateFormats(input);
    }, [input]);

    const updateFormats = (val) => {
        try {
            const c = chroma(val);
            setFormats({
                hex: c.hex().toUpperCase(),
                rgb: c.css('rgb'),
                rgba: c.css('rgba'),
                hsl: c.css('hsl'),
                hsv: `hsv(${c.hsv().map(v => Math.round(v)).join(', ')})`,
                cmyk: `cmyk(${c.cmyk().map(v => Math.round(v * 100)).join('%, ')}%)`,
                lab: `lab(${c.lab().map(v => Math.round(v)).join(', ')})`
            });
        } catch (e) {
            // Keep previous formats on invalid input
        }
    };

    const copy = (val) => {
        navigator.clipboard.writeText(val);
    };

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold mb-2 text-text-secondary">Input Any Colour Format</label>
                    <div className="relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full p-4 rounded-xl border-2 border-border bg-background font-mono text-lg focus:border-primary outline-none transition-all pr-16"
                            placeholder="#000000 or rgb(...) or hsl(...)"
                        />
                        <div
                            className="absolute right-3 top-3 w-10 h-10 rounded-lg shadow-sm border border-white/20"
                            style={{ backgroundColor: formats.hex || '#000' }}
                        />
                    </div>
                    <p className="mt-2 text-xs text-text-secondary">
                        Paste HEX, RGB, HSL, or even a CSS colour name like "indigo".
                    </p>
                </div>

                <div className="flex items-center gap-4 p-4 bg-sidebar rounded-xl border border-border">
                    <div className="w-12 h-12 rounded-full shadow-inner border-2 border-white" style={{ backgroundColor: formats.hex }} />
                    <div>
                        <p className="text-sm font-bold text-text-primary">Live Preview</p>
                        <p className="text-xs text-text-secondary font-mono">{formats.hex}</p>
                    </div>
                    <button
                        onClick={() => setInput(chroma.random().hex())}
                        className="ml-auto p-2 hover:bg-border rounded-lg text-primary transition-colors"
                        title="Random Colour"
                    >
                        <Repeat size={20} />
                    </button>
                </div>
            </div>

            <div className="space-y-3">
                {Object.entries(formats).map(([key, val]) => (
                    <div key={key} className="group relative bg-surface border border-border p-4 rounded-xl flex items-center justify-between hover:border-primary/30 transition-all hover:shadow-sm">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary/50 mb-1">{key}</p>
                            <p className="font-mono text-sm text-text-primary">{val}</p>
                        </div>
                        <button
                            onClick={() => copy(val)}
                            className="p-2 opacity-0 group-hover:opacity-100 bg-primary/10 text-primary rounded-lg transition-all hover:bg-primary hover:text-white"
                            title={`Copy ${key.toUpperCase()}`}
                        >
                            <Copy size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
