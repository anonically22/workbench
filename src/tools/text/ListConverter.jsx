import { useState } from 'react';
import { List, Copy, RefreshCw, Brackets, Info, FileSpreadsheet } from 'lucide-react';

export default function ListConverter() {
    const [text, setText] = useState('Item 1\nItem 2\nItem 3');
    const [format, setFormat] = useState('json');

    const convert = () => {
        const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
        if (format === 'json') return JSON.stringify(lines, null, 2);
        if (format === 'js') return "[\n  '" + lines.join("',\n  '") + "'\n]";
        if (format === 'csv') return lines.join(',');
        return lines.join('\n');
    };

    const result = convert();

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-sidebar p-8 rounded-[40px] border border-border space-y-6">
                    <div>
                        <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-4 px-1">Raw Newline List</label>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="w-full h-80 p-6 bg-background border border-border rounded-2xl font-mono text-sm outline-none focus:border-primary"
                            placeholder="Enter items one per line..."
                        />
                    </div>
                </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
                <div className="flex bg-sidebar p-1 rounded-2xl border border-border">
                    {[
                        { id: 'json', l: 'JSON Array', i: Brackets },
                        { id: 'js', l: 'JS Array', i: Brackets },
                        { id: 'csv', l: 'CSV String', i: FileSpreadsheet }
                    ].map(f => (
                        <button
                            key={f.id}
                            onClick={() => setFormat(f.id)}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold rounded-xl transition-all ${format === f.id ? 'bg-primary text-white shadow-md' : 'text-text-secondary hover:text-text-primary'}`}
                        >
                            <f.i size={16} />
                            {f.l}
                        </button>
                    ))}
                </div>

                <div className="bg-slate-900 p-8 rounded-[40px] h-[400px] flex flex-col justify-between shadow-xl group">
                    <div className="flex-1 overflow-y-auto">
                        <pre className="font-mono text-xs text-primary leading-relaxed whitespace-pre">
                            {result}
                        </pre>
                    </div>
                    <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{format.toUpperCase()} Output</span>
                        <button
                            onClick={() => navigator.clipboard.writeText(result)}
                            className="text-primary font-bold text-[10px] uppercase tracking-widest hover:underline flex items-center gap-1"
                        >
                            <Copy size={14} /> Copy Result
                        </button>
                    </div>
                </div>

                <div className="p-6 bg-white border border-border rounded-[40px] flex items-start gap-4">
                    <Info className="text-primary shrink-0" size={24} />
                    <p className="text-[11px] text-text-secondary leading-relaxed">
                        Quickly transform spreadsheet columns or bullet points into programming formats. Useful for mapping data in React components or seeding databases.
                    </p>
                </div>
            </div>
        </div>
    );
}
