import { useState, useEffect, useRef } from 'react';
import { Download, RefreshCw, Layers, Sliders } from 'lucide-react';

export default function NoiseGenerator() {
    const [opacity, setOpacity] = useState(0.05);
    const [intensity, setIntensity] = useState(0.5);
    const [scale, setScale] = useState(1);
    const [monochrome, setMonochrome] = useState(true);
    const canvasRef = useRef(null);

    useEffect(() => {
        generate();
    }, [opacity, intensity, scale, monochrome]);

    const generate = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const w = 256;
        const h = 256;
        canvas.width = w;
        canvas.height = h;

        const imageData = ctx.createImageData(w, h);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const val = Math.random() * 255 * intensity;
            if (monochrome) {
                data[i] = val;     // R
                data[i + 1] = val; // G
                data[i + 2] = val; // B
            } else {
                data[i] = Math.random() * 255 * intensity;
                data[i + 1] = Math.random() * 255 * intensity;
                data[i + 2] = Math.random() * 255 * intensity;
            }
            data[i + 3] = 255 * opacity; // A
        }

        ctx.putImageData(imageData, 0, 0);
    };

    const download = () => {
        const canvas = canvasRef.current;
        const link = document.createElement('a');
        link.download = 'nixby-noise-tile.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    const cssString = `background-image: url('data:image/png;base64,${canvasRef.current?.toDataURL('image/png').split(',')[1]}');`;

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold mb-4 flex justify-between">
                            Opacity
                            <span className="text-primary">{Math.round(opacity * 100)}%</span>
                        </label>
                        <input type="range" min="0" max="0.5" step="0.01" value={opacity} onChange={(e) => setOpacity(parseFloat(e.target.value))} className="w-full accent-primary" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-4 flex justify-between">
                            Intensity
                            <span className="text-primary">{Math.round(intensity * 100)}%</span>
                        </label>
                        <input type="range" min="0" max="1" step="0.1" value={intensity} onChange={(e) => setIntensity(parseFloat(e.target.value))} className="w-full accent-primary" />
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => setMonochrome(!monochrome)}
                            className={`flex-1 py-3 rounded-xl border-2 font-bold transition-all ${monochrome ? 'bg-primary/5 border-primary/20 text-primary' : 'bg-sidebar border-border text-text-secondary'}`}
                        >
                            Monochrome Noise
                        </button>
                        <button
                            onClick={generate}
                            className="p-3 bg-surface border-2 border-border rounded-xl hover:bg-white transition-all"
                        >
                            <RefreshCw size={24} className="text-text-secondary" />
                        </button>
                    </div>
                </div>

                <div className="p-6 bg-sidebar rounded-2xl border border-border border-dashed space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase text-text-secondary tracking-widest">CSS Background Tool</span>
                        <button
                            onClick={() => navigator.clipboard.writeText(cssString)}
                            className="text-primary text-[10px] font-black uppercase tracking-widest underline"
                        >
                            Copy CSS
                        </button>
                    </div>
                    <div className="font-mono text-[9px] text-text-secondary bg-white p-3 rounded-lg max-h-24 overflow-y-auto break-all">
                        {cssString}
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <h3 className="text-sm font-bold text-text-primary px-1">Tiling Preview</h3>
                <div
                    className="h-80 rounded-3xl border- border-white shadow-soft relative overflow-hidden flex items-center justify-center"
                    style={{ backgroundColor: '#F1F5F9' }}
                >
                    {/* The noise tile being applied as background to show seamlessness */}
                    <div
                        className="absolute inset-0 transition-opacity duration-300"
                        style={{
                            backgroundImage: canvasRef.current ? `url(${canvasRef.current.toDataURL()})` : 'none',
                            backgroundRepeat: 'repeat'
                        }}
                    />
                    <div className="relative z-10 bg-white/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/50 shadow-sm">
                        <p className="text-xs font-black text-slate-600 uppercase tracking-widest">Procedural Grain</p>
                    </div>
                </div>

                <button
                    onClick={download}
                    className="w-full py-4 bg-primary text-white rounded-2xl font-bold hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3"
                >
                    <Download size={20} />
                    Download Noise Tile (PNG)
                </button>

                <canvas ref={canvasRef} style={{ display: 'none' }} />
            </div>
        </div>
    );
}
