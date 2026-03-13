import React, { useState } from 'react';
import { Settings, Copy, Check, Calculator } from 'lucide-react';

export default function ExportMultiplierCalculator() {
    const [baseSize, setBaseSize] = useState(100);
    const [baseUnit, setBaseUnit] = useState('1x');
    const [copied, setCopied] = useState('');

    const multipliers = [
        { label: 'Standard Web', factor: 1, suffix: '1x / mdpi' },
        { label: 'Retina / iOS', factor: 2, suffix: '2x / xhdpi' },
        { label: 'Super Retina', factor: 3, suffix: '3x / xxhdpi' },
        { label: 'Ultra High Res', factor: 4, suffix: '4x / xxxhdpi' },
    ];

    const handleCopy = (val) => {
        navigator.clipboard.writeText(val.toString());
        setCopied(val);
        setTimeout(() => setCopied(''), 2000);
    };

    // Calculate the 1x base value first
    const baseMultiplier = multipliers.find(m => m.factor.toString() + 'x' === baseUnit)?.factor || 1;
    const sizeAt1x = baseSize / baseMultiplier;

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Input Header */}
            <div className="bg-white border-4 border-black p-8 brutalist-shadow text-center space-y-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent text-white border-2 border-black rounded-full mb-2">
                    <Calculator size={32} />
                </div>
                <h3 className="font-black uppercase tracking-[0.2em] text-xl">Asset Base Dimension</h3>
                
                <div className="flex justify-center items-center gap-4 max-w-sm mx-auto">
                    <input 
                        type="number" 
                        value={baseSize} 
                        onChange={e => setBaseSize(Number(e.target.value) || 0)} 
                        className="w-1/2 border-4 border-black p-4 font-mono font-black text-3xl text-center bg-slate-50 focus:outline-none focus:bg-accent/10 transition-colors"
                        min="1"
                    />
                    <span className="font-black text-2xl uppercase opacity-50">px</span>
                    <select 
                        value={baseUnit} 
                        onChange={e => setBaseUnit(e.target.value)}
                        className="w-1/3 border-4 border-black p-4 font-black text-xl bg-white focus:outline-none cursor-pointer appearance-none text-center"
                    >
                        <option value="1x">@1x</option>
                        <option value="2x">@2x</option>
                        <option value="3x">@3x</option>
                        <option value="4x">@4x</option>
                    </select>
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Input your design dimension (e.g. width or height in pixels) and its scale.
                </p>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {multipliers.map(mult => {
                    const result = Math.round(sizeAt1x * mult.factor);
                    const isBase = (mult.factor.toString() + 'x') === baseUnit;
                    
                    return (
                        <div 
                            key={mult.factor} 
                            className={`border-4 p-6 relative group transition-all ${isBase ? 'bg-accent/10 border-accent' : 'bg-white border-black hover:bg-slate-50 brutalist-shadow-hover'}`}
                        >
                            {isBase && (
                                <div className="absolute top-0 right-0 bg-accent text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest border-b-2 border-l-2 border-accent">
                                    Base Size
                                </div>
                            )}
                            
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h4 className="font-black uppercase tracking-widest text-sm text-slate-500">{mult.label}</h4>
                                    <span className="inline-block mt-1 px-2 py-0.5 bg-black text-white text-[10px] font-black uppercase tracking-widest">
                                        @{mult.suffix}
                                    </span>
                                </div>
                                <span className={`text-4xl font-black ${isBase ? 'text-accent' : 'text-slate-200'} transition-colors group-hover:text-black`}>
                                    {mult.factor}x
                                </span>
                            </div>
                            
                            <div className="flex justify-between items-end border-t-2 border-black/10 pt-4">
                                <div className="font-mono font-black text-5xl">
                                    {result}
                                </div>
                                <button
                                    onClick={() => handleCopy(result)}
                                    className="w-12 h-12 border-2 border-black bg-white flex items-center justify-center hover:bg-accent hover:text-white transition-colors brutalist-shadow-sm active:translate-y-1 active:shadow-none"
                                    title="Copy Value"
                                >
                                    {copied === result ? <Check size={20} /> : <Copy size={20} />}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            <div className="bg-slate-100 border-2 border-black p-6 text-center brutalist-shadow mt-12">
                <p className="text-sm font-bold leading-relaxed text-slate-600 max-w-2xl mx-auto">
                    <strong>Rule of thumb:</strong> Design at 1x (mdpi) whenever possible. This prevents fractional pixel errors when scaling up. If you must design at 2x, ensure all dimensions are even numbers.
                </p>
            </div>
        </div>
    );
}
