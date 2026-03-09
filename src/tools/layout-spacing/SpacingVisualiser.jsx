import { useState } from 'react';
import { Box, Layout, ArrowRight, Copy, Info } from 'lucide-react';

export default function SpacingVisualiser() {
    const [padding, setPadding] = useState(24);
    const [margin, setMargin] = useState(16);
    const [border, setBorder] = useState(2);

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-sidebar p-8 rounded-[40px] border border-border space-y-8">
                    <div className="text-center space-y-2">
                        <Box className="text-primary mx-auto" size={32} />
                        <h3 className="text-xl font-bold text-text-primary">Box Model Visualiser</h3>
                        <p className="text-xs text-text-secondary">Understand spatial relationships.</p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-4 flex justify-between">
                                Padding
                                <span className="text-primary">{padding}px</span>
                            </label>
                            <input type="range" min="0" max="100" value={padding} onChange={(e) => setPadding(parseInt(e.target.value))} className="w-full accent-primary" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-4 flex justify-between">
                                Margin (Visual)
                                <span className="text-primary">{margin}px</span>
                            </label>
                            <input type="range" min="0" max="100" value={margin} onChange={(e) => setMargin(parseInt(e.target.value))} className="w-full accent-primary" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-4 flex justify-between">
                                Border Width
                                <span className="text-primary">{border}px</span>
                            </label>
                            <input type="range" min="0" max="20" value={border} onChange={(e) => setBorder(parseInt(e.target.value))} className="w-full accent-primary" />
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-surface border border-border rounded-3xl flex items-center gap-4">
                    <Info size={20} className="text-primary shrink-0" />
                    <p className="text-[11px] text-text-secondary leading-relaxed">
                        Padding creates space <strong>inside</strong> the element, while Margin creates space <strong>around</strong> it. This tool helps you feel the rhythm of your spacing system.
                    </p>
                </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
                <div className="bg-sidebar rounded-[40px] border border-border p-12 flex items-center justify-center min-h-[400px] overflow-hidden">
                    <div
                        className="transition-all duration-300 bg-orange-100 flex items-center justify-center relative"
                        style={{ padding: `${margin}px` }}
                    >
                        <span className="absolute top-1 left-2 text-[8px] font-black text-orange-400 uppercase">Margin</span>
                        <div
                            className="bg-white transition-all duration-300 shadow-soft relative flex items-center justify-center border-primary overflow-hidden"
                            style={{
                                padding: `${padding}px`,
                                borderWidth: `${border}px`,
                                borderColor: '#6366F1'
                            }}
                        >
                            <div className="absolute inset-0 bg-green-50/50" />
                            <span className="absolute top-1 left-2 text-[8px] font-black text-green-400 uppercase z-10">Padding</span>

                            <div className="w-32 h-32 bg-primary rounded shadow-xl flex items-center justify-center text-white relative z-20">
                                <Layout size={24} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-5 rounded-2xl border border-border flex items-center justify-between group hover:border-primary transition-all">
                        <div>
                            <p className="text-[10px] font-black text-text-secondary uppercase mb-1">Tailwind Equivalent</p>
                            <p className="font-mono text-xs font-bold text-primary">p-{Math.round(padding / 4)} m-{Math.round(margin / 4)}</p>
                        </div>
                        <button onClick={() => navigator.clipboard.writeText(`p-${Math.round(padding / 4)} m-${Math.round(margin / 4)}`)} className="p-2 opacity-0 group-hover:opacity-100 transition-all text-text-secondary hover:text-primary"><Copy size={14} /></button>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-border flex items-center justify-between group hover:border-primary transition-all">
                        <div>
                            <p className="text-[10px] font-black text-text-secondary uppercase mb-1">CSS Shorthand</p>
                            <p className="font-mono text-xs font-bold text-primary">padding: {padding}px; margin: {margin}px;</p>
                        </div>
                        <button onClick={() => navigator.clipboard.writeText(`padding: ${padding}px; margin: ${margin}px;`)} className="p-2 opacity-0 group-hover:opacity-100 transition-all text-text-secondary hover:text-primary"><Copy size={14} /></button>
                    </div>
                </div>
            </div>
        </div>
    );
}
