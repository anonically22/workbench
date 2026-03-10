import { useState, useRef } from 'react';
import { Upload, Download, Maximize, Lock, Unlock, RefreshCw } from 'lucide-react';

export default function ImageResizer() {
    const [image, setImage] = useState(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [origW, setOrigW] = useState(0);
    const [origH, setOrigH] = useState(0);
    const [lock, setLock] = useState(true);

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    setImage(img);
                    setWidth(img.width);
                    setHeight(img.height);
                    setOrigW(img.width);
                    setOrigH(img.height);
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const updateWidth = (w) => {
        const val = parseInt(w) || 0;
        setWidth(val);
        if (lock && val > 0) {
            setHeight(Math.round((val * origH) / origW));
        }
    };

    const updateHeight = (h) => {
        const val = parseInt(h) || 0;
        setHeight(val);
        if (lock && val > 0) {
            setWidth(Math.round((val * origW) / origH));
        }
    };

    const download = () => {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, width, height);

        const link = document.createElement('a');
        link.download = `workbench-resized-${width}x${height}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-3xl hover:bg-sidebar transition-all cursor-pointer group">
                    <Upload className="text-text-secondary group-hover:text-primary mb-2" size={32} />
                    <span className="text-sm font-bold text-text-primary">Click to Resize Image</span>
                    {image && <span className="text-[10px] text-primary font-black mt-2">Original: {origW}x{origH}</span>}
                    <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
                </label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-text-secondary tracking-widest px-1">Width (px)</label>
                        <input
                            type="number" value={width} onChange={(e) => updateWidth(e.target.value)}
                            className="w-full p-4 bg-surface border-2 border-border rounded-xl font-mono text-lg font-bold outline-none focus:border-primary transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-text-secondary tracking-widest px-1">Height (px)</label>
                        <input
                            type="number" value={height} onChange={(e) => updateHeight(e.target.value)}
                            className="w-full p-4 bg-surface border-2 border-border rounded-xl font-mono text-lg font-bold outline-none focus:border-primary transition-all"
                        />
                    </div>
                </div>

                <button
                    onClick={() => setLock(!lock)}
                    className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 border-2 transition-all ${lock ? 'bg-primary/5 border-primary/20 text-primary' : 'bg-sidebar border-border text-text-secondary'
                        }`}
                >
                    {lock ? <Lock size={18} /> : <Unlock size={18} />}
                    {lock ? 'Aspect Ratio Locked' : 'Aspect Ratio Unlocked'}
                </button>
            </div>

            <div className="space-y-6">
                <div className="bg-sidebar rounded-3xl border border-border p-6 flex items-center justify-center min-h-[400px] overflow-hidden">
                    {image ? (
                        <div className="relative group">
                            <img
                                src={image.src}
                                style={{ width: '100%', maxWidth: '300px', height: 'auto' }}
                                className="rounded-lg shadow-soft border border-white/20"
                                alt="Preview"
                            />
                            <div className="absolute -bottom-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-white text-[10px] font-black uppercase tracking-widest shadow-xl">
                                {width} × {height}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center opacity-30 space-y-4">
                            <Maximize size={64} className="mx-auto" />
                            <p className="font-bold flex items-center gap-2">Ready to Resize <RefreshCw size={14} /></p>
                        </div>
                    )}
                </div>

                <button
                    disabled={!image}
                    onClick={download}
                    className="w-full py-4 bg-primary text-white rounded-2xl font-bold hover:shadow-xl transition-all disabled:opacity-50 active:scale-95 flex items-center justify-center gap-3"
                >
                    <Download size={20} />
                    Download Resized Image
                </button>
            </div>
        </div>
    );
}
