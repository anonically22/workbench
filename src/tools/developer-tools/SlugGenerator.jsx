import { useState } from 'react';
import { Copy, Link, Trash2 } from 'lucide-react';

export default function SlugGenerator() {
    const [text, setText] = useState('');
    const [separator, setSeparator] = useState('-');

    const generateSlug = (input) => {
        return input
            .toString()
            .normalize('NFD')                   // split an accented letter in the base letter and the accent
            .replace(/[\u0300-\u036f]/g, '')   // remove all previously split accents
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9 ]/g, '')   // remove all chars not letters, numbers and spaces (to be replaced)
            .replace(/\s+/g, separator);
    };

    const slug = generateSlug(text);

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-500">
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-black uppercase mb-2">Source Text</label>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full h-48 p-4 border-2 border-black bg-white focus:outline-none focus:ring-4 focus:ring-accent/20 transition-all font-mono font-bold"
                        placeholder="Enter text here..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-black uppercase mb-2">Separator</label>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setSeparator('-')}
                            className={`flex-1 py-3 font-black uppercase border-2 border-black transition-all ${separator === '-' ? 'bg-black text-white' : 'bg-white text-black hover:bg-slate-100'}`}
                        >
                            Hyphen (-)
                        </button>
                        <button
                            onClick={() => setSeparator('_')}
                            className={`flex-1 py-3 font-black uppercase border-2 border-black transition-all ${separator === '_' ? 'bg-black text-white' : 'bg-white text-black hover:bg-slate-100'}`}
                        >
                            Underscore (_)
                        </button>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-slate-100 border-2 border-black p-8 brutalist-shadow min-h-[250px] flex flex-col justify-center relative">
                    <div className="absolute top-4 left-4 flex gap-2">
                        <Link className="text-black" size={24} strokeWidth={2.5} />
                        <span className="font-black uppercase tracking-widest text-xs">Result</span>
                    </div>
                    {slug ? (
                        <div className="mt-8 break-all font-mono font-black text-xl text-black">
                            {slug}
                        </div>
                    ) : (
                        <p className="text-sm font-bold uppercase opacity-50 text-center mt-8">Slug will appear here</p>
                    )}
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={() => setText('')}
                        className="flex-1 flex items-center justify-center gap-2 py-4 bg-white text-red-500 border-2 border-red-500 font-black uppercase tracking-widest hover:bg-red-50 transition-colors brutalist-shadow-sm active:translate-y-1 active:shadow-none"
                    >
                        <Trash2 size={18} strokeWidth={2.5} />
                        Clear
                    </button>
                    <button
                        onClick={() => {
                            if (slug) navigator.clipboard.writeText(slug);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 py-4 bg-black text-white font-black uppercase tracking-widest hover:bg-slate-800 transition-colors brutalist-shadow-sm active:translate-y-1 active:shadow-none"
                    >
                        <Copy size={18} strokeWidth={2.5} />
                        Copy Slug
                    </button>
                </div>
            </div>
        </div>
    );
}
