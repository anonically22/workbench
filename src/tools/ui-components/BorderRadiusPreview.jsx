import { useState } from 'react';
import { Maximize, Copy, RefreshCw, Layout, Smartphone } from 'lucide-react';

export default function BorderRadiusPreview() {
    const [tl, setTl] = useState(24);
    const [tr, setTr] = useState(24);
    const [br, setBr] = useState(24);
    const [bl, setBl] = useState(24);
    const [all, setAll] = useState(true);

    const updateAll = (v) => {
        const val = parseInt(v) || 0;
        setTl(val); setTr(val); setBr(val); setBl(val);
    };

    const css = `border-radius: ${all ? `${tl}px` : `${tl}px ${tr}px ${br}px ${bl}px`};`;

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-sidebar p-8 rounded-[40px] border border-border space-y-8">
                    <div className="flex bg-white p-1 rounded-xl border border-border">
                        <button
                            onClick={() => setAll(true)}
                            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${all ? 'bg-primary text-white shadow-md' : 'text-text-secondary'}`}
                        >
                            Uniform
                        </button>
                        <button
                            onClick={() => setAll(false)}
                            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${!all ? 'bg-primary text-white shadow-md' : 'text-text-secondary'}`}
                        >
                            Individual
                        </button>
                    </div>

                    <div className="space-y-4">
                        {all ? (
                            <div>
                                <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-4 flex justify-between">Radius <span className="text-primary">{tl}px</span></label>
                                <input type="range" min="0" max="200" value={tl} onChange={(e) => updateAll(e.target.value)} className="w-full accent-primary" />
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { l: 'Top Left', v: tl, s: setTl },
                                    { l: 'Top Right', v: tr, s: setTr },
                                    { l: 'Bottom Right', v: br, s: setBr },
                                    { l: 'Bottom Left', v: bl, s: setBl }
                                ].map(r => (
                                    <div key={r.l} className="space-y-2">
                                        <label className="text-[8px] font-black uppercase text-text-secondary tracking-widest">{r.l}</label>
                                        <input type="number" value={r.v} onChange={(e) => r.s(parseInt(e.target.value) || 0)} className="w-full p-2 bg-background border border-border rounded-lg font-mono text-sm font-bold text-primary" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        {[0, 8, 16, 24, 32, 40].map(v => (
                            <button key={v} onClick={() => updateAll(v)} className="p-2 bg-white border border-border rounded-lg text-xs font-bold hover:border-primary transition-all">
                                {v}px
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
                <div className="bg-sidebar h-[450px] rounded-[40px] border border-border flex items-center justify-center p-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-2xl">
                        <div className="space-y-4">
                            <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest text-center">Card Component</p>
                            <div
                                className="w-full aspect-square bg-white border-2 border-primary shadow-xl transition-all duration-300"
                                style={{ borderRadius: `${tl}px ${tr}px ${br}px ${bl}px` }}
                            />
                        </div>
                        <div className="space-y-4">
                            <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest text-center">Button Style</p>
                            <div className="flex flex-col gap-4 items-center justify-center h-full">
                                <button
                                    className="px-8 py-3 bg-primary text-white font-bold shadow-lg transition-all duration-300 text-sm"
                                    style={{ borderRadius: `${tl}px ${tr}px ${br}px ${bl}px` }}
                                >
                                    Action Button
                                </button>
                                <div
                                    className="px-6 py-2 bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest"
                                    style={{ borderRadius: `${tl / 2}px ${tr / 2}px ${br / 2}px ${bl / 2}px` }}
                                >
                                    Secondary Tag
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900 p-8 rounded-[40px] text-white shadow-xl flex items-center justify-between">
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2 block">CSS Definition</span>
                        <code className="font-mono text-sm text-primary">{css}</code>
                    </div>
                    <button onClick={() => navigator.clipboard.writeText(css)} className="p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all text-primary">
                        <Copy size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
