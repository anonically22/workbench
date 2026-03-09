import { useState } from 'react';
import { FileJson, Copy, RefreshCw, Trash2, Maximize, Minimize, Info } from 'lucide-react';

export default function JSONFormatter() {
    const [data, setData] = useState('');
    const [error, setError] = useState('');

    const format = () => {
        try {
            const parsed = JSON.parse(data);
            setData(JSON.stringify(parsed, null, 2));
            setError('');
        } catch (e) {
            setError(e.message);
        }
    };

    const minify = () => {
        try {
            const parsed = JSON.parse(data);
            setData(JSON.stringify(parsed));
            setError('');
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 space-y-6">
                <div className="relative group">
                    <textarea
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        className={`w-full h-[500px] p-8 rounded-[40px] border-2 bg-background focus:border-primary outline-none transition-all font-mono text-sm leading-relaxed shadow-soft ${error ? 'border-red-500' : 'border-border'}`}
                        placeholder='Paste your JSON here: { "name": "Nixby" }'
                    />
                    <div className="absolute top-6 right-6 flex gap-2">
                        <button
                            onClick={() => setData('')}
                            className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>

                    {error && (
                        <div className="absolute bottom-6 left-6 right-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                            <Info size={14} /> {error}
                        </div>
                    )}
                </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
                <div className="bg-sidebar p-8 rounded-[40px] border border-border space-y-8">
                    <div className="text-center space-y-2 pb-4">
                        <FileJson className="text-primary mx-auto" size={32} />
                        <h3 className="text-xl font-bold text-text-primary">JSON Processor</h3>
                        <p className="text-xs text-text-secondary">Clean, minify, or debug JSON structures.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        <button
                            onClick={format}
                            className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-white rounded-2xl font-bold hover:shadow-xl transition-all active:scale-95"
                        >
                            <Maximize size={18} />
                            Format (Pretty Print)
                        </button>
                        <button
                            onClick={minify}
                            className="w-full flex items-center justify-center gap-2 py-4 bg-white border border-border text-text-primary rounded-2xl font-bold hover:border-primary transition-all active:scale-95"
                        >
                            <Minimize size={18} />
                            Minify (Compact)
                        </button>
                        <button
                            onClick={() => {
                                format();
                                if (!error) navigator.clipboard.writeText(data);
                            }}
                            className="w-full flex items-center justify-center gap-2 py-4 bg-white border border-border text-text-primary rounded-2xl font-bold hover:border-primary transition-all active:scale-95"
                        >
                            <Copy size={18} />
                            Copy Result
                        </button>
                    </div>
                </div>

                <div className="p-6 bg-primary/5 rounded-[40px] border border-primary/10 flex items-start gap-4">
                    <Info size={24} className="text-primary shrink-0" />
                    <p className="text-[11px] text-text-secondary leading-relaxed">
                        Nixby processes JSON purely on the client side. Your data never leaves your browser, keeping API keys and sensitive payloads private.
                    </p>
                </div>
            </div>
        </div>
    );
}
