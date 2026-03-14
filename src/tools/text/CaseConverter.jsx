import { useState } from 'react';
import { Type, Copy, RefreshCw, Trash2 } from 'lucide-react';

export default function CaseConverter() {
    const [text, setText] = useState('');

    const transforms = {
        'UPPERCASE': (t) => t.toUpperCase(),
        'lowercase': (t) => t.toLowerCase(),
        'Title Case': (t) => t.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()),
        'Sentence case': (t) => t.charAt(0).toUpperCase() + t.substr(1).toLowerCase(),
        'camelCase': (t) => t.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => index === 0 ? word.toLowerCase() : word.toUpperCase()).replace(/\s+/g, ''),
        'PascalCase': (t) => t.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase()).replace(/\s+/g, ''),
        'snake_case': (t) => t.toLowerCase().split(/\s+/).join('_'),
        'kebab-case': (t) => t.toLowerCase().split(/\s+/).join('-')
    };

    const copy = (val) => {
        navigator.clipboard.writeText(val);
    };

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold mb-2 text-text-secondary">Raw Text Input</label>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full h-80 p-6 rounded-3xl border-2 border-border bg-background focus:border-primary outline-none transition-all text-sm leading-relaxed"
                        placeholder="Type or paste your text here..."
                    />
                </div>

                <div className="flex justify-between items-center bg-sidebar p-4 rounded-2xl border border-border border-dashed">
                    <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest pl-2">
                        {text.length} Characters • {text.trim().split(/\s+/).filter(Boolean).length} Words
                    </p>
                    <button
                        onClick={() => setText('')}
                        className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                        title="Clear Text"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(transforms).map(([name, fn]) => {
                    const result = text ? fn(text) : '...';
                    return (
                        <div key={name} className="group relative bg-surface border border-border p-5 rounded-2xl flex flex-col gap-3 transition-all hover:border-primary/30 hover:shadow-soft overflow-hidden">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black uppercase text-text-secondary bg-sidebar px-2 py-0.5 rounded tracking-widest">{name}</span>
                                <button
                                    onClick={() => copy(result)}
                                    className="p-2 opacity-0 group-hover:opacity-100 bg-primary/10 text-primary rounded-lg transition-all hover:bg-primary hover:text-white"
                                >
                                    <Copy size={14} />
                                </button>
                            </div>
                            <p className="text-xs font-mono text-text-primary break-all line-clamp-3 leading-relaxed">
                                {result}
                            </p>
                            {/* Visual flourish */}
                            <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-full -mr-8 -mt-8" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
