import { useState } from 'react';
import { Type, Copy, RefreshCw, Layout, Search, Info } from 'lucide-react';

export default function InputStylist() {
    const [bg, setBg] = useState('#F8FAFC');
    const [border, setBorder] = useState('#E2E8F0');
    const [active, setActive] = useState('#6366F1');
    const [radius, setRadius] = useState(12);

    const css = `
.input-custom {
    background-color: ${bg};
    border: 2px solid ${border};
    border-radius: ${radius}px;
    padding: 12px 16px;
    font-size: 14px;
    transition: all 0.2s ease;
    outline: none;
    width: 100%;
}
.input-custom:focus {
    border-color: ${active};
    background-color: #ffffff;
    box-shadow: 0 0 0 4px ${active}20;
}
`.trim();

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-sidebar p-8 rounded-[40px] border border-border space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-2">Base Background</label>
                            <div className="flex items-center gap-3">
                                <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer" />
                                <span className="font-mono text-[10px] text-text-secondary uppercase">{bg}</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-2">Border Color</label>
                            <div className="flex items-center gap-3">
                                <input type="color" value={border} onChange={(e) => setBorder(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer" />
                                <span className="font-mono text-[10px] text-text-secondary uppercase">{border}</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-2">Active/Focus</label>
                            <div className="flex items-center gap-3">
                                <input type="color" value={active} onChange={(e) => setActive(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer" />
                                <span className="font-mono text-[10px] text-text-secondary uppercase">{active}</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-4 flex justify-between">Radius <span className="text-primary">{radius}px</span></label>
                            <input type="range" min="0" max="32" value={radius} onChange={(e) => setRadius(parseInt(e.target.value))} className="w-full accent-primary" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-3 space-y-8">
                <div className="bg-sidebar h-[450px] rounded-[40px] border border-border flex flex-col items-center justify-center p-12 gap-8">
                    <div className="w-full max-w-sm space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-text-secondary tracking-widest px-1">Email Address</label>
                            <input
                                type="email"
                                placeholder="hello@nixby.design"
                                className="transition-all duration-200"
                                style={{
                                    backgroundColor: bg,
                                    border: `2px solid ${border}`,
                                    borderRadius: `${radius}px`,
                                    padding: '12px 16px',
                                    width: '100%',
                                    outline: 'none'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = active;
                                    e.target.style.backgroundColor = '#ffffff';
                                    e.target.style.boxShadow = `0 0 0 4px ${active}20`;
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = border;
                                    e.target.style.backgroundColor = bg;
                                    e.target.style.boxShadow = 'none';
                                }}
                            />
                        </div>

                        <div className="space-y-4 pt-8 border-t border-border border-dashed">
                            <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest text-center">Form context</p>
                            <div className="flex gap-2">
                                <div className="flex-1 h-3 bg-slate-200 rounded-full" />
                                <div className="w-12 h-3 bg-slate-200 rounded-full" />
                            </div>
                            <div className="h-3 bg-slate-100 rounded-full w-full" />
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900 p-8 rounded-[40px] text-white shadow-xl relative group">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Component Blueprint</span>
                        <button
                            onClick={() => navigator.clipboard.writeText(css)}
                            className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest hover:underline"
                        >
                            <Copy size={14} /> Copy CSS
                        </button>
                    </div>
                    <pre className="font-mono text-[11px] opacity-80 overflow-x-auto">
                        {css}
                    </pre>
                </div>
            </div>
        </div>
    );
}
