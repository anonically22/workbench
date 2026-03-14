import { useState } from 'react';
import { diffChars, diffWords, diffLines } from 'diff';
import ToolShell from '../../components/ToolShell';
import { RefreshCw, ArrowRightLeft } from 'lucide-react';

export default function DiffChecker() {
    const [originalText, setOriginalText] = useState('');
    const [modifiedText, setModifiedText] = useState('');
    const [diffType, setDiffType] = useState('words'); // chars, words, lines
    const [diffResult, setDiffResult] = useState([]);

    const handleCompare = () => {
        let diff;
        if (diffType === 'chars') {
            diff = diffChars(originalText, modifiedText);
        } else if (diffType === 'lines') {
            diff = diffLines(originalText, modifiedText);
        } else {
            diff = diffWords(originalText, modifiedText);
        }
        setDiffResult(diff);
    };

    const clearAll = () => {
        setOriginalText('');
        setModifiedText('');
        setDiffResult([]);
    };

    return (
        <ToolShell
            title="Diff Checker"
            description="Compare two text inputs and highlight differences."
        >
            <div className="space-y-8">
                {/* Control Panel */}
                <div className="p-6 border-2 border-black bg-white brutalist-shadow-sm flex flex-col md:flex-row gap-6 justify-between items-center">
                    <div className="flex gap-4">
                        {['chars', 'words', 'lines'].map((type) => (
                            <button
                                key={type}
                                onClick={() => setDiffType(type)}
                                className={`px-4 py-2 font-bold uppercase tracking-widest text-xs border-2 border-black transition-all ${diffType === type ? 'bg-black text-white' : 'bg-transparent hover:bg-slate-100 text-black'}`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                        <button
                            onClick={clearAll}
                            className="flex-1 md:flex-none px-6 py-2 border-2 border-black bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-slate-100 transition-colors"
                        >
                            CLEAR
                        </button>
                        <button
                            onClick={handleCompare}
                            className="flex-1 md:flex-none px-6 py-2 border-2 border-black bg-accent text-white font-bold uppercase tracking-widest text-xs brutalist-shadow-hover flex items-center justify-center gap-2"
                        >
                            <ArrowRightLeft size={16} />
                            COMPARE
                        </button>
                    </div>
                </div>

                {/* Input Areas */}
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2 relative">
                        <label className="block text-sm font-bold uppercase tracking-[0.2em] text-black">Original Text</label>
                        <textarea
                            value={originalText}
                            onChange={(e) => setOriginalText(e.target.value)}
                            className="w-full h-64 p-4 border-2 border-black bg-white focus:outline-none focus:ring-2 focus:ring-accent resize-none font-mono text-sm brutalist-shadow-sm"
                            placeholder="Paste original text here..."
                        />
                    </div>
                    <div className="space-y-2 relative">
                        <label className="block text-sm font-bold uppercase tracking-[0.2em] text-black">Modified Text</label>
                        <textarea
                            value={modifiedText}
                            onChange={(e) => setModifiedText(e.target.value)}
                            className="w-full h-64 p-4 border-2 border-black bg-white focus:outline-none focus:ring-2 focus:ring-accent resize-none font-mono text-sm brutalist-shadow-sm"
                            placeholder="Paste modified text here..."
                        />
                    </div>
                </div>

                {/* Result Area */}
                {diffResult.length > 0 && (
                    <div className="space-y-2">
                        <h3 className="text-xl font-bold uppercase tracking-[0.2em]">Differences Result</h3>
                        <div className="p-6 border-2 border-black bg-slate-50 min-h-[150px] font-mono whitespace-pre-wrap leading-relaxed text-sm brutalist-shadow-sm">
                            {diffResult.map((part, index) => {
                                const colorClass = part.added ? 'bg-green-200 text-green-900 px-1 font-bold' : part.removed ? 'bg-red-200 text-red-900 line-through px-1 font-bold opacity-70' : 'text-slate-800';
                                return (
                                    <span key={index} className={colorClass}>
                                        {part.value}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </ToolShell>
    );
}
