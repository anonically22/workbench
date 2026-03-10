import { useState } from 'react';
import { Search, Copy, RefreshCw, Hash, Info, CheckCircle2, AlertCircle } from 'lucide-react';

export default function RegexTester() {
    const [pattern, setPattern] = useState('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}');
    const [text, setText] = useState('Contact us at hello@workbench.design or support@google.com');
    const [flags, setFlags] = useState('gi');

    const getMatches = () => {
        try {
            const regex = new RegExp(pattern, flags);
            const matches = [...text.matchAll(regex)];
            return matches.map(m => m[0]);
        } catch (e) {
            return null;
        }
    };

    const matches = getMatches();
    const isValid = matches !== null;

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-sidebar p-8 rounded-[40px] border border-border space-y-8 shadow-sm">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-text-secondary tracking-widest px-1">Pattern</label>
                            <div className="relative">
                                <span className="absolute left-4 top-4 text-text-secondary font-mono">/</span>
                                <input
                                    type="text"
                                    value={pattern}
                                    onChange={(e) => setPattern(e.target.value)}
                                    className={`w-full p-4 pl-8 bg-background border-2 rounded-2xl font-mono text-sm outline-none transition-all ${isValid ? 'border-border focus:border-primary' : 'border-red-500'}`}
                                />
                                <span className="absolute right-4 top-4 text-text-secondary font-mono">/{flags}</span>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-border border-dashed">
                            <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Test Content</p>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="w-full h-48 p-4 bg-background border border-border rounded-xl font-medium text-sm outline-none focus:border-primary"
                            />
                        </div>
                    </div>
                </div>

                <div className={`p-6 rounded-[34px] border flex items-center gap-4 transition-all ${isValid ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'}`}>
                    {isValid ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                    <div className="space-y-1">
                        <p className="text-xs font-black uppercase tracking-widest">{isValid ? 'Expression Valid' : 'Invalid Regex'}</p>
                        <p className="text-[10px] font-medium opacity-70">{isValid ? `Found ${matches.length} matches in current string.` : 'Fix your syntax to see results.'}</p>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
                <div className="bg-sidebar rounded-[40px] border border-border p-8 min-h-[400px] flex flex-col gap-6">
                    <h3 className="text-sm font-bold text-text-primary px-1">Match Results</h3>
                    <div className="flex flex-wrap gap-2">
                        {matches && matches.length > 0 ? (
                            matches.map((m, i) => (
                                <div key={i} className="px-4 py-2 bg-white border border-border rounded-xl text-xs font-mono font-bold text-primary shadow-sm flex items-center gap-3 animate-in scale-in duration-300">
                                    {m}
                                    <button onClick={() => navigator.clipboard.writeText(m)} className="text-text-secondary hover:text-primary transition-all"><Copy size={12} /></button>
                                </div>
                            ))
                        ) : (
                            <div className="w-full h-64 flex flex-col items-center justify-center text-text-secondary/30 gap-4">
                                <Search size={48} />
                                <p className="text-sm font-bold uppercase tracking-widest">No matches found</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-8 bg-slate-900 rounded-[40px] text-white shadow-xl flex flex-col md:flex-row items-center gap-8 group">
                    <div className="flex-1 space-y-2">
                        <p className="text-xs font-bold text-primary">Regex Pro Tip</p>
                        <p className="text-[11px] text-white/50 leading-relaxed">
                            Always include the <code>g</code> (global) flag if you want to find all occurrences, otherwise it will stop at the first match.
                        </p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 font-mono text-[9px] text-white/40">
                        \w+ matches words<br />
                        \d+ matches digits<br />
                        . matches anything
                    </div>
                </div>
            </div>
        </div>
    );
}
