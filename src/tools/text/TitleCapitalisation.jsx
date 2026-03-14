import { useState } from 'react';
import { Type, Copy, RefreshCw, BookOpen, Info } from 'lucide-react';

export default function TitleCapitalisation() {
    const [text, setText] = useState('the quick brown fox jumps over the lazy dog');
    const [style, setStyle] = useState('ap');

    const apStyle = (str) => {
        const minorWords = ['a', 'an', 'the', 'at', 'by', 'for', 'in', 'of', 'on', 'to', 'up', 'and', 'as', 'but', 'or', 'nor'];
        return str.split(' ').map((word, index, words) => {
            if (index > 0 && index < words.length - 1 && minorWords.includes(word.toLowerCase())) {
                return word.toLowerCase();
            }
            return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
        }).join(' ');
    };

    const result = style === 'ap' ? apStyle(text) : text.toUpperCase();

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 space-y-6">
                <div>
                    <label className="block text-sm font-semibold mb-2 text-text-secondary">Input Title</label>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full h-48 p-8 rounded-[40px] border-2 border-border bg-background focus:border-primary outline-none transition-all text-2xl font-black leading-relaxed shadow-soft"
                        placeholder="Enter your title here..."
                    />
                </div>

                <div className="bg-sidebar p-8 rounded-[40px] border border-border min-h-[200px] flex flex-col justify-between shadow-inner relative group">
                    <div className="space-y-2">
                        <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Calculated Title</p>
                        <h3 className="text-3xl font-black text-text-primary">{result}</h3>
                    </div>
                    <button
                        onClick={() => navigator.clipboard.writeText(result)}
                        className="self-end flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest hover:underline"
                    >
                        <Copy size={16} /> Copy Title
                    </button>
                </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
                <div className="bg-sidebar p-8 rounded-[40px] border border-border space-y-8">
                    <div className="space-y-4">
                        <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest px-1">Style Reference</label>
                        <div className="grid grid-cols-1 gap-2">
                            {[
                                { id: 'ap', name: 'AP Style', desc: 'Capitalise major words, lowercase minor words (the, of, to).' },
                                { id: 'all', name: 'ALL CAPS', desc: 'Standard uppercase for bold emphasis.' }
                            ].map(s => (
                                <button
                                    key={s.id}
                                    onClick={() => setStyle(s.id)}
                                    className={`p-4 rounded-xl border text-left transition-all ${style === s.id ? 'bg-primary border-primary text-white shadow-md' : 'bg-white border-border text-text-primary hover:bg-sidebar'}`}
                                >
                                    <p className="text-sm font-bold">{s.name}</p>
                                    <p className={`text-[10px] mt-1 ${style === s.id ? 'opacity-70' : 'text-text-secondary'}`}>{s.desc}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-surface border border-border rounded-3xl flex items-start gap-4">
                    <BookOpen className="text-primary shrink-0" size={20} />
                    <p className="text-[11px] text-text-secondary leading-relaxed">
                        Consistent capitalisation is key to professional UI design. AP Style is the industry standard for headers and marketing copy.
                    </p>
                </div>
            </div>
        </div>
    );
}
