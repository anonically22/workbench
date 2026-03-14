import React, { useState, useEffect } from 'react';
import { Copy, Check, Scaling, Code2 } from 'lucide-react';

export default function CssClampGenerator() {
    const [minViewport, setMinViewport] = useState(320);
    const [maxViewport, setMaxViewport] = useState(1280);
    const [minSize, setMinSize] = useState(16);
    const [maxSize, setMaxSize] = useState(48);
    const [pixelsPerRem, setPixelsPerRem] = useState(16);

    const [clampString, setClampString] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        // Formula to calculate CSS clamp linear interpolation
        const minWidth = minViewport / pixelsPerRem;
        const maxWidth = maxViewport / pixelsPerRem;
        const minRem = minSize / pixelsPerRem;
        const maxRem = maxSize / pixelsPerRem;

        const slope = (maxRem - minRem) / (maxWidth - minWidth);
        const yAxisIntersection = -minWidth * slope + minRem;

        const preferredValue = `${yAxisIntersection.toFixed(3)}rem + ${(slope * 100).toFixed(3)}vw`;

        // Clamp doesn't care if min > max or vice versa, but it's cleaner to sort
        const val1 = minRem.toFixed(3);
        const val2 = maxRem.toFixed(3);
        
        const minOut = Math.min(val1, val2);
        const maxOut = Math.max(val1, val2);

        setClampString(`clamp(${minOut}rem, ${preferredValue}, ${maxOut}rem)`);
    }, [minViewport, maxViewport, minSize, maxSize, pixelsPerRem]);

    const handleCopy = () => {
        navigator.clipboard.writeText(clampString);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Input Header */}
            <div className="bg-white border-4 border-black p-8 brutalist-shadow text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent text-white border-2 border-black rounded-full mb-2">
                    <Scaling size={32} />
                </div>
                <h3 className="font-black uppercase tracking-[0.2em] text-xl">Fluid Typography & Spacing</h3>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 max-w-xl mx-auto">
                    Generate a CSS clamp() value that scales linearly between a minimum and maximum viewport width.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Controls */}
                <div className="bg-white border-4 border-black p-6 brutalist-shadow space-y-8">
                    <div className="space-y-4">
                        <h4 className="font-black uppercase text-sm tracking-widest border-b-2 border-black pb-2">Viewport Widths</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">Min Viewport (px)</label>
                                <input 
                                    type="number" value={minViewport} onChange={e => setMinViewport(Number(e.target.value))}
                                    className="w-full border-2 border-black p-3 font-bold bg-slate-50 focus:outline-none focus:ring-2 focus:ring-accent"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">Max Viewport (px)</label>
                                <input 
                                    type="number" value={maxViewport} onChange={e => setMaxViewport(Number(e.target.value))}
                                    className="w-full border-2 border-black p-3 font-bold bg-slate-50 focus:outline-none focus:ring-2 focus:ring-accent"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-black uppercase text-sm tracking-widest border-b-2 border-black pb-2">Target Sizes</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block text-[10px] font-black uppercase tracking-widest text-accent">Min Size @ Min Viewport (px)</label>
                                <input 
                                    type="number" value={minSize} onChange={e => setMinSize(Number(e.target.value))}
                                    className="w-full border-2 border-accent p-3 font-bold bg-accent/5 focus:outline-none focus:ring-2 focus:ring-accent text-accent"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-[10px] font-black uppercase tracking-widest text-accent">Max Size @ Max Viewport (px)</label>
                                <input 
                                    type="number" value={maxSize} onChange={e => setMaxSize(Number(e.target.value))}
                                    className="w-full border-2 border-accent p-3 font-bold bg-accent/5 focus:outline-none focus:ring-2 focus:ring-accent text-accent"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                         <h4 className="font-black uppercase text-sm tracking-widest border-b-2 border-black pb-2 opacity-50">Advanced</h4>
                         <div className="space-y-2">
                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 flex justify-between">
                                Base Root Font Size <span>{pixelsPerRem}px = 1rem</span>
                            </label>
                            <input 
                                type="range" min="10" max="24" step="1"
                                value={pixelsPerRem} onChange={e => setPixelsPerRem(Number(e.target.value))}
                                className="w-full accent-black h-2 bg-slate-200"
                            />
                        </div>
                    </div>
                </div>

                {/* Output & Preview */}
                <div className="space-y-6 flex flex-col">
                    <div className="bg-slate-900 border-4 border-black p-6 text-white space-y-6 brutalist-shadow flex-1">
                        <h4 className="font-black uppercase text-sm tracking-widest flex items-center gap-2 opacity-50">
                            <Code2 size={16} /> Generated CSS
                        </h4>
                        
                        <div className="bg-black/50 p-6 border-2 border-white/20 font-mono text-lg font-bold break-all leading-relaxed shadow-inner">
                            {clampString}
                        </div>

                        <button
                            onClick={handleCopy}
                            className="w-full h-14 bg-accent text-white font-black uppercase tracking-widest border-2 border-black flex items-center justify-center gap-2 hover:-translate-y-1 hover:-translate-x-1 active:translate-y-0 active:translate-x-0 transition-all brutalist-shadow"
                        >
                            {copied ? 'COPIED TO CLIPBOARD!' : 'COPY CLAMP()'}
                            {copied ? <Check size={20} /> : <Copy size={20} />}
                        </button>
                    </div>

                    {/* Miniature interactive scale preview */}
                    <div className="bg-white border-4 border-black p-6 brutalist-shadow">
                        <h4 className="font-black uppercase text-xs tracking-widest mb-4 opacity-50">Abstract Scale Preview</h4>
                        <div className="h-24 relative flex items-center justify-between border-b-2 border-black pb-8 px-4">
                            <div className="bg-accent/20 border-2 border-accent rounded-full flex items-center justify-center text-[10px] font-black" style={{ width: minSize, height: minSize }}>
                                MIN
                            </div>
                            <div className="bg-accent/50 border-2 border-accent rounded-full flex items-center justify-center text-[10px] font-black text-white" style={{ width: maxSize, height: maxSize }}>
                                MAX
                            </div>
                            {/* Connective slope line */}
                            <div className="absolute top-1/2 left-4 right-4 h-0.5 border-t-2 border-dashed border-accent -z-10 translate-y-[-20%]"></div>
                        </div>
                        <div className="flex justify-between mt-2 text-[10px] font-mono font-bold">
                            <span>{minViewport}px</span>
                            <span>{maxViewport}px</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
