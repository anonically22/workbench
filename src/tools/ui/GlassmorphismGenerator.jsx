import { useState } from 'react';
import { Layers, Copy, RefreshCw, Palette, Info } from 'lucide-react';

export default function GlassmorphismGenerator() {
    const [blur, setBlur] = useState(10);
    const [transparency, setTransparency] = useState(0.2);
    const [color, setColor] = useState('#ffffff');
    const [outline, setOutline] = useState(0.1);

    const css = `
background: ${color}${Math.round(transparency * 255).toString(16).padStart(2, '0')};
backdrop-filter: blur(${blur}px);
-webkit-backdrop-filter: blur(${blur}px);
border: 1px solid ${color}${Math.round(outline * 255).toString(16).padStart(2, '0')};
border-radius: 16px;
`.trim();

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-sidebar p-8 rounded-[40px] border border-border space-y-8">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-4 flex justify-between">
                                Blur
                                <span className="text-primary">{blur}px</span>
                            </label>
                            <input type="range" min="0" max="25" step="1" value={blur} onChange={(e) => setBlur(parseInt(e.target.value))} className="w-full accent-primary" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-4 flex justify-between">
                                Transparency
                                <span className="text-primary">{Math.round(transparency * 100)}%</span>
                            </label>
                            <input type="range" min="0" max="1" step="0.05" value={transparency} onChange={(e) => setTransparency(parseFloat(e.target.value))} className="w-full accent-primary" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-4 flex justify-between">
                                Outline Alpha
                                <span className="text-primary">{Math.round(outline * 100)}%</span>
                            </label>
                            <input type="range" min="0" max="0.5" step="0.01" value={outline} onChange={(e) => setOutline(parseFloat(e.target.value))} className="w-full accent-primary" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-2">Tint Color</label>
                            <div className="flex gap-2">
                                {['#ffffff', '#000000', '#6366F1', '#F43F5E'].map(c => (
                                    <button key={c} onClick={() => setColor(c)} className={`w-8 h-8 rounded-full border-2 transition-all ${color === c ? 'border-primary scale-110' : 'border-transparent'}`} style={{ backgroundColor: c }} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-primary/5 rounded-[40px] border border-primary/10 flex flex-col items-center text-center gap-2">
                    <Info className="text-primary" size={24} />
                    <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Frosted Glass</p>
                    <p className="text-[11px] text-text-secondary leading-relaxed">
                        This effect works best over vibrant, organic backgrounds. Ensure you include the <code>-webkit</code> prefix for Safari support.
                    </p>
                </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
                <div
                    className="h-[450px] rounded-[40px] border border-border relative overflow-hidden flex items-center justify-center p-12"
                    style={{ backgroundImage: 'linear-gradient(135deg, #6366F1 0%, #A855F7 100%)' }}
                >
                    {/* Background shapes for depth */}
                    <div className="absolute top-10 left-10 w-48 h-48 bg-amber-400 rounded-full blur-3xl opacity-50 animate-pulse" />
                    <div className="absolute bottom-10 right-10 w-64 h-64 bg-rose-400 rounded-full blur-3xl opacity-50" />

                    <div
                        className="w-full max-w-md h-64 transition-all duration-300 shadow-2xl flex flex-col p-8 text-white relative z-10"
                        style={{
                            backgroundColor: `${color}${Math.round(transparency * 255).toString(16).padStart(2, '0')}`,
                            backdropFilter: `blur(${blur}px)`,
                            WebkitBackdropFilter: `blur(${blur}px)`,
                            border: `1px solid ${color}${Math.round(outline * 255).toString(16).padStart(2, '0')}`,
                            borderRadius: '32px'
                        }}
                    >
                        <div className="flex-1 space-y-4">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                <Palette size={24} />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-xl font-bold">Glass Preview</h4>
                                <p className="text-xs opacity-70">Testing translucency and depth</p>
                            </div>
                        </div>
                        <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Modern UI</span>
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-white/20 bg-white/10" />)}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900 p-8 rounded-[40px] text-white shadow-xl relative overflow-hidden group">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Generated Styles</span>
                        <button
                            onClick={() => navigator.clipboard.writeText(css)}
                            className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest hover:underline"
                        >
                            <Copy size={14} /> Copy Properties
                        </button>
                    </div>
                    <pre className="font-mono text-xs opacity-80 leading-relaxed overflow-x-auto">
                        {css}
                    </pre>
                </div>
            </div>
        </div>
    );
}
