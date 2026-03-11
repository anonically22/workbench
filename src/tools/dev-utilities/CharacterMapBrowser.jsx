import { useState, useMemo } from 'react';
import { Copy, RefreshCw } from 'lucide-react';

// Common categories of useful characters
const SYMBOL_CATEGORIES = [
    {
        name: 'Math & Logic',
        symbols: ['+', '-', '±', '×', '÷', '=', '≈', '≠', '<', '>', '≤', '≥', '∞', '∑', '∏', '∫', 'π', '√', 'Δ', 'Ω', 'μ', '∴', '∵', '∅']
    },
    {
        name: 'Arrows',
        symbols: ['←', '↑', '→', '↓', '↔', '↕', '↖', '↗', '↘', '↙', '↩', '↪', '⇄', '⇅', '⇆', '⇐', '⇑', '⇒', '⇓', '⇔', '➔', '➝', '➞']
    },
    {
        name: 'Punctuation & Quotes',
        symbols: ['«', '»', '‹', '›', '“', '”', '‘', '’', '„', '‚', '—', '–', '…', '¿', '¡', '§', '¶', '†', '‡', '•', '◦', '‣']
    },
    {
        name: 'Currency',
        symbols: ['$', '€', '£', '¥', '₹', '₽', '₩', '₪', '฿', '₫', '¢', '¤']
    },
    {
        name: 'Legal & Copyright',
        symbols: ['©', '®', '™', '℠', '℗', '℃', '℉']
    },
    {
        name: 'UI & Tech (Mac)',
        symbols: ['⌘', '⌥', '⌃', '⇧', '⇪', '⎋', '⌫', '⌦', '⏎', '⏏', '⌤']
    },
    {
        name: 'Shapes & Geometry',
        symbols: ['■', '□', '▲', '△', '▼', '▽', '◆', '◇', '○', '◎', '●', '★', '☆', '♥', '♡', '♠', '♣', '♦']
    },
    {
        name: 'Checkmarks & X',
        symbols: ['✓', '✔', '✗', '✘', '☐', '☑', '☒']
    }
];

export default function CharacterMapBrowser() {
    const [searchQuery, setSearchQuery] = useState('');
    const [copiedChar, setCopiedChar] = useState(null);

    const filteredCategories = useMemo(() => {
        if (!searchQuery) return SYMBOL_CATEGORIES;
        const lowerQuery = searchQuery.toLowerCase();
        
        return SYMBOL_CATEGORIES.map(category => {
            // Also map the hex unicode to allow searching by hex or name conceptually if we had names, 
            // but for now simple filter by matching symbol directly or category name
            const matchesCat = category.name.toLowerCase().includes(lowerQuery);
            const matchingSymbols = category.symbols.filter(s => s.toLowerCase().includes(lowerQuery));
            if (matchesCat) return category;
            if (matchingSymbols.length > 0) return { ...category, symbols: matchingSymbols };
            return null;
        }).filter(Boolean);
    }, [searchQuery]);

    const handleCopy = (char) => {
        navigator.clipboard.writeText(char);
        setCopiedChar(char);
        setTimeout(() => setCopiedChar(null), 1500);
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="bg-slate-50 border-2 border-black p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1 w-full max-w-md">
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                        <input 
                            type="text" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by symbol or category name..."
                            className="w-full border-2 border-black p-3 pl-10 font-bold focus:outline-none focus:border-accent transition-colors"
                        />
                    </div>
                </div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest text-center md:text-right">
                    Click any symbol to copy to clipboard
                </div>
            </div>

            <div className="space-y-8">
                {filteredCategories.length === 0 ? (
                    <div className="text-center p-12 border-2 border-dashed border-slate-300">
                        <span className="text-xl font-bold opacity-30">No symbols found matching "{searchQuery}"</span>
                    </div>
                ) : (
                    filteredCategories.map(category => (
                        <div key={category.name} className="bg-white border-2 border-black shadow-[4px_4px_0_theme(colors.slate.200)]">
                            <div className="bg-slate-100 border-b-2 border-black p-3">
                                <h3 className="font-black text-sm uppercase tracking-widest text-black flex items-center gap-2">
                                    <span className="w-2 h-2 bg-accent block"></span>
                                    {category.name}
                                </h3>
                            </div>
                            <div className="p-4 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-3">
                                {category.symbols.map((char, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleCopy(char)}
                                        className="relative group aspect-square flex flex-col items-center justify-center p-2 border-2 border-slate-200 hover:border-black hover:bg-black hover:text-white transition-all brutalist-shadow-sm-hover bg-slate-50"
                                        title={`Copy ${char}`}
                                    >
                                        <span className="text-3xl font-mono mb-1">{char}</span>
                                        <span className="text-[9px] uppercase tracking-widest opacity-0 group-hover:opacity-100 absolute bottom-1 text-accent font-bold">Copy</span>
                                        {copiedChar === char && (
                                            <div className="absolute inset-0 bg-accent text-white flex flex-col items-center justify-center z-10 transition-opacity">
                                                <RefreshCw size={16} className="mb-1" />
                                                <span className="text-[10px] font-bold">Copied</span>
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
