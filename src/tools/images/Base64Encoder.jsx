import { useState } from 'react';
import { Upload, Download, Copy, FileCode, Code, RefreshCw } from 'lucide-react';

export default function Base64Encoder() {
    const [file, setFile] = useState(null);
    const [base64, setBase64] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleUpload = (e) => {
        const f = e.target.files[0];
        if (f) {
            setFile(f);
            setIsProcessing(true);
            const reader = new FileReader();
            reader.onload = (event) => {
                setBase64(event.target.result);
                setIsProcessing(false);
            };
            reader.readAsDataURL(f);
        }
    };

    const copy = (val) => {
        navigator.clipboard.writeText(val);
    };

    const cssString = file ? `background-image: url("${base64}");` : '';

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-3xl hover:bg-sidebar transition-all cursor-pointer group">
                    <Upload className="text-text-secondary group-hover:text-primary mb-2" size={32} />
                    <span className="text-sm font-bold text-text-primary">Click to Encode Asset</span>
                    <span className="text-xs text-text-secondary mt-1">Images, SVGs, or Fonts</span>
                    <input type="file" className="hidden" onChange={handleUpload} />
                </label>

                {file && (
                    <div className="bg-sidebar p-5 rounded-2xl border border-border flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-border flex items-center justify-center overflow-hidden">
                            {file.type.startsWith('image/') ? (
                                <img src={base64} className="w-full h-full object-cover" alt="Preview" />
                            ) : (
                                <FileCode className="text-primary" />
                            )}
                        </div>
                        <div className="flex-1">
                            <p className="text-xs font-bold text-text-primary truncate max-w-[200px]">{file.name}</p>
                            <p className="text-[10px] text-text-secondary">{(file.size / 1024).toFixed(1)} KB • {file.type}</p>
                        </div>
                        <button onClick={() => { setFile(null); setBase64(''); }} className="text-text-secondary hover:text-red-500 transition-colors">
                            <RefreshCw size={18} />
                        </button>
                    </div>
                )}

                <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 flex gap-3">
                    <Code className="text-primary mt-0.5 shrink-0" size={16} />
                    <p className="text-[11px] text-text-secondary leading-relaxed">
                        Encoding assets as Base64 allows you to embed them directly into HTML or CSS files, reducing HTTP requests for small graphics.
                    </p>
                </div>
            </div>

            <div className="space-y-6">
                <div className="space-y-4">
                    <div className="flex justify-between items-center px-1">
                        <span className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Base64 Data URL</span>
                        <button
                            disabled={!base64}
                            onClick={() => copy(base64)}
                            className="text-xs font-bold text-primary hover:underline transition-all flex items-center gap-1 disabled:opacity-30"
                        >
                            <Copy size={12} /> Copy Full String
                        </button>
                    </div>
                    <textarea
                        readOnly
                        value={base64}
                        className="w-full h-40 p-4 rounded-xl border border-border bg-sidebar font-mono text-[10px] resize-none outline-none focus:border-primary transition-all"
                        placeholder="Data will appear here..."
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center px-1">
                        <span className="text-[10px] font-black uppercase text-text-secondary tracking-widest">CSS Property</span>
                        <button
                            disabled={!base64}
                            onClick={() => copy(cssString)}
                            className="text-xs font-bold text-primary hover:underline transition-all flex items-center gap-1 disabled:opacity-30"
                        >
                            <Copy size={12} /> Copy Property
                        </button>
                    </div>
                    <div className="p-4 bg-surface border border-border rounded-xl font-mono text-[10px] text-text-secondary break-all">
                        {cssString || 'background-image: url("...");'}
                    </div>
                </div>
            </div>
        </div>
    );
}
