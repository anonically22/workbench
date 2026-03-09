import { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { Upload, Download, Zap, FileImage, ShieldCheck } from 'lucide-react';

export default function ImageCompressor() {
    const [file, setFile] = useState(null);
    const [compressedBlob, setCompressedBlob] = useState(null);
    const [quality, setQuality] = useState(0.8);
    const [isCompresing, setIsCompressing] = useState(false);
    const [stats, setStats] = useState(null);

    const handleUpload = async (e) => {
        const f = e.target.files[0];
        if (f) {
            setFile(f);
            compress(f, quality);
        }
    };

    const compress = async (f, q) => {
        setIsCompressing(true);
        try {
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
                initialQuality: q
            };

            const compressed = await imageCompression(f, options);
            setCompressedBlob(compressed);

            setStats({
                original: f.size,
                compressed: compressed.size,
                saved: Math.round((1 - compressed.size / f.size) * 100)
            });
        } catch (e) {
            console.error(e);
        }
        setIsCompressing(false);
    };

    const download = () => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(compressedBlob);
        link.download = `nixby-compressed-${file.name}`;
        link.click();
    };

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-3xl hover:bg-sidebar transition-all cursor-pointer group">
                    <Upload className="text-text-secondary group-hover:text-primary mb-2" size={32} />
                    <span className="text-sm font-bold text-text-primary">Compress High-Res Image</span>
                    {file && <span className="text-[10px] text-primary font-black mt-2">Source: {(file.size / 1024 / 1024).toFixed(2)} MB</span>}
                    <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
                </label>

                <div>
                    <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-4 px-1 flex justify-between">
                        Compression Level
                        <span className="text-primary">{Math.round((1 - quality) * 100)}%</span>
                    </label>
                    <input
                        type="range"
                        min="0.1" max="0.9" step="0.1"
                        value={quality}
                        onChange={(e) => {
                            const q = parseFloat(e.target.value);
                            setQuality(q);
                            if (file) compress(file, q);
                        }}
                        className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between mt-2 text-[8px] font-bold text-text-secondary uppercase">
                        <span>Best Quality</span>
                        <span>Smallest File</span>
                    </div>
                </div>

                <div className="p-4 bg-sidebar rounded-xl border border-border border-dashed flex gap-3">
                    <ShieldCheck className="text-green-500 shrink-0" size={18} />
                    <p className="text-[11px] text-text-secondary leading-relaxed">
                        Nixby uses worker threads for local compression. Your sensitive images never touch a server.
                    </p>
                </div>
            </div>

            <div className="space-y-6">
                <h3 className="text-sm font-bold text-text-primary px-1">Output Analysis</h3>

                {isCompresing ? (
                    <div className="bg-sidebar rounded-3xl border border-border p-12 flex flex-col items-center justify-center gap-4">
                        <Zap className="text-primary animate-pulse" size={48} />
                        <p className="text-xs font-bold text-primary animate-bounce">Crunching Pixels...</p>
                    </div>
                ) : stats ? (
                    <div className="space-y-4">
                        <div className="bg-primary p-8 rounded-3xl text-white flex flex-col items-center text-center shadow-xl">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-2">Space Saved</p>
                            <span className="text-6xl font-black">{stats.saved}%</span>
                            <div className="mt-6 flex gap-4 text-xs font-bold">
                                <div className="px-3 py-1 bg-white/10 rounded-full">{(stats.original / 1024).toFixed(0)} KB</div>
                                <div className="text-white/40">→</div>
                                <div className="px-3 py-1 bg-white/20 rounded-full">{(stats.compressed / 1024).toFixed(0)} KB</div>
                            </div>
                        </div>

                        <button
                            onClick={download}
                            className="w-full py-4 bg-surface border-2 border-border text-text-primary rounded-2xl font-bold hover:bg-white transition-all active:scale-95 flex items-center justify-center gap-3 shadow-soft"
                        >
                            <Download size={20} className="text-primary" />
                            Save Compressed Asset
                        </button>
                    </div>
                ) : (
                    <div className="bg-sidebar rounded-3xl border border-border p-12 flex flex-col items-center justify-center opacity-30 gap-4">
                        <FileImage size={48} />
                        <p className="text-xs font-bold">Upload an image to optimize</p>
                    </div>
                )}
            </div>
        </div>
    );
}
