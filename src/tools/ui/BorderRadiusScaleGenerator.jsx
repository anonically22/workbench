import { useState, useMemo } from 'react';
import { Copy, RefreshCw } from 'lucide-react';

export default function BorderRadiusScaleGenerator() {
    const [baseRadius, setBaseRadius] = useState(4);
    const [scaleFactor, setScaleFactor] = useState(1.5);
    const [copiedIndex, setCopiedIndex] = useState(null);

    const sizes = useMemo(() => {
        // Generate sm, md (base), lg, xl, 2xl, 3xl, full
        return [
            { name: 'sm', value: Math.max(0, Math.round(baseRadius / scaleFactor)) },
            { name: 'md', value: baseRadius },
            { name: 'lg', value: Math.round(baseRadius * scaleFactor) },
            { name: 'xl', value: Math.round(baseRadius * Math.pow(scaleFactor, 2)) },
            { name: '2xl', value: Math.round(baseRadius * Math.pow(scaleFactor, 3)) },
            { name: '3xl', value: Math.round(baseRadius * Math.pow(scaleFactor, 4)) },
            { name: 'full', value: 9999 }
        ];
    }, [baseRadius, scaleFactor]);

    const handleCopy = (text, index) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const handleCopyAll = () => {
        const cssVars = sizes.map(s => `  --radius-${s.name}: ${s.value}px;`).join('\n');
        const cssClass = `:root {\n${cssVars}\n}`;
        navigator.clipboard.writeText(cssClass);
        setCopiedIndex('all');
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="bg-slate-50 border-2 border-black p-6 flex flex-col md:flex-row gap-6 items-center w-full max-w-2xl mx-auto">
                <div className="flex-1 w-full">
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2">Base Radius ({baseRadius}px)</label>
                    <input type="range" min="0" max="32" step="2" value={baseRadius} onChange={e => setBaseRadius(Number(e.target.value))} className="w-full accent-black" />
                </div>
                <div className="flex-1 w-full">
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2">Scale Factor ({scaleFactor.toFixed(2)})</label>
                    <input type="range" min="1.1" max="2.5" step="0.1" value={scaleFactor} onChange={e => setScaleFactor(Number(e.target.value))} className="w-full accent-black" />
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {sizes.map((size, index) => (
                    <div key={size.name} className="flex flex-col items-center">
                        <div 
                            className="w-full aspect-square bg-slate-900 border-2 border-black mb-4 flex items-center justify-center transition-all duration-300 relative group"
                            style={{ borderRadius: `${size.value}px` }}
                        >
                            <span className="text-white font-mono text-xl opacity-0 group-hover:opacity-100 transition-opacity absolute">
                                {size.value === 9999 ? '∞' : size.value}
                            </span>
                        </div>
                        <span className="font-bold text-xs uppercase tracking-widest mb-2">{size.name}</span>
                        <button 
                            onClick={() => handleCopy(`--radius-${size.name}: ${size.value}px;`, index)}
                            className="w-full text-[10px] font-mono bg-white border-2 border-black p-1 hover:bg-black hover:text-white transition-colors truncate px-2"
                        >
                            {copiedIndex === index ? 'COPIED!' : `${size.value}px`}
                        </button>
                    </div>
                ))}
            </div>

            <div className="border-2 border-black bg-white flex flex-col relative group max-w-2xl mx-auto w-full">
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
${sizes.map(s => `  --radius-${s.name}: ${s.value}px;`).join('\n')}
}`}
                </div>
            </div>
        </div>
    );
}
