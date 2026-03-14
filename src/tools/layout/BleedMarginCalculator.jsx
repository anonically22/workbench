import React, { useState } from 'react';
import { Ruler, File, Scissors, ShieldAlert } from 'lucide-react';

const PRESETS = [
    { label: 'A4 (210 x 297 mm)', w: 210, h: 297 },
    { label: 'A5 (148 x 210 mm)', w: 148, h: 210 },
    { label: 'US Letter (8.5 x 11 in)', w: 215.9, h: 279.4 },
    { label: 'Business Card (3.5 x 2 in)', w: 88.9, h: 50.8 },
    { label: 'Poster 18x24"', w: 457.2, h: 609.6 },
    { label: 'Custom', w: 100, h: 100 },
];

export default function BleedMarginCalculator() {
    const [preset, setPreset] = useState(PRESETS[0]);
    const [trimWidth, setTrimWidth] = useState(210);
    const [trimHeight, setTrimHeight] = useState(297);
    const [bleed, setBleed] = useState(3);
    const [margin, setMargin] = useState(5);
    const [unit, setUnit] = useState('mm');

    // Unit conversion helper
    const convert = (val, from, to) => {
        if (from === to) return val;
        // Native base is mm
        let mmVal = from === 'in' ? val * 25.4 : val;
        return to === 'in' ? Number((mmVal / 25.4).toFixed(3)) : Number(mmVal.toFixed(1));
    };

    const handlePresetChange = (p) => {
        setPreset(p);
        if (p.label !== 'Custom') {
            setTrimWidth(convert(p.w, 'mm', unit));
            setTrimHeight(convert(p.h, 'mm', unit));
        }
    };

    const handleUnitChange = (newUnit) => {
        setTrimWidth(convert(trimWidth, unit, newUnit));
        setTrimHeight(convert(trimHeight, unit, newUnit));
        setBleed(convert(bleed, unit, newUnit));
        setMargin(convert(margin, unit, newUnit));
        setUnit(newUnit);
    };

    // Calculations
    const fullWidth = Number((trimWidth + (bleed * 2)).toFixed(3));
    const fullHeight = Number((trimHeight + (bleed * 2)).toFixed(3));
    
    const safeWidth = Number((trimWidth - (margin * 2)).toFixed(3));
    const safeHeight = Number((trimHeight - (margin * 2)).toFixed(3));

    // Visulization Scale
    const maxDim = Math.max(fullWidth, fullHeight);
    const scale = 250 / maxDim; // 250px max visual size

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Controls Area */}
                <div className="bg-white border-4 border-black p-6 brutalist-shadow flex flex-col gap-6">
                    <div className="flex bg-slate-100 border-2 border-black p-1">
                        {['mm', 'in'].map(u => (
                            <button
                                key={u}
                                onClick={() => handleUnitChange(u)}
                                className={`flex-1 py-2 text-xs font-black uppercase tracking-widest transition-colors ${unit === u ? 'bg-black text-white' : 'text-slate-500 hover:text-black'}`}
                            >
                                {u === 'mm' ? 'Millimeters' : 'Inches'}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <label className="block text-xs font-black uppercase tracking-widest text-black flex items-center gap-2">
                            <File size={16} /> Print Preset
                        </label>
                        <select 
                            className="w-full border-2 border-black p-3 font-bold bg-white focus:outline-none focus:ring-4 focus:ring-accent/20 transition-all appearance-none cursor-pointer"
                            value={preset.label}
                            onChange={(e) => handlePresetChange(PRESETS.find(p => p.label === e.target.value))}
                        >
                            {PRESETS.map(p => (
                                <option key={p.label} value={p.label}>{p.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">Trim Width ({unit})</label>
                            <input 
                                type="number" 
                                value={trimWidth} 
                                onChange={e => {
                                    setTrimWidth(Number(e.target.value));
                                    setPreset(PRESETS.find(p => p.label === 'Custom'));
                                }} 
                                className="w-full border-2 border-black p-3 font-bold bg-slate-50 focus:outline-none focus:ring-2 focus:ring-accent"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">Trim Height ({unit})</label>
                            <input 
                                type="number" 
                                value={trimHeight} 
                                onChange={e => {
                                    setTrimHeight(Number(e.target.value));
                                    setPreset(PRESETS.find(p => p.label === 'Custom'));
                                }} 
                                className="w-full border-2 border-black p-3 font-bold bg-slate-50 focus:outline-none focus:ring-2 focus:ring-accent"
                            />
                        </div>
                    </div>

                    <hr className="border-black border-dashed" />

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-xs font-black uppercase tracking-widest text-red-600 flex justify-between">
                                <span className="flex items-center gap-2"><Scissors size={14}/> Bleed</span> 
                                <span>{bleed}{unit}</span>
                            </label>
                            <input 
                                type="range" min="0" max={unit === 'mm' ? 10 : 0.5} step={unit === 'mm' ? 1 : 0.05}
                                value={bleed} onChange={e => setBleed(Number(e.target.value))}
                                className="w-full accent-red-600 h-2 bg-red-100 rounded-none cursor-pointer"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-xs font-black uppercase tracking-widest text-blue-600 flex justify-between">
                                <span className="flex items-center gap-2"><ShieldAlert size={14}/> Safe Margin</span> 
                                <span>{margin}{unit}</span>
                            </label>
                            <input 
                                type="range" min="0" max={unit === 'mm' ? 25 : 1} step={unit === 'mm' ? 1 : 0.05}
                                value={margin} onChange={e => setMargin(Number(e.target.value))}
                                className="w-full accent-blue-600 h-2 bg-blue-100 rounded-none cursor-pointer"
                            />
                        </div>
                    </div>
                </div>

                {/* Output Area */}
                <div className="space-y-6 flex flex-col">
                    <div className="bg-slate-50 border-4 border-black p-8 brutalist-shadow-sm flex-1 flex flex-col items-center justify-center relative min-h-[350px]">
                        
                        {/* Visualizer */}
                        <div className="relative flex items-center justify-center bg-white shadow-xl"
                             style={{ 
                                 width: fullWidth * scale, 
                                 height: fullHeight * scale,
                                 border: '2px dashed #ef4444' // Bleed edge
                             }}>
                             
                             {/* Trim Edge */}
                             <div className="absolute border border-black"
                                  style={{
                                      width: trimWidth * scale,
                                      height: trimHeight * scale
                                  }}>
                             </div>

                             {/* Safe Area Edge */}
                             <div className="absolute border grid place-items-center border-blue-400 bg-blue-50/50"
                                  style={{
                                      width: safeWidth * scale > 0 ? safeWidth * scale : 0,
                                      height: safeHeight * scale > 0 ? safeHeight * scale : 0
                                  }}>
                                  <span className="text-[8px] font-black uppercase text-blue-500 opacity-50 tracking-widest text-center">Safe Area</span>
                             </div>

                             <div className="absolute -top-6 text-[10px] font-bold text-red-500 uppercase tracking-widest">Bleed Edge</div>
                             <div className="absolute -right-20 top-1/2 -translate-y-1/2 text-[10px] font-bold text-black uppercase tracking-widest rotate-90 origin-left">Trim Edge</div>
                        </div>

                    </div>

                    {/* Results Table */}
                    <div className="bg-white border-2 border-black divide-y-2 divide-black">
                        <div className="grid grid-cols-3 p-4 bg-red-50 text-red-900 border-l-8 border-l-red-500">
                            <div className="font-black uppercase tracking-widest text-xs">Total File Size (Canvas)</div>
                            <div className="col-span-2 text-right font-mono font-bold text-lg">{fullWidth} × {fullHeight} <span className="text-xs">{unit}</span></div>
                        </div>
                        <div className="grid grid-cols-3 p-4 bg-slate-50 text-black border-l-8 border-l-black">
                            <div className="font-black uppercase tracking-widest text-xs">Trim Size (Final Cut)</div>
                            <div className="col-span-2 text-right font-mono font-bold text-lg">{trimWidth} × {trimHeight} <span className="text-xs">{unit}</span></div>
                        </div>
                        <div className="grid grid-cols-3 p-4 bg-blue-50 text-blue-900 border-l-8 border-l-blue-500">
                            <div className="font-black uppercase tracking-widest text-xs">Safe Area (Content)</div>
                            <div className="col-span-2 text-right font-mono font-bold text-lg">{safeWidth > 0 ? safeWidth : 0} × {safeHeight > 0 ? safeHeight : 0} <span className="text-xs">{unit}</span></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
