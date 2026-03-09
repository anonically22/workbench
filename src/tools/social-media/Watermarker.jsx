import { useState, useRef, useEffect } from 'react';
import { Upload, Download, Type, Grid3X3, Sun } from 'lucide-react';

export default function Watermarker() {
    const [image, setImage] = useState(null);
    const [text, setText] = useState('© Nixon');
    const [position, setPosition] = useState('bottom-right');
    const [opacity, setOpacity] = useState(0.5);
    const [fontSize, setFontSize] = useState(4); // % of width
    const [color, setColor] = useState('#FFFFFF');
    const canvasRef = useRef(null);

    const POSITIONS = [
        'top-left', 'top-center', 'top-right',
        'middle-left', 'middle-center', 'middle-right',
        'bottom-left', 'bottom-center', 'bottom-right'
    ];

    useEffect(() => {
        if (image) {
            draw();
        }
    }, [image, text, position, opacity, fontSize, color]);

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

        canvas.width = image.width;
        canvas.height = image.height;

        ctx.drawImage(image, 0, 0);

        ctx.globalAlpha = opacity;
        ctx.fillStyle = color;

        const size = (canvas.width * fontSize) / 100;
        ctx.font = `bold ${size}px Inter, sans-serif`;

        const margin = canvas.width * 0.05;
        const textWidth = ctx.measureText(text).width;

        let x, y;

        // Horiz
        if (position.includes('left')) x = margin;
        else if (position.includes('center')) x = (canvas.width - textWidth) / 2;
        else if (position.includes('right')) x = canvas.width - textWidth - margin;

        // Vert
        if (position.includes('top')) y = margin + size;
        else if (position.includes('middle')) y = (canvas.height + size) / 2;
        else if (position.includes('bottom')) y = canvas.height - margin;

        ctx.fillText(text, x, y);
        ctx.globalAlpha = 1.0;
    };

    const download = () => {
        const canvas = canvasRef.current;
        const link = document.createElement('a');
        link.download = `nixby-watermarked.png`;
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
                        <span className="text-xs font-medium text-text-secondary">Image to protect</span>
                        <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
                    </label>
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">2. Watermark Text</label>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full p-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none"
                        placeholder="© Your Name"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">3. Position</label>
                    <div className="grid grid-cols-3 gap-1 bg-border p-1 rounded-lg w-fit mx-auto">
                        {POSITIONS.map(p => (
                            <button
                                key={p}
                                onClick={() => setPosition(p)}
                                className={`w-10 h-10 rounded flex items-center justify-center transition-all ${position === p ? 'bg-primary text-white shadow-sm' : 'bg-surface text-text-secondary hover:bg-sidebar'
                                    }`}
                                title={p}
                            >
                                <div className={`w-2 h-2 rounded-full ${position === p ? 'bg-white' : 'bg-border'}`} />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold mb-2">Opacity</label>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={opacity}
                            onChange={(e) => setOpacity(parseFloat(e.target.value))}
                            className="w-full accent-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Text Size</label>
                        <input
                            type="range"
                            min="1"
                            max="20"
                            step="0.5"
                            value={fontSize}
                            onChange={(e) => setFontSize(parseFloat(e.target.value))}
                            className="w-full accent-primary"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">Color</label>
                    <div className="flex gap-2">
                        <button onClick={() => setColor('#FFFFFF')} className={`w-8 h-8 rounded-full border-2 ${color === '#FFFFFF' ? 'border-primary' : 'border-transparent'} bg-white shadow-sm`} />
                        <button onClick={() => setColor('#000000')} className={`w-8 h-8 rounded-full border-2 ${color === '#000000' ? 'border-primary' : 'border-transparent'} bg-black shadow-sm`} />
                        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-8 h-8 rounded-full border-none cursor-pointer overflow-hidden bg-transparent" />
                    </div>
                </div>
            </div>

            <div className="lg:col-span-2 flex flex-col gap-6">
                <div className="bg-sidebar rounded-xl border-2 border-dashed border-border p-4 flex items-center justify-center min-h-[400px]">
                    {image ? (
                        <canvas
                            ref={canvasRef}
                            className="max-w-full max-h-[500px] h-auto w-auto shadow-2xl rounded-sm"
                        />
                    ) : (
                        <div className="text-center space-y-3 opacity-50">
                            <Sun size={48} className="mx-auto" />
                            <p className="text-sm font-medium">Upload an image to preview watermark</p>
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
                        Save Image
                    </button>
                </div>
            </div>
        </div>
    );
}
