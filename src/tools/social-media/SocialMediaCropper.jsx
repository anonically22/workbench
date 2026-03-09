import { useState, useRef, useEffect } from 'react';
import { Upload, Download, Crop, RefreshCcw } from 'lucide-react';

const PLATFORMS = {
    instagram: {
        name: 'Instagram',
        formats: [
            { name: 'Square (1:1)', w: 1080, h: 1080, ratio: 1 },
            { name: 'Portrait (4:5)', w: 1080, h: 1350, ratio: 0.8 },
            { name: 'Landscape (1.91:1)', w: 1080, h: 566, ratio: 1.91 },
            { name: 'Story (9:16)', w: 1080, h: 1920, ratio: 0.5625 }
        ]
    },
    twitter: {
        name: 'X / Twitter',
        formats: [
            { name: 'Post (16:9)', w: 1600, h: 900, ratio: 1.777 },
            { name: 'Header (3:1)', w: 1500, h: 500, ratio: 3 }
        ]
    },
    linkedin: {
        name: 'LinkedIn',
        formats: [
            { name: 'Post (1.91:1)', w: 1200, h: 627, ratio: 1.91 },
            { name: 'Cover (4:1)', w: 1584, h: 396, ratio: 4 }
        ]
    }
};

export default function SocialMediaCropper() {
    const [image, setImage] = useState(null);
    const [platform, setPlatform] = useState('instagram');
    const [formatIndex, setFormatIndex] = useState(0);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const isDragging = useRef(false);
    const lastPos = useRef({ x: 0, y: 0 });

    const currentPlatform = PLATFORMS[platform];
    const currentFormat = currentPlatform.formats[formatIndex];

    useEffect(() => {
        if (image) {
            draw();
        }
    }, [image, platform, formatIndex, offset, zoom]);

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    setImage(img);
                    // Auto-scale to fill
                    const scaleW = currentFormat.w / img.width;
                    const scaleH = currentFormat.h / img.height;
                    setZoom(Math.max(scaleW, scaleH) * 1.5); // A bit larger for UI
                    setOffset({ x: 0, y: 0 });
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const draw = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        canvas.width = currentFormat.w;
        canvas.height = currentFormat.h;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (image) {
            const w = image.width * zoom;
            const h = image.height * zoom;
            ctx.drawImage(image, offset.x, offset.y, w, h);
        }
    };

    const handleMouseDown = (e) => {
        isDragging.current = true;
        lastPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
        if (!isDragging.current) return;
        const dx = e.clientX - lastPos.current.x;
        const dy = e.clientY - lastPos.current.y;
        setOffset(prev => ({ x: prev.x + dx, y: prev.y + dy }));
        lastPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    const download = () => {
        const canvas = canvasRef.current;
        const link = document.createElement('a');
        link.download = `nixby-crop-${platform}-${currentFormat.name.replace(/\s+/g, '-').toLowerCase()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold mb-2">1. Upload Image</label>
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-xl hover:bg-sidebar transition-all cursor-pointer group">
                        <Upload className="text-text-secondary group-hover:text-primary mb-2" />
                        <span className="text-xs font-medium text-text-secondary">Click to upload or drag & drop</span>
                        <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
                    </label>
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">2. Select Platform</label>
                    <div className="grid grid-cols-3 gap-2">
                        {Object.keys(PLATFORMS).map(p => (
                            <button
                                key={p}
                                onClick={() => { setPlatform(p); setFormatIndex(0); }}
                                className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all ${platform === p ? 'bg-primary text-white border-primary shadow-sm' : 'bg-surface text-text-secondary border-border hover:bg-sidebar'
                                    }`}
                            >
                                {PLATFORMS[p].name}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">3. Format</label>
                    <div className="space-y-2">
                        {currentPlatform.formats.map((f, i) => (
                            <button
                                key={f.name}
                                onClick={() => setFormatIndex(i)}
                                className={`w-full py-3 px-4 rounded-lg text-left text-sm font-medium border transition-all flex justify-between items-center ${formatIndex === i ? 'bg-primary/5 text-primary border-primary' : 'bg-surface text-text-secondary border-border hover:bg-sidebar'
                                    }`}
                            >
                                <span>{f.name}</span>
                                <span className="text-[10px] opacity-70">{f.w}x{f.h}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-4 flex justify-between">
                        Zoom
                        <span className="text-primary">{Math.round(zoom * 100)}%</span>
                    </label>
                    <input
                        type="range"
                        min="0.1"
                        max="5"
                        step="0.1"
                        value={zoom}
                        onChange={(e) => setZoom(parseFloat(e.target.value))}
                        className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                </div>
            </div>

            <div className="lg:col-span-2 flex flex-col gap-6">
                <div
                    ref={containerRef}
                    className="relative aspect-video bg-sidebar rounded-xl border-2 border-dashed border-border overflow-hidden flex items-center justify-center cursor-move select-none"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    {image ? (
                        <div className="relative shadow-2xl bg-black/10 origin-center">
                            <canvas
                                ref={canvasRef}
                                className="max-w-full max-h-[400px] h-auto w-auto object-contain bg-white"
                                style={{
                                    boxShadow: '0 20px 50px rgba(0,0,0,0.1)'
                                }}
                            />
                        </div>
                    ) : (
                        <div className="text-center space-y-3 opacity-50">
                            <Crop size={48} className="mx-auto" />
                            <p className="text-sm font-medium">Upload an image to start cropping</p>
                        </div>
                    )}

                    {image && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-white text-[10px] font-bold tracking-widest uppercase">
                            Drag to reposition
                        </div>
                    )}
                </div>

                <div className="flex justify-between items-center">
                    <p className="text-xs text-text-secondary italic">
                        * Nixby processes everything locally. Your image never leaves your browser.
                    </p>
                    <button
                        disabled={!image}
                        onClick={download}
                        className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-bold hover:shadow-lg disabled:opacity-50 transition-all active:scale-95"
                    >
                        <Download size={18} />
                        Download Crop
                    </button>
                </div>
            </div>
        </div>
    );
}
