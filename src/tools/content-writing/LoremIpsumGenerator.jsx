import { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';
import { Copy, RefreshCw } from 'lucide-react';

export default function LoremIpsumGenerator() {
    const [count, setCount] = useState(3);
    const [type, setType] = useState('paragraphs'); // paragraphs, sentences, words
    const [text, setText] = useState('');
    const [copied, setCopied] = useState(false);

    const generateText = () => {
        let newText = '';
        if (type === 'paragraphs') {
            newText = faker.lorem.paragraphs(count, '\n\n');
        } else if (type === 'sentences') {
            newText = faker.lorem.sentences(count, ' ');
        } else if (type === 'words') {
            newText = faker.lorem.words(count);
        }
        setText(newText);
    };

    // Generate on initial mount or when settings change
    useEffect(() => {
        generateText();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count, type]);

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-6">
                <div className="bg-slate-50 border-2 border-black p-6 space-y-6">
                    <h3 className="text-sm font-bold tracking-[0.2em] uppercase border-b-2 border-black pb-2 mb-4">Generator Settings</h3>
                    
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest mb-2">Generate</label>
                        <div className="flex bg-white border-2 border-black">
                            <input 
                                type="number" 
                                min="1" 
                                max="100" 
                                value={count} 
                                onChange={e => setCount(Math.max(1, Math.min(100, Number(e.target.value))))} 
                                className="w-20 border-r-2 border-black p-2 font-mono text-center font-bold" 
                            />
                            <select 
                                value={type} 
                                onChange={e => setType(e.target.value)} 
                                className="flex-1 p-2 font-bold uppercase text-sm tracking-widest"
                            >
                                <option value="paragraphs">Paragraphs</option>
                                <option value="sentences">Sentences</option>
                                <option value="words">Words</option>
                            </select>
                        </div>
                    </div>

                    <button 
                        onClick={generateText}
                        className="w-full bg-accent text-white p-4 font-bold uppercase tracking-[0.2em] border-2 border-black brutalist-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform active:translate-x-0 active:translate-y-0 active:shadow-none"
                    >
                        Generate New Text
                    </button>
                    
                    <p className="text-xs text-slate-500 font-medium">Text generation is powered by the popular faker.js library directly in your browser.</p>
                </div>
            </div>

            <div className="w-full lg:w-[600px] flex flex-col gap-6">
                 <div className="border-2 border-black bg-white flex flex-col h-full relative group shadow-[8px_8px_0_theme(colors.slate.200)] max-h-[600px]">
                    <div className="bg-black text-white p-2 flex justify-between items-center text-xs font-bold tracking-[0.2em] uppercase">
                        <span>Generated Output</span>
                        <button 
                            onClick={handleCopy}
                            className="flex items-center gap-1 hover:text-accent transition-colors"
                        >
                            {copied ? <RefreshCw size={14} className="animate-spin" /> : <Copy size={14} />}
                            {copied ? 'COPIED!' : 'COPY TEXT'}
                        </button>
                    </div>
                    <div className="p-6 text-black font-serif text-lg leading-relaxed overflow-y-auto whitespace-pre-wrap flex-grow">
                        {text}
                    </div>
                </div>
            </div>
        </div>
    );
}
