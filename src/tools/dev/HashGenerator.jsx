import { useState } from 'react';

const ALGORITHMS = ['SHA-256', 'SHA-384', 'SHA-512', 'SHA-1'];

async function computeHash(text, algo) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest(algo, data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export default function HashGenerator() {
    const [input, setInput] = useState('');
    const [algo, setAlgo] = useState('SHA-256');
    const [hash, setHash] = useState('');
    const [copied, setCopied] = useState(false);

    const generate = async () => {
        if (!input.trim()) { setHash(''); return; }
        const result = await computeHash(input, algo);
        setHash(result);
        setCopied(false);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(hash);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    // Auto-generate on input/algo change
    const handleInput = (val) => {
        setInput(val);
        if (val.trim()) {
            computeHash(val, algo).then(setHash);
        } else {
            setHash('');
        }
        setCopied(false);
    };

    const handleAlgo = (a) => {
        setAlgo(a);
        if (input.trim()) {
            computeHash(input, a).then(setHash);
        }
        setCopied(false);
    };

    return (
        <div className="space-y-6">
            {/* Algorithm Selector */}
            <div className="flex flex-wrap gap-2">
                {ALGORITHMS.map(a => (
                    <button key={a} onClick={() => handleAlgo(a)}
                        className={`px-4 py-2 border-2 text-xs font-black uppercase tracking-widest transition-colors ${
                            algo === a ? 'bg-black text-white border-black' : 'border-slate-300 hover:border-black'
                        }`}>{a}</button>
                ))}
            </div>

            {/* Input */}
            <div className="border-2 border-black bg-white p-5">
                <label className="block text-xs font-black uppercase tracking-widest mb-3">Input Text</label>
                <textarea value={input} onChange={e => handleInput(e.target.value)}
                    placeholder="Type or paste text to hash..."
                    className="w-full h-32 font-mono text-sm border-2 border-slate-200 p-3 focus:outline-none focus:border-accent resize-none" />
            </div>

            {/* Output */}
            <div className="border-2 border-black bg-white p-5">
                <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-black uppercase tracking-widest">{algo} Hash</label>
                    <button onClick={handleCopy} disabled={!hash}
                        className="text-[10px] font-bold uppercase tracking-widest text-accent hover:underline disabled:text-slate-300">
                        {copied ? '✓ Copied' : 'Copy'}
                    </button>
                </div>
                <div className="font-mono text-xs bg-slate-50 border-2 border-slate-200 p-4 break-all min-h-[40px]">
                    {hash || <span className="text-slate-300">Hash will appear here...</span>}
                </div>
            </div>

            {/* Info */}
            <div className="border-2 border-black bg-white p-5">
                <p className="text-xs font-black uppercase tracking-widest mb-3">About</p>
                <div className="text-xs text-slate-500 font-bold leading-relaxed space-y-1">
                    <p>Hashes are computed entirely in the browser using the Web Crypto API.</p>
                    <p>No data is sent to any server.</p>
                    <p className="text-[10px] text-slate-400">SHA-1 is shown for reference only — avoid using it for security purposes.</p>
                </div>
            </div>
        </div>
    );
}
