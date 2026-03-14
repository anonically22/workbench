import { useState, useMemo } from 'react';

export default function RegexTester() {
    const [pattern, setPattern] = useState('');
    const [flags, setFlags] = useState('g');
    const [testText, setTestText] = useState('The quick brown fox jumps over the lazy dog.\nThe Quick Brown Fox Jumps Over The Lazy Dog.');
    const [error, setError] = useState('');

    const toggleFlag = (f) => {
        setFlags(prev => prev.includes(f) ? prev.replace(f, '') : prev + f);
    };

    const { matches, highlighted } = useMemo(() => {
        if (!pattern) return { matches: [], highlighted: testText };
        try {
            const re = new RegExp(pattern, flags);
            setError('');
            const matchList = [];
            let m;
            const reClone = new RegExp(pattern, flags);

            if (flags.includes('g')) {
                while ((m = reClone.exec(testText)) !== null) {
                    matchList.push({ value: m[0], index: m.index, groups: m.slice(1) });
                    if (!m[0]) break; // prevent infinite loop on zero-length matches
                }
            } else {
                m = reClone.exec(testText);
                if (m) matchList.push({ value: m[0], index: m.index, groups: m.slice(1) });
            }

            // Build highlighted HTML
            let html = '';
            let lastIdx = 0;
            for (const match of matchList) {
                html += escapeHtml(testText.slice(lastIdx, match.index));
                html += `<mark class="bg-accent/20 text-accent border-b-2 border-accent">${escapeHtml(match.value)}</mark>`;
                lastIdx = match.index + match.value.length;
            }
            html += escapeHtml(testText.slice(lastIdx));

            return { matches: matchList, highlighted: html };
        } catch (e) {
            setError(e.message);
            return { matches: [], highlighted: escapeHtml(testText) };
        }
    }, [pattern, flags, testText]);

    return (
        <div className="space-y-6">
            {/* Pattern + Flags */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
                <div className="border-2 border-black bg-white p-4">
                    <label className="block text-xs font-black uppercase tracking-widest mb-2">Regular Expression</label>
                    <div className="flex items-center gap-1 font-mono text-sm">
                        <span className="text-slate-400">/</span>
                        <input value={pattern} onChange={e => setPattern(e.target.value)}
                            placeholder="[A-Z][a-z]+"
                            className="flex-1 border-b-2 border-slate-200 px-1 py-1 focus:outline-none focus:border-accent font-mono" />
                        <span className="text-slate-400">/{flags}</span>
                    </div>
                    {error && <p className="text-[10px] font-bold text-red-500 mt-2">{error}</p>}
                </div>
                <div className="border-2 border-black bg-white p-4">
                    <label className="block text-xs font-black uppercase tracking-widest mb-2">Flags</label>
                    <div className="flex gap-2">
                        {[
                            { flag: 'g', label: 'Global' },
                            { flag: 'i', label: 'Case-insensitive' },
                            { flag: 'm', label: 'Multiline' },
                            { flag: 's', label: 'Dotall' },
                        ].map(({ flag, label }) => (
                            <button key={flag} onClick={() => toggleFlag(flag)}
                                title={label}
                                className={`w-8 h-8 border-2 text-xs font-mono font-bold transition-colors ${
                                    flags.includes(flag) ? 'bg-black text-white border-black' : 'border-slate-300 hover:border-black'
                                }`}>{flag}</button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Test String */}
            <div className="border-2 border-black bg-white p-5">
                <label className="block text-xs font-black uppercase tracking-widest mb-3">Test String</label>
                <textarea value={testText} onChange={e => setTestText(e.target.value)}
                    className="w-full h-32 font-mono text-sm border-2 border-slate-200 p-3 focus:outline-none focus:border-accent resize-none" />
            </div>

            {/* Highlighted Result */}
            <div className="border-2 border-black bg-white p-5">
                <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-black uppercase tracking-widest">Result</label>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {matches.length} match{matches.length !== 1 ? 'es' : ''}
                    </span>
                </div>
                <div className="font-mono text-sm whitespace-pre-wrap bg-slate-50 border-2 border-slate-200 p-3 min-h-[60px]"
                    dangerouslySetInnerHTML={{ __html: highlighted }} />
            </div>

            {/* Match Table */}
            {matches.length > 0 && (
                <div className="border-2 border-black bg-white p-5">
                    <p className="text-xs font-black uppercase tracking-widest mb-3">Match Details</p>
                    <div className="overflow-x-auto">
                        <table className="w-full text-xs font-mono">
                            <thead>
                                <tr className="border-b-2 border-black">
                                    <th className="text-left p-2 font-black uppercase tracking-widest">#</th>
                                    <th className="text-left p-2 font-black uppercase tracking-widest">Match</th>
                                    <th className="text-left p-2 font-black uppercase tracking-widest">Index</th>
                                    <th className="text-left p-2 font-black uppercase tracking-widest">Groups</th>
                                </tr>
                            </thead>
                            <tbody>
                                {matches.map((m, i) => (
                                    <tr key={i} className="border-b border-slate-200">
                                        <td className="p-2 text-slate-400">{i + 1}</td>
                                        <td className="p-2 text-accent font-bold">"{m.value}"</td>
                                        <td className="p-2 text-slate-500">{m.index}</td>
                                        <td className="p-2 text-slate-500">{m.groups.length ? m.groups.join(', ') : '—'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
