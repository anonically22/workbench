import { useState } from 'react';
import ToolShell from '../../components/ToolShell';
import { Copy, RefreshCw } from 'lucide-react';

export default function EncodingTools() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [encodeMode, setEncodeMode] = useState('base64'); // base64, url, html
    const [action, setAction] = useState('encode'); // encode, decode

    const handleProcess = () => {
        try {
            let res = '';
            if (encodeMode === 'base64') {
                res = action === 'encode' ? btoa(input) : atob(input);
            } else if (encodeMode === 'url') {
                res = action === 'encode' ? encodeURIComponent(input) : decodeURIComponent(input);
            } else if (encodeMode === 'html') {
                if (action === 'encode') {
                    // Simple HTML encode
                    res = input.replace(/[\u00A0-\u9999<>\&]/g, ((i) => `&#${i.charCodeAt(0)};`));
                } else {
                    // Simple HTML decode
                    const doc = new DOMParser().parseFromString(input, "text/html");
                    res = doc.documentElement.textContent;
                }
            }
            setOutput(res);
        } catch (e) {
            setOutput("Error: Invalid input format for decoding.");
        }
    };

    const copyToClipboard = () => {
        if (output) navigator.clipboard.writeText(output);
    };

    return (
        <ToolShell
            title="Encoding Tools"
            description="Support Base64 encode/decode, URL encode/decode, and HTML encode/decode."
        >
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4 p-6 border-2 border-black bg-white brutalist-shadow-sm items-start md:items-center justify-between">
                    <div className="flex bg-slate-100 border-2 border-black overflow-hidden">
                        {['base64', 'url', 'html'].map((mode) => (
                            <button
                                key={mode}
                                onClick={() => setEncodeMode(mode)}
                                className={`px-4 py-2 font-bold uppercase tracking-widest text-xs border-r-2 border-black last:border-r-0 transition-colors ${encodeMode === mode ? 'bg-black text-white' : 'hover:bg-slate-200'}`}
                            >
                                {mode}
                            </button>
                        ))}
                    </div>

                    <div className="flex bg-slate-100 border-2 border-black overflow-hidden relative">
                        {['encode', 'decode'].map((act) => (
                            <button
                                key={act}
                                onClick={() => setAction(act)}
                                className={`px-6 py-2 font-bold uppercase tracking-widest text-xs border-r-2 border-black last:border-r-0 transition-colors ${action === act ? 'bg-accent text-white' : 'hover:bg-slate-200 text-black'}`}
                            >
                                {act}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="relative">
                    <label className="block text-sm font-bold uppercase tracking-[0.2em] text-black mb-2">Input String</label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full h-40 p-4 border-2 border-black bg-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none brutalist-shadow-sm"
                        placeholder={`Enter text to ${action}...`}
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={handleProcess}
                        className="px-8 py-3 bg-black text-white font-bold tracking-[0.2em] uppercase border-2 border-black brutalist-shadow-hover flex items-center gap-2"
                    >
                        <RefreshCw size={18} />
                        Run Function
                    </button>
                </div>

                <div className="relative">
                    <div className="flex justify-between items-end mb-2">
                        <label className="block text-sm font-bold uppercase tracking-[0.2em] text-black">Output Result</label>
                        <button
                            onClick={copyToClipboard}
                            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest bg-slate-200 hover:bg-slate-300 px-3 py-1 border-2 border-black transition-colors"
                        >
                            <Copy size={14} /> Copy
                        </button>
                    </div>
                    <textarea
                        value={output}
                        readOnly
                        className="w-full h-40 p-4 border-2 border-black bg-slate-50 font-mono text-sm resize-none brutalist-shadow-sm"
                        placeholder="Result will appear here..."
                    />
                </div>
            </div>
        </ToolShell>
    );
}
