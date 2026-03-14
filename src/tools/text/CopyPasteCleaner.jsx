import { useState } from 'react';
import { Clipboard, Copy, Trash2, RefreshCw, Layers, Info } from 'lucide-react';

export default function CopyPasteCleaner() {
    const [text, setText] = useState('');

    const clean = () => {
        // Strip HTML, non-printable characters, and normalize whitespace
        let cleaned = text.replace(/<[^>]*>/g, '');
        cleaned = cleaned.replace(/[^\x20-\x7E\n\t]/g, '');
        cleaned = cleaned.replace(/[ \t]+/g, ' ').trim();
        setText(cleaned);
    };

    const stripFormatting = () => {
        setText(text.trim());
    };

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 space-y-6">
                <div className="relative group">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full h-[500px] p-8 rounded-[40px] border-2 border-border bg-background focus:border-primary outline-none transition-all text-base leading-relaxed shadow-soft"
                        placeholder="Paste messy text with HTML, weird symbols, or trailing spaces..."
                    />
                    <div className="absolute top-6 right-6 flex gap-2">
                        <button
                            onClick={() => setText('')}
                            className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
                <div className="bg-sidebar p-8 rounded-[40px] border border-border space-y-8">
                    <div className="text-center space-y-2 pb-4">
                        <Clipboard className="text-primary mx-auto" size={32} />
                        <h3 className="text-xl font-bold text-text-primary">Text Sanitiser</h3>
                        <p className="text-xs text-text-secondary">Strip formatting and hidden crud.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        <button
                            onClick={clean}
                            className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-white rounded-2xl font-bold hover:shadow-xl transition-all active:scale-95"
                        >
                            <RefreshCw size={18} />
                            Clean Everything
                        </button>
                        <button
                            onClick={stripFormatting}
                            className="w-full flex items-center justify-center gap-2 py-4 bg-white border border-border text-text-primary rounded-2xl font-bold hover:border-primary transition-all active:scale-95"
                        >
                            <Layers size={18} />
                            Trim Whitespace
                        </button>
                        <button
                            onClick={() => navigator.clipboard.writeText(text)}
                            className="w-full flex items-center justify-center gap-2 py-4 bg-white border border-border text-text-primary rounded-2xl font-bold hover:border-primary transition-all active:scale-95"
                        >
                            <Copy size={18} />
                            Copy Clean Text
                        </button>
                    </div>
                </div>

                <div className="p-6 bg-primary/5 rounded-[40px] border border-primary/10 flex items-start gap-4">
                    <Info size={24} className="text-primary shrink-0" />
                    <p className="text-[11px] text-text-secondary leading-relaxed">
                        Invisible characters like non-breaking spaces (NBSP) or hidden HTML tags often break layouts. This tool ensures your copy is "pure text" before you paste into your CMS or design tool.
                    </p>
                </div>
            </div>
        </div>
    );
}
