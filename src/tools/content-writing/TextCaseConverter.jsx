import { useState } from 'react';
import { Copy, RefreshCw } from 'lucide-react';

export default function TextCaseConverter() {
    const [text, setText] = useState('Workbench is my curated collection of single-purpose browser tools.');
    const [copiedIndex, setCopiedIndex] = useState(null);

    const toCamelCase = (str) => {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
    };

    const toSnakeCase = (str) => {
        return str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
            ?.map(x => x.toLowerCase())
            .join('_') || '';
    };

    const toKebabCase = (str) => {
        return str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
            ?.map(x => x.toLowerCase())
            .join('-') || '';
    };

    const toPascalCase = (str) => {
        return str.match(/[a-z]+/gi)
            ?.map(word => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase())
            .join('') || '';
    };

    const toTitleCase = (str) => {
        return str.toLowerCase().split(' ').map((word) => {
            return word.replace(word[0], word[0].toUpperCase());
        }).join(' ');
    };
    
    const toAlternatingCase = (str) => {
        return str.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('');
    };

    const cases = [
        { name: 'lowercase', value: text.toLowerCase() },
        { name: 'UPPERCASE', value: text.toUpperCase() },
        { name: 'Title Case', value: toTitleCase(text) },
        { name: 'camelCase', value: toCamelCase(text) },
        { name: 'PascalCase', value: toPascalCase(text) },
        { name: 'snake_case', value: toSnakeCase(text) },
        { name: 'kebab-case', value: toKebabCase(text) },
        { name: 'aLtErNaTiNg', value: toAlternatingCase(text) }
    ];

    const handleCopy = (str, index) => {
        navigator.clipboard.writeText(str);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="bg-slate-50 border-2 border-black p-6 w-full max-w-4xl mx-auto">
                <h3 className="text-sm font-bold tracking-[0.2em] uppercase border-b-2 border-black pb-2 mb-4">Input Text</h3>
                <textarea 
                    value={text} 
                    onChange={e => setText(e.target.value)} 
                    placeholder="Enter or paste text here..."
                    className="w-full h-32 border-2 border-black p-4 font-mono focus:outline-none focus:ring-4 focus:ring-accent/20 transition-all resize-y" 
                />
            </div>

            <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
                {cases.map((c, index) => (
                    <div key={c.name} className="border-2 border-black bg-white flex flex-col group transition-all hover:bg-slate-50 relative brutalist-shadow-hover">
                        <div className="bg-black text-white p-2 flex justify-between items-center text-xs font-bold tracking-[0.2em] uppercase">
                            <span>{c.name}</span>
                            <button 
                                onClick={() => handleCopy(c.value, index)}
                                className="flex items-center gap-1 hover:text-accent transition-colors"
                            >
                                {copiedIndex === index ? <RefreshCw size={14} className="animate-spin" /> : <Copy size={14} />}
                                {copiedIndex === index ? 'COPIED!' : 'COPY'}
                            </button>
                        </div>
                        <div className="p-4 font-mono text-sm overflow-x-auto whitespace-pre-wrap min-h-[80px]">
                            {c.value || <span className="text-slate-400 italic">No output</span>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
