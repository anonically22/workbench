import { useState } from 'react';
import { Check, X } from 'lucide-react';

export default function EightPointGridChecker() {
    const [inputValue, setInputValue] = useState('16, 24, 30, 48, 60');

    const results = inputValue.split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0 && !isNaN(Number(s)))
        .map(numStr => {
            const num = Number(numStr);
            const isTarget = num % 8 === 0;
            const nearestLower = Math.floor(num / 8) * 8;
            const nearestHigher = Math.ceil(num / 8) * 8;
            
            return {
                value: num,
                isTarget,
                nearestLower,
                nearestHigher,
                diff: isTarget ? 0 : Math.min(Math.abs(num - nearestLower), Math.abs(nearestHigher - num))
            };
        });

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-6">
                <div className="bg-slate-50 border-2 border-black p-6 space-y-6">
                    <h3 className="text-sm font-bold tracking-[0.2em] uppercase border-b-2 border-black pb-2 mb-4">Input Spacing Values</h3>
                    
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest mb-2">Values to test (px)</label>
                        <p className="text-xs text-slate-500 mb-4 font-medium">Enter multiple values separated by commas to test them simultaneously against the 8pt grid.</p>
                        <input 
                            type="text" 
                            value={inputValue} 
                            onChange={e => setInputValue(e.target.value)} 
                            placeholder="e.g. 16, 20, 24, 32"
                            className="w-full border-2 border-black p-4 text-xl font-bold font-mono focus:outline-none focus:ring-4 focus:ring-accent/20 transition-all placeholder:opacity-30" 
                        />
                    </div>
                </div>

                <div className="bg-white border-2 border-black p-0 overflow-hidden">
                    <div className="bg-black text-white p-4 font-bold text-sm tracking-[0.2em] uppercase">Audit Results</div>
                    
                    {results.length === 0 ? (
                        <div className="p-8 text-center text-slate-400 font-bold uppercase text-xs tracking-widest">
                            No valid numbers entered.
                        </div>
                    ) : (
                        <div className="divide-y-2 divide-slate-100">
                            {results.map((res, i) => (
                                <div key={i} className={`p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${res.isTarget ? 'bg-green-50/50' : 'bg-red-50/50'}`}>
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 flex items-center justify-center border-2 ${res.isTarget ? 'bg-green-100 border-green-600 text-green-600' : 'bg-red-100 border-red-600 text-red-600'}`}>
                                            {res.isTarget ? <Check size={24} strokeWidth={3} /> : <X size={24} strokeWidth={3} />}
                                        </div>
                                        <div>
                                            <div className="font-black text-2xl font-mono text-black">{res.value}px</div>
                                            <div className={`text-xs font-bold tracking-widest uppercase ${res.isTarget ? 'text-green-600' : 'text-red-600'}`}>
                                                {res.isTarget ? 'Aligned' : `Off by ${res.diff}px`}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {!res.isTarget && (
                                        <div className="flex gap-2">
                                            <div className="bg-white border-2 border-slate-200 px-3 py-2 flex flex-col items-center">
                                                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Suggest</span>
                                                <span className="font-mono font-black text-accent">{res.nearestLower}px</span>
                                            </div>
                                            <div className="bg-white border-2 border-slate-200 px-3 py-2 flex flex-col items-center">
                                                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Suggest</span>
                                                <span className="font-mono font-black text-accent">{res.nearestHigher}px</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="w-full lg:w-[400px] flex flex-col gap-6">
                <div className="border-4 border-slate-200 bg-white p-6 relative flex flex-col items-center justify-center overflow-hidden">
                    <h3 className="text-sm font-bold tracking-[0.2em] uppercase border-b-2 border-black w-full text-center pb-2 mb-8 mt-2">Why 8pt Grid?</h3>
                    
                    <div className="space-y-6 text-sm font-medium text-slate-600 leading-relaxed px-2">
                        <p>
                            Using increments of 8 (8, 16, 24, 32, 40...) aligns perfectly with screen scaling and rendering.
                        </p>
                        <p>
                            Most popular screen resolutions are divisible by 8. This ensures your layouts, margins, and padding will render sharply without sub-pixel blurring.
                        </p>
                        
                        <div className="bg-slate-50 border-2 border-black p-4 mt-6">
                            <h4 className="font-bold text-black uppercase tracking-widest text-xs mb-3">Common Tokens</h4>
                            <div className="grid grid-cols-2 gap-2 font-mono text-xs font-bold text-accent">
                                <div>1x = 8px</div>
                                <div>2x = 16px</div>
                                <div>3x = 24px</div>
                                <div>4x = 32px</div>
                                <div>6x = 48px</div>
                                <div>8x = 64px</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
