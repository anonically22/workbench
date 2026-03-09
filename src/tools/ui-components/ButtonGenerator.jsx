import { useState } from 'react';
import { Type, Copy, RefreshCw, MousePointer2, Info } from 'lucide-react';

export default function ButtonGenerator() {
    const [bg, setBg] = useState('#6366F1');
    const [text, setText] = useState('#ffffff');
    const [paddingX, setPaddingX] = useState(24);
    const [paddingY, setPaddingY] = useState(12);
    const [radius, setRadius] = useState(12);
    const [shadow, setShadow] = useState(true);

    const css = `
.btn-custom {
    background-color: ${bg};
    color: ${text};
    padding: ${paddingY}px ${paddingX}px;
    border-radius: ${radius}px;
    font-weight: 700;
    transition: all 0.2s ease;
    border: none;
    cursor: pointer;
    ${shadow ? 'box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);' : ''}
}
.btn-custom:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
    ${shadow ? 'box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);' : ''}
}
.btn-custom:active {
    transform: translateY(0);
}
`.trim();

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-sidebar p-8 rounded-[40px] border border-border space-y-6">
                    <div>
                        <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-4">Colours</label>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer" />
                                <span className="text-xs font-bold text-text-primary">Background</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <input type="color" value={text} onChange={(e) => setText(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer" />
                                <span className="text-xs font-bold text-text-primary">Text Color</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-border">
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-4 flex justify-between">Horiz. Padding <span className="text-primary">{paddingX}px</span></label>
                            <input type="range" min="8" max="64" value={paddingX} onChange={(e) => setPaddingX(parseInt(e.target.value))} className="w-full accent-primary" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-4 flex justify-between">Vert. Padding <span className="text-primary">{paddingY}px</span></label>
                            <input type="range" min="4" max="32" value={paddingY} onChange={(e) => setPaddingY(parseInt(e.target.value))} className="w-full accent-primary" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-4 flex justify-between">Radius <span className="text-primary">{radius}px</span></label>
                            <input type="range" min="0" max="40" value={radius} onChange={(e) => setRadius(parseInt(e.target.value))} className="w-full accent-primary" />
                        </div>
                    </div>

                    <button
                        onClick={() => setShadow(!shadow)}
                        className={`w-full py-3 rounded-xl border-2 font-bold text-xs transition-all ${shadow ? 'bg-primary/5 border-primary/20 text-primary' : 'bg-sidebar border-border text-text-secondary'}`}
                    >
                        {shadow ? 'Unset Shadow' : 'Set Shadow'}
                    </button>
                </div>
            </div>

            <div className="lg:col-span-3 space-y-8">
                <div className="bg-sidebar h-[450px] rounded-[40px] border border-border flex flex-col items-center justify-center p-12 gap-12">
                    <div className="text-center space-y-2 opacity-30">
                        <MousePointer2 size={32} className="mx-auto" />
                        <p className="text-[10px] font-black uppercase tracking-widest">Interaction Preview</p>
                    </div>

                    <button
                        className="transition-all duration-200 active:scale-95 group relative"
                        style={{
                            backgroundColor: bg,
                            color: text,
                            padding: `${paddingY}px ${paddingX}px`,
                            borderRadius: `${radius}px`,
                            fontWeight: 700,
                            boxShadow: shadow ? '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' : 'none'
                        }}
                    >
                        <span className="relative z-10">Click Preview</span>
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderRadius: `${radius}px` }} />
                    </button>

                    <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary" />
                            <span className="text-[10px] font-bold text-text-secondary uppercase">Hover state active</span>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900 p-8 rounded-[40px] text-white shadow-xl relative group">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">CSS Stylesheet</span>
                        <button
                            onClick={() => navigator.clipboard.writeText(css)}
                            className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest hover:underline"
                        >
                            <Copy size={14} /> Copy Classes
                        </button>
                    </div>
                    <pre className="font-mono text-[11px] opacity-80 leading-relaxed overflow-x-auto">
                        {css}
                    </pre>
                </div>
            </div>
        </div>
    );
}
