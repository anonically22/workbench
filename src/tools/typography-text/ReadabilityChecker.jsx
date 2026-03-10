import { useState, useEffect } from 'react';
import { Type, Info, CheckCircle2, TrendingUp, AlertCircle } from 'lucide-react';

export default function ReadabilityChecker() {
    const [text, setText] = useState('');
    const [stats, setStats] = useState({
        flesch: 0,
        sentences: 0,
        words: 0,
        syllables: 0,
        level: 'Entry'
    });

    useEffect(() => {
        analyze(text);
    }, [text]);

    const countSyllables = (word) => {
        word = word.toLowerCase();
        if (word.length <= 3) return 1;
        word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
        word = word.replace(/^y/, '');
        const res = word.match(/[aeiouy]{1,2}/g);
        return res ? res.length : 1;
    };

    const analyze = (t) => {
        if (!t.trim()) {
            setStats({ flesch: 0, sentences: 0, words: 0, syllables: 0, level: 'Beginner' });
            return;
        }

        const sentences = t.split(/[.!?]+/).filter(Boolean).length;
        const words = t.match(/\w+/g) || [];
        const wordCount = words.length;
        let syllableCount = 0;
        words.forEach(w => syllableCount += countSyllables(w));

        // Flesch Reading Ease
        // Formula: 206.835 - 1.015 * (total_words/total_sentences) - 84.6 * (total_syllables/total_words)
        const score = wordCount > 0 && sentences > 0
            ? 206.835 - 1.015 * (wordCount / sentences) - 84.6 * (syllableCount / wordCount)
            : 0;

        let level = 'Pro';
        if (score > 90) level = 'Grade 5';
        else if (score > 80) level = 'Grade 6';
        else if (score > 70) level = 'Grade 7';
        else if (score > 60) level = 'Grade 8/9';
        else if (score > 50) level = 'High School';
        else if (score > 30) level = 'College';
        else level = 'Graduate';

        setStats({
            flesch: Math.round(score),
            sentences,
            words: wordCount,
            syllables: syllableCount,
            level
        });
    };

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 space-y-6">
                <div>
                    <label className="block text-sm font-semibold mb-2 text-text-secondary">Paste Content to Analyze</label>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full h-[450px] p-8 rounded-[40px] border-2 border-border bg-background focus:border-primary outline-none transition-all text-base leading-loose shadow-soft"
                        placeholder="Workbench makes readability analysis instant and private..."
                    />
                </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
                <div className="bg-primary p-8 rounded-3xl text-white shadow-xl flex flex-col items-center text-center group">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-2">Flesch Reading Ease</p>
                    <span className="text-7xl font-black group-hover:scale-110 transition-transform">{stats.flesch}</span>
                    <div className="mt-6 px-6 py-2 bg-white/20 rounded-full font-bold text-sm backdrop-blur-md">
                        {stats.level} Ready
                    </div>
                    <p className="mt-4 text-[10px] opacity-70 leading-relaxed font-medium">
                        Higher scores (90+) are easier to read. Lower scores (30-) are graduate level.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 bg-surface border border-border rounded-2xl">
                        <p className="text-[10px] font-black uppercase text-text-secondary mb-1">Sentences</p>
                        <p className="text-2xl font-black text-text-primary">{stats.sentences}</p>
                    </div>
                    <div className="p-5 bg-surface border border-border rounded-2xl">
                        <p className="text-[10px] font-black uppercase text-text-secondary mb-1">Avg Syllables</p>
                        <p className="text-2xl font-black text-text-primary">{(stats.syllables / (stats.words || 1)).toFixed(1)}</p>
                    </div>
                </div>

                <div className="p-6 bg-sidebar rounded-3xl border border-border border-dashed space-y-4">
                    <h4 className="text-xs font-bold text-text-primary flex items-center gap-2">
                        <TrendingUp size={16} className="text-primary" />
                        Engagement Tip
                    </h4>
                    <div className="space-y-3">
                        <div className={`flex items-start gap-3 p-3 rounded-xl transition-all ${stats.flesch > 60 ? 'bg-green-50' : 'bg-red-50'}`}>
                            {stats.flesch > 60 ? <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={16} /> : <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={16} />}
                            <p className={`text-[11px] leading-relaxed ${stats.flesch > 60 ? 'text-green-700' : 'text-red-700'}`}>
                                {stats.flesch > 60
                                    ? "Great job! This copy is accessible to a general audience."
                                    : "This copy is quite complex. Consider shortening sentences to reach a wider audience."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
