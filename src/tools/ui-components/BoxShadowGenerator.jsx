import { useState } from 'react';
import { Layers, Copy, RefreshCw, Box, Info } from 'lucide-react';

export default function BoxShadowGenerator() {
    const [x, setX] = useState(0);
    const [y, setY] = useState(10);
    const [blur, setBlur] = useState(25);
    const [spread, setSpread] = useState(-5);
    const [opacity, setOpacity] = useState(0.1);
    const [color, setColor] = useState('#000000');

    const css = `box-shadow: ${x}px ${y}px ${blur}px ${spread}px ${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')};`;

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-sidebar p-8 rounded-[40px] border border-border space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-4 flex justify-between">
                                X-Offset
                                <span className="text-primary">{x}px</span>
                            </label>
                            <input type="range" min="-50" max="50" value={x} onChange={(e) => setX(parseInt(e.target.value))} className="w-full accent-primary" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-4 flex justify-between">
                                Y-Offset
                                <span className="text-primary">{y}px</span>
                            </label>
                            <input type="range" min="-50" max="50" value={y} onChange={(e) => setY(parseInt(e.target.value))} className="w-full accent-primary" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-4 flex justify-between">
                                Blur Radius
                                <span className="text-primary">{blur}px</span>
                            </label>
                            <input type="range" min="0" max="100" value={blur} onChange={(e) => setBlur(parseInt(e.target.value))} className="w-full accent-primary" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-4 flex justify-between">
                                Spread Radius
                                <span className="text-primary">{spread}px</span>
                            </label>
                            <input type="range" min="-50" max="50" value={spread} onChange={(e) => setSpread(parseInt(e.target.value))} className="w-full accent-primary" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-4 flex justify-between">
                                Opacity
                                <span className="text-primary">{Math.round(opacity * 100)}%</span>
                            </label>
                            <input type="range" min="0" max="1" step="0.01" value={opacity} onChange={(e) => setOpacity(parseFloat(e.target.value))} className="w-full accent-primary" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-3 space-y-8">
                <div className="bg-sidebar h-[450px] rounded-[40px] border border-border flex items-center justify-center p-12">
                    <div
                        className="w-64 h-64 bg-white rounded-3xl transition-all duration-300 flex items-center justify-center border border-border"
                        style={{
                            boxShadow: `${x}px ${y}px ${blur}px ${spread}px ${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`
                        }}
                    >
                        <div className="text-center space-y-2 opacity-20">
                            <Box size={48} className="mx-auto" />
                            <p className="text-[10px] font-black uppercase tracking-widest">Shadow Preview</p>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900 p-8 rounded-[40px] text-white shadow-xl relative overflow-hidden">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">CSS Code</span>
                        <button
                            onClick={() => navigator.clipboard.writeText(css)}
                            className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest hover:underline"
                        >
                            <Copy size={14} /> Copy Rule
                        </button>
                    </div>
                    <code className="font-mono text-xs opacity-80 break-all leading-relaxed">
                        {css}
                    </code>

                    <div className="mt-8 pt-6 border-t border-white/10 flex items-start gap-3">
                        <Info size={16} className="text-primary shrink-0" />
                        <p className="text-[10px] text-white/40 leading-relaxed">
                            Modern UI depth is often achieved with "soft shadows" — high blur and small negative spread.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
