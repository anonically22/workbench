import { useState } from 'react';
import { Upload, Download, Zap, Code, FileCode } from 'lucide-react';

export default function SVGOptimiser() {
    const [svg, setSvg] = useState('');
    const [optimized, setOptimized] = useState('');
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const content = event.target.result;
                setSvg(content);
                process(content);
            };
            reader.readAsText(file);
        }
    };

    const process = async (raw) => {
        if (!raw) return;
        setLoading(true);
        try {
            // Check if svgo is already loaded (lazy loading from CDN)
            if (!window.svgo) {
                await new Promise((resolve, reject) => {
                    const script = document.createElement('script');
                    script.src = 'https://cdn.jsdelivr.net/npm/svgo@3.0.2/dist/svgo.browser.js';
                    script.onload = resolve;
                    script.onerror = reject;
                    document.head.appendChild(script);
                });
            }

            const { optimize } = window.svgo;
            const result = optimize(raw, {
                multipass: true,
                plugins: [
                    'preset-default',
                    'removeDimensions',
                    'sortAttrs'
                ]
            });
            setOptimized(result.data);
            setStats({
                original: raw.length,
                optimized: result.data.length,
                saved: Math.round((1 - result.data.length / raw.length) * 100)
            });
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const download = () => {
        const blob = new Blob([optimized], { type: 'image/svg+xml' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'workbench-optimized.svg';
        link.click();
    };

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold mb-2">1. Paste SVG or Upload</label>
                    <textarea
                        value={svg}
                        onChange={(e) => { setSvg(e.target.value); process(e.target.value); }}
                        className="w-full h-48 p-4 rounded-xl border-2 border-border bg-background font-mono text-[10px] focus:border-primary outline-none transition-all"
                        placeholder="Paste <svg>...</svg> code here..."
                    />
                    <div className="mt-4">
                        <label className="flex items-center justify-center gap-2 w-full py-3 bg-sidebar border-2 border-dashed border-border rounded-xl cursor-pointer hover:bg-white transition-all text-sm font-bold text-text-secondary">
                            <Upload size={16} />
                            Upload .svg file
                            <input type="file" className="hidden" onChange={handleUpload} accept=".svg" />
                        </label>
                    </div>
                </div>

                {stats && (
                    <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 space-y-4">
                        <div className="flex justify-between items-center">
                            <div className="text-[10px] font-black uppercase text-primary tracking-widest flex items-center gap-1">
                                <Zap size={12} />
                                Optimization Results
                            </div>
                            <span className="text-2xl font-black text-primary">{stats.saved}% Smaller</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-3 rounded-xl border border-border shadow-sm">
                                <p className="text-[8px] font-black uppercase text-text-secondary mb-1">Original Size</p>
                                <p className="font-mono text-xs font-bold">{(stats.original / 1024).toFixed(2)} KB</p>
                            </div>
                            <div className="bg-white p-3 rounded-xl border border-border shadow-sm">
                                <p className="text-[8px] font-black uppercase text-text-secondary mb-1">Optimized Size</p>
                                <p className="font-mono text-xs font-bold">{(stats.optimized / 1024).toFixed(2)} KB</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="space-y-6">
                <h3 className="text-sm font-bold text-text-primary px-1">Optimized Result</h3>
                <div className="bg-sidebar rounded-2xl border border-border p-6 flex flex-col items-center justify-center min-h-[300px] relative group overflow-hidden">
                    {optimized ? (
                        <div
                            className="max-w-full max-h-[250px] svg-preview"
                            dangerouslySetInnerHTML={{ __html: optimized }}
                        />
                    ) : (
                        <FileCode className="text-border" size={64} />
                    )}

                    {optimized && (
                        <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-4">
                            <button
                                onClick={() => navigator.clipboard.writeText(optimized)}
                                className="p-4 bg-white text-primary rounded-full hover:scale-110 active:scale-90 transition-all shadow-xl"
                                title="Copy Code"
                            >
                                <Code size={24} />
                            </button>
                            <button
                                onClick={download}
                                className="p-4 bg-white text-primary rounded-full hover:scale-110 active:scale-90 transition-all shadow-xl"
                                title="Download SVG"
                            >
                                <Download size={24} />
                            </button>
                        </div>
                    )}
                </div>

                <p className="text-[10px] text-text-secondary text-center leading-relaxed">
                    Workbench SVGO cleans up redundant code, namespaces, and minifies paths while maintaining visual integrity.
                </p>
            </div>
        </div>
    );
}
