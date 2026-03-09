import { useState } from 'react';
import { Repeat, Copy, Info, Zap, Trash2 } from 'lucide-react';

export default function CSSToTailwind() {
    const [css, setCss] = useState('background-color: #6366f1; padding: 16px; border-radius: 8px;');
    const [tw, setTw] = useState('');

    const convert = () => {
        let result = [];
        const lines = css.split(';').map(l => l.trim()).filter(Boolean);

        lines.forEach(line => {
            const [prop, val] = line.split(':').map(v => v.trim());
            if (!prop || !val) return;

            // Basic conversions
            if (prop === 'background-color') result.push('bg-[' + val + ']');
            if (prop === 'padding') result.push('p-[' + val + ']');
            if (prop === 'margin') result.push('m-[' + val + ']');
            if (prop === 'border-radius') result.push('rounded-[' + val + ']');
            if (prop === 'color') result.push('text-[' + val + ']');
            if (prop === 'font-weight') result.push('font-[' + val + ']');
            if (prop === 'display' && val === 'flex') result.push('flex');
            if (prop === 'flex-direction' && val === 'column') result.push('flex-col');
        });

        setTw(result.join(' '));
    };

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
                <label className="text-[10px] font-black uppercase text-text-secondary tracking-widest px-1">Raw CSS Properties</label>
                <div className="relative group">
                    <textarea
                        value={css}
                        onChange={(e) => setCss(e.target.value)}
                        className="w-full h-80 p-8 rounded-[40px] border-2 border-border bg-background focus:border-primary outline-none transition-all font-mono text-sm leading-relaxed"
                        placeholder="display: flex; gap: 8px;"
                    />
                    <button onClick={() => setCss('')} className="absolute top-6 right-6 p-2 bg-red-50 text-red-500 rounded-xl opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={16} /></button>
                </div>
                <button
                    onClick={convert}
                    className="w-full py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
                >
                    <Repeat size={18} />
                    Convert to Utility Classes
                </button>
            </div>

            <div className="space-y-4">
                <label className="text-[10px] font-black uppercase text-text-secondary tracking-widest px-1">Tailwind JIT Output</label>
                <div className="bg-slate-900 p-8 rounded-[40px] h-80 flex flex-col justify-between shadow-xl">
                    <div className="flex-1 overflow-y-auto">
                        {tw ? (
                            <p className="text-xl font-black text-primary break-all leading-relaxed">
                                {tw}
                            </p>
                        ) : (
                            <p className="text-white/20 italic font-medium">Converted classes will appear here...</p>
                        )}
                    </div>
                    <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Zap className="text-amber-400" size={16} />
                            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">JIT Syntax</span>
                        </div>
                        <button
                            onClick={() => navigator.clipboard.writeText(tw)}
                            className="text-primary font-bold text-[10px] uppercase tracking-widest hover:underline flex items-center gap-1"
                        >
                            <Copy size={14} /> Copy Classes
                        </button>
                    </div>
                </div>

                <div className="p-5 bg-white border border-border rounded-2xl flex items-start gap-3">
                    <Info className="text-primary shrink-0 mt-0.5" size={18} />
                    <p className="text-[11px] text-text-secondary leading-relaxed font-medium">
                        This tool uses Tailwind's Arbitrary Value syntax (JIT), allowing you to use exact CSS values as utility classes. Perfect for porting legacy designs.
                    </p>
                </div>
            </div>
        </div>
    );
}
