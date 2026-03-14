import { useState, useEffect } from 'react';

export default function ReadabilityChecker() {
    const [text, setText] = useState('Workbench is my curated collection of single-purpose browser tools designed for UI/UX designers, graphic artists, and frontend developers. I built this with a focus on visual excellence and operational speed. Every tool runs 100% in the browser—no backend, no server, and zero data tracking.');
    
    const [stats, setStats] = useState({
        words: 0,
        sentences: 0,
        syllables: 0,
        characters: 0,
        score: 0,
        grade: 0,
        difficulty: 'Unknown'
    });

    // Heuristic syllable counter
    const countSyllables = (word) => {
        word = word.toLowerCase();
        if(word.length <= 3) return 1;
        word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
        word = word.replace(/^y/, '');
        const syllables = word.match(/[aeiouy]{1,2}/g);
        return syllables ? syllables.length : 1;
    };

    useEffect(() => {
        if (!text.trim()) {
            setStats({ words: 0, sentences: 0, syllables: 0, characters: 0, score: 0, grade: 0, difficulty: 'None' });
            return;
        }

        const trimmedText = text.trim();
        const sentences = trimmedText.split(/[.!?]+/).filter(Boolean).length || 1;
        const words = trimmedText.split(/\s+/).filter(Boolean);
        const wordCount = words.length;
        const charCount = trimmedText.replace(/\s/g, '').length;
        
        let syllableCount = 0;
        words.forEach(word => {
            syllableCount += countSyllables(word.replace(/[^a-zA-Z]/g, ''));
        });

        // Flesch Reading Ease Formula
        // 206.835 - 1.015 * (Total Words / Total Sentences) - 84.6 * (Total Syllables / Total Words)
        const score = 206.835 - (1.015 * (wordCount / sentences)) - (84.6 * (syllableCount / wordCount));
        
        // Flesch-Kincaid Grade Level Formula
        // 0.39 * (Total Words / Total Sentences) + 11.8 * (Total Syllables / Total Words) - 15.59
        const grade = (0.39 * (wordCount / sentences)) + (11.8 * (syllableCount / wordCount)) - 15.59;

        let difficulty = '';
        if (score >= 90) difficulty = 'Very Easy (5th Grade)';
        else if (score >= 80) difficulty = 'Easy (6th Grade)';
        else if (score >= 70) difficulty = 'Fairly Easy (7th Grade)';
        else if (score >= 60) difficulty = 'Standard (8th-9th Grade)';
        else if (score >= 50) difficulty = 'Fairly Difficult (10th-12th Grade)';
        else if (score >= 30) difficulty = 'Difficult (College)';
        else difficulty = 'Very Difficult (College Grad)';

        setStats({
            words: wordCount,
            sentences: sentences,
            syllables: syllableCount,
            characters: charCount,
            score: Math.max(0, Math.min(100, Math.round(score * 10) / 10)),
            grade: Math.max(0, Math.round(grade * 10) / 10),
            difficulty
        });

    }, [text]);

    return (
        <div className="flex flex-col gap-8">
            <div className="bg-slate-50 border-2 border-black p-6 w-full max-w-4xl mx-auto">
                <h3 className="text-sm font-bold tracking-[0.2em] uppercase border-b-2 border-black pb-2 mb-4">Content Analyzer</h3>
                <textarea 
                    value={text} 
                    onChange={e => setText(e.target.value)} 
                    placeholder="Enter or paste text here to analyze readability..."
                    className="w-full h-48 border-2 border-black p-4 font-serif text-lg leading-relaxed focus:outline-none focus:ring-4 focus:ring-accent/20 transition-all resize-y shadow-[4px_4px_0_theme(colors.slate.200)]" 
                />
            </div>

            <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Main Readability Score */}
                <div className="col-span-1 md:col-span-3 lg:col-span-1 border-4 border-black bg-accent text-white p-6 flex flex-col justify-center items-center text-center brutalist-shadow">
                    <span className="text-sm font-bold tracking-[0.2em] uppercase mb-4 opacity-80">Reading Ease</span>
                    <span className="text-7xl font-black font-mono mb-2">{stats.score}</span>
                    <span className="text-sm font-bold tracking-widest uppercase bg-black text-accent px-4 py-2">{stats.difficulty}</span>
                </div>

                {/* Grade Level & Metrics */}
                <div className="col-span-1 md:col-span-3 lg:col-span-2 grid grid-cols-2 gap-4">
                    <div className="bg-slate-900 border-2 border-black text-white p-6 flex flex-col justify-center">
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 mb-2">Grade Level</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-black">{stats.grade}</span>
                            <span className="text-xs font-bold uppercase opacity-50 tracking-widest">US Grade</span>
                        </div>
                    </div>

                    <div className="grid grid-rows-2 gap-4">
                        <div className="bg-slate-100 border-2 border-black p-4 flex flex-col justify-center transition-colors hover:bg-slate-200">
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500 mb-1">Total Words</span>
                            <span className="text-2xl font-black font-mono text-black">{stats.words}</span>
                        </div>
                        <div className="bg-slate-100 border-2 border-black p-4 flex flex-col justify-center transition-colors hover:bg-slate-200">
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500 mb-1">Sentences</span>
                            <span className="text-2xl font-black font-mono text-black">{stats.sentences}</span>
                        </div>
                    </div>
                </div>

                {/* Detailed Metrics */}
                <div className="col-span-1 md:col-span-3 flex gap-4">
                    <div className="flex-1 bg-white border border-slate-200 p-4 shrink-0 flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Characters</span>
                        <span className="font-mono font-bold text-accent">{stats.characters}</span>
                    </div>
                    <div className="flex-1 bg-white border border-slate-200 p-4 shrink-0 flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Syllables</span>
                        <span className="font-mono font-bold text-accent">{stats.syllables}</span>
                    </div>
                    <div className="flex-1 bg-white border border-slate-200 p-4 shrink-0 flex items-center justify-between hidden md:flex">
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Words/Sentence</span>
                        <span className="font-mono font-bold text-accent">{stats.sentences > 0 ? Math.round((stats.words / stats.sentences) * 10) / 10 : 0}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
