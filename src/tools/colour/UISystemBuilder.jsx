import { useState, useEffect } from 'react';
import chroma from 'chroma-js';
import { Copy, Plus, Layout, RefreshCw, Layers } from 'lucide-react';

export default function UISystemBuilder() {
    const [primary, setPrimary] = useState('#6366F1');
    const [secondary, setSecondary] = useState('#F59E0B');
    const [gray, setGray] = useState('#64748B');
    const [system, setSystem] = useState({});

    useEffect(() => {
        build();
    }, [primary, secondary, gray]);

    const build = () => {
        const gen = (base) => {
            const scale = chroma.scale(['white', base, 'black']).domain([0, 0.5, 1]).mode('lch').colors(11);
            return {
                50: scale[1],
                200: scale[3],
                400: scale[5],
                500: scale[6],
                700: scale[8],
                900: scale[10]
            };
        };

        setSystem({
            primary: gen(primary),
            secondary: gen(secondary),
            gray: gen(gray)
        });
    };

    const ColorGrid = ({ title, base, setBase, shades }) => (
        <div className="bg-surface rounded-3xl border border-border p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-text-primary capitalize">{title}</h3>
                <input
                    type="color"
                    value={base}
                    onChange={(e) => setBase(e.target.value)}
                    className="w-10 h-10 rounded-full border-2 border-white cursor-pointer shadow-sm overflow-hidden"
                />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                {shades && Object.entries(shades).map(([stop, hex]) => (
                    <div
                        key={stop}
                        onClick={() => navigator.clipboard.writeText(hex.toUpperCase())}
                        className="p-3 bg-white rounded-xl border border-border group hover:border-primary transition-all cursor-pointer shadow-sm"
                    >
                        <div className="w-full h-8 rounded-lg mb-2" style={{ backgroundColor: hex }} />
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black text-text-secondary">{stop}</span>
                            <span className="text-[9px] font-mono text-primary opacity-0 group-hover:opacity-100">{hex.toUpperCase()}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="p-6 space-y-8">
            <div className="bg-sidebar p-8 rounded-3xl border border-border flex flex-col lg:flex-row gap-8 items-center">
                <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2 text-primary font-bold">
                        <Layers size={20} />
                        UI Foundations Builder
                    </div>
                    <h2 className="text-2xl font-black text-text-primary">Design System Color Tokens</h2>
                    <p className="text-sm text-text-secondary leading-relaxed">
                        Instantly generate the base color palette for your design system. Includes primary, secondary, and neutral scales with perfect LCH interpolation.
                    </p>
                </div>
                <button
                    onClick={() => {
                        setPrimary(chroma.random().hex());
                        setSecondary(chroma.random().hex());
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:shadow-lg transition-all active:scale-95 shrink-0"
                >
                    <RefreshCw size={18} />
                    Generate New System
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ColorGrid title="Primary" base={primary} setBase={setPrimary} shades={system.primary} />
                <ColorGrid title="Secondary" base={secondary} setBase={setSecondary} shades={system.secondary} />
                <ColorGrid title="Neutral / Gray" base={gray} setBase={setGray} shades={system.gray} />
            </div>

            <div className="flex justify-center pt-8">
                <button
                    onClick={() => {
                        const config = JSON.stringify(system, null, 2);
                        navigator.clipboard.writeText(config);
                    }}
                    className="px-8 py-4 bg-surface border border-border rounded-2xl font-bold tracking-tight text-text-primary hover:bg-white transition-all shadow-soft flex items-center gap-3"
                >
                    <Copy size={20} className="text-primary" />
                    Copy Tokens as JSON
                </button>
            </div>
        </div>
    );
}
