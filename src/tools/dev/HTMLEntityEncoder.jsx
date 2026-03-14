import { useState } from 'react';
import { Type, Copy, RefreshCw, Hash, Info, Code } from 'lucide-react';

export default function HTMLEntityEncoder() {
    const [text, setText] = useState('<strong>Hello</strong> & Welcome!');

    const encode = (str) => {
        return str.replace(/[\u00A0-\u9999<>\&]/g, (i) => {
            return '&#' + i.charCodeAt(0) + ';';
        });
    };

    const decode = (str) => {
        const txt = document.createElement('textarea');
        txt.innerHTML = str;
        return txt.value;
    };

    const encoded = encode(text);
    const decoded = decode(text);

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
                <div>
                    <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-4 px-1">Raw Content / Decoded</label>
                    <div className="relative group">
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="w-full h-80 p-8 rounded-[40px] border-2 border-border bg-background focus:border-primary outline-none transition-all font-mono text-sm leading-relaxed"
                            placeholder="Type symbols like ©, ®, or <html>..."
                        />
                        <button
                            onClick={() => navigator.clipboard.writeText(decoded)}
                            className="absolute bottom-6 right-6 p-3 bg-sidebar border border-border rounded-2xl opacity-0 group-hover:opacity-100 transition-all text-text-secondary hover:text-primary"
                        >
                            <Copy size={18} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-4 px-1">HTML Entities / Encoded</label>
                    <div className="bg-slate-900 h-80 rounded-[40px] p-8 flex flex-col justify-between shadow-xl relative group">
                        <div className="flex-1 overflow-y-auto">
                            <p className="font-mono text-sm text-primary break-all leading-relaxed whitespace-pre-wrap">
                                {encoded}
                            </p>
                        </div>
                        <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <Code className="text-white/40" size={16} />
                                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">ASCII / Char Mapping</span>
                            </div>
                            <button
                                onClick={() => navigator.clipboard.writeText(encoded)}
                                className="text-primary font-bold text-[10px] uppercase tracking-widest hover:underline flex items-center gap-1"
                            >
                                <Copy size={14} /> Copy Entities
                            </button>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-white border border-border rounded-[40px] flex items-start gap-4 shadow-soft">
                    <Info size={24} className="text-primary shrink-0" />
                    <p className="text-[11px] text-text-secondary leading-relaxed">
                        Entities are names or numbers that start with an ampersand and end with a semicolon. They are used to display reserved characters and symbols in HTML.
                    </p>
                </div>
            </div>
        </div>
    );
}
