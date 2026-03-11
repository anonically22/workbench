import { useState, useMemo } from 'react';
import { Copy, RefreshCw } from 'lucide-react';
import chroma from 'chroma-js';

export default function ShadowPaletteGenerator() {
    const [shadowColor, setShadowColor] = useState('#000000');
    const [opacityScale, setOpacityScale] = useState(0.5); 
    const [xScale, setXScale] = useState(0);
    const [yScale, setYScale] = useState(4);
    const [blurScale, setBlurScale] = useState(8);
    const [spreadScale, setSpreadScale] = useState(-2);
    
    const [copiedIndex, setCopiedIndex] = useState(null);

    const shadows = useMemo(() => {
        const generateShadowLevel = (level) => {
            const factor = level;
            const o = Math.max(0.01, Math.min(1, opacityScale - (level * 0.05)));
            const color = chroma(shadowColor).alpha(o).css();
            
            const x = Math.round(xScale * factor);
            const y = Math.round(yScale * factor);
            const b = Math.round(blurScale * Math.pow(1.5, factor - 1));
            const s = Math.round(spreadScale * factor);
            
            const ambientO = Math.max(0.01, o * 0.5);
            const ambientColor = chroma(shadowColor).alpha(ambientO).css();
            const aY = Math.round(y * 0.5);
            const aB = Math.round(b * 0.5);
            
            return `${x}px ${y}px ${b}px ${s}px ${color}, 0px ${aY}px ${aB}px 0px ${ambientColor}`;
        };

        return [1, 2, 3, 4, 5].map(level => {
            const shadow = generateShadowLevel(level);
            return {
                label: `Level ${level}`,
                name: `shadow-level-${level}`,
                value: shadow
            };
        });
    }, [shadowColor, opacityScale, xScale, yScale, blurScale, spreadScale]);

    const handleCopy = (text, index) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const handleCopyAll = () => {
        const cssVars = shadows.map(s => `  --${s.name}: ${s.value};`).join('\n');
        const cssClass = `:root {\n${cssVars}\n}`;
        navigator.clipboard.writeText(cssClass);
        setCopiedIndex('all');
        setTimeout(() => setCopiedIndex(null), 2000);
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 p-8 bg-slate-50 border-2 border-black items-center justify-items-center mb-4 overflow-hidden">
                {shadows.map((shadow, index) => (
                    <div key={index} className="flex flex-col items-center gap-4 w-full">
                        <div 
                            className="w-24 h-24 bg-white border border-slate-200 transition-shadow duration-300 flex items-center justify-center text-xs font-black text-slate-300"
                            style={{ boxShadow: shadow.value }}
                        >
                            L{index + 1}
                        </div>
                        <div className="flex flex-col items-center w-full mt-4">
                            <span className="font-bold text-xs uppercase tracking-widest mb-2">{shadow.label}</span>
                            <button 
                                onClick={() => handleCopy(shadow.value, index)}
                                className="w-full text-[10px] font-mono bg-white border-2 border-black p-1 hover:bg-black hover:text-white transition-colors truncate px-2"
                                title={shadow.value}
                            >
                                {copiedIndex === index ? 'COPIED!' : 'COPY CSS'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1 bg-white border-2 border-black p-6 space-y-6">
                    <h3 className="text-sm font-bold tracking-[0.2em] uppercase border-b-2 border-black pb-2 mb-4">Shadow Settings (Base Level 1)</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2">Base Color</label>
                            <input type="color" value={shadowColor} onChange={e => setShadowColor(e.target.value)} className="w-full h-10 border-2 border-black cursor-pointer" />
                        </div>
                        
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2">Base Opacity ({opacityScale.toFixed(2)})</label>
                            <input type="range" min="0" max="1" step="0.05" value={opacityScale} onChange={e => setOpacityScale(Number(e.target.value))} className="w-full accent-black mt-2" />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2">X Scale ({xScale})</label>
                            <input type="range" min="-10" max="10" step="1" value={xScale} onChange={e => setXScale(Number(e.target.value))} className="w-full accent-black mt-2" />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2">Y Scale ({yScale})</label>
                            <input type="range" min="-10" max="20" step="1" value={yScale} onChange={e => setYScale(Number(e.target.value))} className="w-full accent-black mt-2" />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2">Blur Scale ({blurScale})</label>
                            <input type="range" min="0" max="20" step="1" value={blurScale} onChange={e => setBlurScale(Number(e.target.value))} className="w-full accent-black mt-2" />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2">Spread Scale ({spreadScale})</label>
                            <input type="range" min="-10" max="10" step="1" value={spreadScale} onChange={e => setSpreadScale(Number(e.target.value))} className="w-full accent-black mt-2" />
                        </div>
                    </div>
                </div>

                <div className="flex-1 border-2 border-black bg-white flex flex-col relative group">
                    <div className="bg-black text-white p-2 flex justify-between items-center text-xs font-bold tracking-[0.2em] uppercase">
                        <span>CSS Variables Output</span>
                        <button 
                            onClick={handleCopyAll}
                            className="flex items-center gap-1 hover:text-accent transition-colors"
                        >
                            {copiedIndex === 'all' ? <RefreshCw size={14} className="animate-spin" /> : <Copy size={14} />}
                            {copiedIndex === 'all' ? 'COPIED!' : 'COPY ALL'}
                        </button>
                    </div>
                    <div className="p-4 bg-slate-900 text-slate-300 font-mono text-sm overflow-x-auto whitespace-pre-wrap flex-grow">
{`:root {
${shadows.map(s => `  --${s.name}:\n    ${s.value.split(', ').join(',\n    ')};`).join('\n\n')}
}`}
                    </div>
                </div>
            </div>
        </div>
    );
}
