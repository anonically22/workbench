import { useState, useMemo } from 'react';

const PHI = 1.61803398875;

export default function GoldenRatioCalculator() {
    const [baseValue, setBaseValue] = useState(100);

    const scale = useMemo(() => {
        const val = Math.max(1, baseValue);
        return [
            { label: 'Base ÷ Φ³', value: Math.round(val / Math.pow(PHI, 3)), exact: (val / Math.pow(PHI, 3)).toFixed(2) },
            { label: 'Base ÷ Φ²', value: Math.round(val / Math.pow(PHI, 2)), exact: (val / Math.pow(PHI, 2)).toFixed(2) },
            { label: 'Base ÷ Φ', value: Math.round(val / PHI), exact: (val / PHI).toFixed(2) },
            { label: 'Base Value', value: val, exact: val, isBase: true },
            { label: 'Base × Φ', value: Math.round(val * PHI), exact: (val * PHI).toFixed(2) },
            { label: 'Base × Φ²', value: Math.round(val * Math.pow(PHI, 2)), exact: (val * Math.pow(PHI, 2)).toFixed(2) },
            { label: 'Base × Φ³', value: Math.round(val * Math.pow(PHI, 3)), exact: (val * Math.pow(PHI, 3)).toFixed(2) },
        ];
    }, [baseValue]);

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-6">
                <div className="bg-slate-50 border-2 border-black p-6 space-y-6">
                    <h3 className="text-sm font-bold tracking-[0.2em] uppercase border-b-2 border-black pb-2 mb-4">Calculator</h3>
                    
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest mb-2">Base Value (px, pt, rem)</label>
                        <input 
                            type="number" 
                            min="1" 
                            value={baseValue} 
                            onChange={e => setBaseValue(Number(e.target.value))} 
                            className="w-full border-2 border-black p-4 text-2xl font-black font-mono focus:outline-none focus:ring-4 focus:ring-accent/20 transition-all" 
                        />
                    </div>
                    
                    <div className="text-sm text-slate-500 font-medium">
                        <p>The Golden Ratio (Φ) is approximately <strong>1.618</strong>. It is commonly used in art, architecture, and design to create aesthetically pleasing and natural proportions.</p>
                    </div>
                </div>

                <div className="bg-white border-2 border-black p-0 overflow-hidden">
                    <div className="bg-black text-white p-4 font-bold text-sm tracking-[0.2em] uppercase">Proportional Scale</div>
                    <div className="divide-y-2 divide-slate-100">
                        {scale.map((item, i) => (
                            <div key={i} className={`p-4 flex items-center justify-between transition-colors hover:bg-slate-50 ${item.isBase ? 'bg-accent/10 hover:bg-accent/20' : ''}`}>
                                <div className="flex flex-col">
                                    <span className={`font-bold ${item.isBase ? 'text-accent' : 'text-slate-500'} text-xs uppercase tracking-widest`}>{item.label}</span>
                                    <span className="text-[10px] text-slate-400 font-mono mt-1">Exact: {item.exact}</span>
                                </div>
                                <div className={`font-black text-2xl font-mono ${item.isBase ? 'text-accent' : 'text-black'}`}>
                                    {item.value}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-[450px] flex flex-col gap-6">
                <div className="border-4 border-slate-200 bg-white min-h-[500px] p-6 relative flex flex-col items-center justify-center overflow-hidden">
                    <div className="absolute top-2 left-2 text-[10px] uppercase font-bold tracking-widest opacity-50 z-10">Visualizer Diagram</div>
                    
                    <div className="w-[300px] aspect-[1.618/1] bg-slate-100 border-2 border-black relative brutalist-shadow">
                        {/* Main Left Square */}
                        <div className="absolute top-0 left-0 h-full aspect-square border-r-2 border-black bg-white flex items-center justify-center p-4">
                            <div className="text-center">
                                <span className="font-mono text-xs font-bold text-slate-400 block mb-1">Base × Φ</span>
                                <span className="font-mono text-xl font-black">{scale[4].value}</span>
                            </div>
                        </div>
                        
                        {/* Right Area */}
                        <div className="absolute top-0 right-0 h-full w-[calc(100%-100%/1.618)] flex flex-col">
                            {/* Top Square of Right Area */}
                            <div className="w-full aspect-square border-b-2 border-black bg-accent/10 flex items-center justify-center p-2">
                                <div className="text-center">
                                    <span className="font-mono text-[8px] font-bold text-accent block mb-1">Base</span>
                                    <span className="font-mono text-sm font-black text-accent">{scale[3].value}</span>
                                </div>
                            </div>
                            
                            {/* Bottom Rectangle of Right Area */}
                            <div className="w-full flex-1 flex">
                                {/* Right Square of Bottom Area */}
                                <div className="h-full aspect-square bg-white border-l-2 border-black absolute right-0 bottom-0 flex items-center justify-center">
                                    <span className="font-mono text-[8px] font-black text-slate-400">{scale[2].value}</span>
                                </div>
                                {/* Left Rectangle of Bottom Area */}
                                <div className="h-full flex-1 bg-slate-200 absolute left-0 bottom-0 w-[calc(100%-100%/1.618)] flex items-center justify-center">
                                   <span className="font-mono text-[6px] font-black opacity-50">{scale[1].value}</span>
                                </div>
                            </div>
                        </div>

                        {/* Golden Spiral Approximation SVG */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40 mix-blend-multiply" viewBox="0 0 1618 1000" preserveAspectRatio="none">
                            <path d="M 0 1000 A 1000 1000 0 0 1 1000 0 A 618 618 0 0 1 1618 618 A 382 382 0 0 1 1236 1000 A 236 236 0 0 1 1000 764" fill="none" stroke="red" strokeWidth="6" />
                        </svg>
                    </div>

                    <p className="mt-12 text-center text-xs font-bold leading-relaxed text-slate-500 uppercase tracking-widest max-w-[250px]">
                        The larger section is always 1.618 times the size of the smaller section.
                    </p>
                </div>
            </div>
        </div>
    );
}
