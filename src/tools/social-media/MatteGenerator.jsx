import { useState, useRef, useEffect } from 'react';
import { Upload, Download, Maximize, Frame } from 'lucide-react';

const MATTE_PRESETS = [
    { name: '1:1 Square', w: 1080, h: 1080 },
    { name: '4:5 Portrait', w: 1080, h: 1350 },
    { name: '16:9 Landscape', w: 1920, h: 1080 }
];

export default function MatteGenerator() {
    const [image, setImage] = useState(null);
    const [preset, setPreset] = useState(0);
    const [matteColor, setMatteColor] = useState('#FFFFFF');
    const [padding, setPadding] = useState(10);
    const canvasRef = useRef(null);

    const currentPreset = MATTE_PRESETS[preset];

    useEffect(() => {
        if (image) {
            draw();
        }
    }, [image, preset, matteColor, padding]);

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => setImage(img);
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const draw = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        canvas.width = currentPreset.w;
        canvas.height = currentPreset.h;

        // Background
        ctx.fillStyle = matteColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (image) {
            // Fit image contained with padding
            const availableW = canvas.width * (1 - padding / 50);
            const availableH = canvas.height * (1 - padding / 50);

            const imgRatio = image.width / image.height;
            const targetRatio = availableW / availableH;

            let drawW, drawH;
            if (imgRatio > targetRatio) {
                drawW = availableW;
                drawH = availableW / imgRatio;
            } else {
                drawH = availableH;
                drawW = availableH * imgRatio;
            }

            const x = (canvas.width - drawW) / 2;
            const y = (canvas.height - drawH) / 2;

            // Drop shadow
            ctx.shadowColor = 'rgba(0,0,0,0.1)';
            ctx.shadowBlur = 40;
            ctx.shadowOffsetY = 10;

            ctx.drawImage(image, x, y, drawW, drawH);

            // Reset shadow for next draw
            ctx.shadowColor = 'transparent';
        }
    };

    const download = () => {
        const canvas = canvasRef.current;
        const link = document.createElement('a');
        link.download = `workbench-matte-${currentPreset.name.replace(/\s+/g, '-').toLowerCase()}.png`;
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
                        <span className="text-xs font-medium text-text-secondary">Image to be matted</span>
                        <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
                    </label>
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">2. Matte Preset</label>
                    <div className="space-y-2">
                        {MATTE_PRESETS.map((p, i) => (
                            <button
                                key={p.name}
                                onClick={() => setPreset(i)}
                                className={`w-full py-3 px-4 rounded-lg text-left text-sm font-medium border transition-all ${preset === i ? 'bg-primary/5 text-primary border-primary' : 'bg-surface text-text-secondary border-border hover:bg-sidebar'
                                    }`}
                            >
                                {p.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">3. Matte Color</label>
                    <div className="flex gap-2">
                        <input
                            type="color"
                            value={matteColor}
                            onChange={(e) => setMatteColor(e.target.value)}
                            className="w-16 h-12 rounded-lg border border-border cursor-pointer overflow-hidden shadow-sm"
                        />
                        <input
                            type="text"
                            value={matteColor.toUpperCase()}
                            onChange={(e) => setMatteColor(e.target.value)}
                            className="flex-1 px-4 rounded-lg border border-border bg-background font-mono text-sm uppercase"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-4 flex justify-between">
                        Matte Size
                        <span className="text-primary">{padding * 2}%</span>
                    </label>
                    <input
                        type="range"
                        min="2"
                        max="20"
                        step="1"
                        value={padding}
                        onChange={(e) => setPadding(parseInt(e.target.value))}
                        className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                </div>
            </div>

            <div className="lg:col-span-2 flex flex-col gap-6">
                <div className="bg-sidebar rounded-xl border-2 border-dashed border-border p-8 flex items-center justify-center min-h-[400px]">
                    {image ? (
                        <div className="relative max-w-full">
                            <canvas
                                ref={canvasRef}
                                className="max-w-full max-h-[500px] h-auto w-auto shadow-2xl rounded-sm"
                            />
                        </div>
                    ) : (
                        <div className="text-center space-y-3 opacity-50">
                            <Frame size={48} className="mx-auto" />
                            <p className="text-sm font-medium">Upload an image to see the matte</p>
                        </div>
                    )}
                </div>

                <div className="flex justify-end">
                    <button
                        disabled={!image}
                        onClick={download}
                        className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-bold hover:shadow-lg disabled:opacity-50 transition-all active:scale-95"
                    >
                        <Download size={18} />
                        Export Matte
                    </button>
                </div>
            </div>
        </div>
    );
}
