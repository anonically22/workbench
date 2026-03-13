import React, { useState, useRef, useEffect } from 'react';
import { Upload, Download, Laptop, Smartphone, Monitor, Palette } from 'lucide-react';

export default function MockupFrameGenerator() {
    const [image, setImage] = useState(null);
    const [frameType, setFrameType] = useState('browser'); // browser, macos, phone
    const [padding, setPadding] = useState(64);
    const [bgColor, setBgColor] = useState('#e2e8f0');
    const [isGenerating, setIsGenerating] = useState(false);
    const canvasRef = useRef(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const img = new Image();
            img.onload = () => setImage(img);
            img.src = URL.createObjectURL(file);
        }
    };

    useEffect(() => {
        if (!image || !canvasRef.current) return;
        drawMockup();
    }, [image, frameType, padding, bgColor]);

    const drawMockup = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        // Calculate dimensions based on frame type
        let framePaddingX = 0;
        let framePaddingTop = 0;
        let framePaddingBottom = 0;
        let cornerRadius = 0;

        if (frameType === 'browser' || frameType === 'macos') {
            framePaddingX = 0;
            framePaddingTop = 40;
            framePaddingBottom = 0;
            cornerRadius = 8;
        } else if (frameType === 'phone') {
            framePaddingX = 16;
            framePaddingTop = 48;
            framePaddingBottom = 48;
            cornerRadius = 32;
        }

        const contentWidth = frameType === 'phone' ? Math.min(image.width, 400) : image.width;
        const contentHeight = image.height * (contentWidth / image.width);

        const frameWidth = contentWidth + (framePaddingX * 2);
        const frameHeight = contentHeight + framePaddingTop + framePaddingBottom;

        canvas.width = frameWidth + (padding * 2);
        canvas.height = frameHeight + (padding * 2);

        // Draw Background
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw Frame Shadow
        ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
        ctx.shadowBlur = 30;
        ctx.shadowOffsetY = 15;

        const frameX = padding;
        const frameY = padding;

        // Draw Frame Background
        ctx.beginPath();
        ctx.roundRect(frameX, frameY, frameWidth, frameHeight, cornerRadius);
        ctx.fillStyle = '#ffffff';
        if (frameType === 'macos') ctx.fillStyle = '#1e1e1e';
        ctx.fill();
        ctx.shadowColor = 'transparent'; // Reset shadow

        // Draw Top Bar (Browser/MacOS)
        if (frameType === 'browser') {
            ctx.fillStyle = '#f1f5f9';
            ctx.beginPath();
            ctx.roundRect(frameX, frameY, frameWidth, framePaddingTop, [cornerRadius, cornerRadius, 0, 0]);
            ctx.fill();
            
            // Traffic Light Dots
            const dotY = frameY + (framePaddingTop / 2);
            ['#ef4444', '#f59e0b', '#22c55e'].forEach((color, i) => {
                ctx.beginPath();
                ctx.arc(frameX + 20 + (i * 20), dotY, 6, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.fill();
            });
        } else if (frameType === 'macos') {
            const dotY = frameY + (framePaddingTop / 2);
            ['#ff5f56', '#ffbd2e', '#27c93f'].forEach((color, i) => {
                ctx.beginPath();
                ctx.arc(frameX + 20 + (i * 20), dotY, 6, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.fill();
            });
        }

        // Clip and Draw Core Image
        ctx.save();
        ctx.beginPath();
        
        if (frameType === 'phone') {
             ctx.roundRect(frameX + framePaddingX, frameY + framePaddingTop, contentWidth, contentHeight, 8);
        } else {
             ctx.roundRect(frameX, frameY + framePaddingTop, contentWidth, contentHeight, [0, 0, cornerRadius, cornerRadius]);
        }
        ctx.clip();
        ctx.drawImage(image, frameX + framePaddingX, frameY + framePaddingTop, contentWidth, contentHeight);
        ctx.restore();

        // Phone Notch / details
        if (frameType === 'phone') {
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.roundRect(frameX + (frameWidth / 2) - 30, frameY + 8, 60, 20, 10);
            ctx.fill();
        }
    };

    const handleDownload = () => {
        if (!canvasRef.current) return;
        setIsGenerating(true);
        setTimeout(() => {
            const link = document.createElement('a');
            link.download = `mockup-${Date.now()}.png`;
            link.href = canvasRef.current.toDataURL('image/png');
            link.click();
            setIsGenerating(false);
        }, 500);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Control Panel */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-white border-4 border-black p-6 brutalist-shadow">
                <div className="md:col-span-4 space-y-4">
                     <label className="block border-2 border-dashed border-black bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer p-8 text-center relative group">
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-12 h-12 bg-accent text-white border-2 border-black flex items-center justify-center brutalist-shadow group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                                <Upload size={24} />
                            </div>
                            <span className="font-bold uppercase tracking-widest text-sm">Upload Screenshot</span>
                        </div>
                    </label>
                </div>

                <div className="space-y-4">
                    <label className="block text-xs font-black uppercase tracking-widest text-black">Frame Type</label>
                    <div className="flex flex-col gap-2">
                        {['browser', 'macos', 'phone'].map(type => (
                            <button
                                key={type}
                                onClick={() => setFrameType(type)}
                                className={`px-4 py-3 border-2 border-black font-bold uppercase tracking-wider text-xs flex justify-between items-center transition-colors ${frameType === type ? 'bg-black text-white' : 'bg-white text-black hover:bg-slate-100'}`}
                            >
                                {type}
                                {type === 'browser' && <Monitor size={16} />}
                                {type === 'macos' && <Laptop size={16} />}
                                {type === 'phone' && <Smartphone size={16} />}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                     <label className="block text-xs font-black uppercase tracking-widest text-black flex justify-between tracking-widest">
                         Padding <span>{padding}px</span>
                     </label>
                     <input 
                        type="range" 
                        min="0" max="160" step="16"
                        value={padding} 
                        onChange={e => setPadding(Number(e.target.value))}
                        className="w-full accent-black h-2 bg-slate-200 rounded-none appearance-none cursor-pointer"
                     />
                     <div className="flex justify-between text-[10px] font-bold text-slate-400">
                         <span>0</span>
                         <span>MAX</span>
                     </div>
                </div>

                <div className="space-y-4">
                     <label className="block text-xs font-black uppercase tracking-widest text-black flex items-center gap-2">
                        <Palette size={14} /> Background
                     </label>
                     <div className="grid grid-cols-4 gap-2">
                        {['#e2e8f0', '#fecaca', '#bbf7d0', '#bfdbfe', '#fef08a', '#e9d5ff', '#1e293b', '#ffffff'].map(c => (
                            <button
                                key={c}
                                onClick={() => setBgColor(c)}
                                className={`w-full aspect-square border-2 ${bgColor === c ? 'border-black' : 'border-black/20 hover:border-black/50'}`}
                                style={{ backgroundColor: c }}
                                title={c}
                            />
                        ))}
                     </div>
                </div>

                <div className="space-y-4 flex flex-col justify-end">
                     <button
                        onClick={handleDownload}
                        disabled={!image || isGenerating}
                        className="w-full h-12 bg-accent text-white font-black uppercase tracking-widest border-2 border-black flex items-center justify-center gap-2 brutalist-shadow hover:-translate-y-1 hover:-translate-x-1 active:translate-y-0 active:translate-x-0 transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:translate-x-0"
                     >
                        {isGenerating ? 'GENERATING...' : 'DOWNLOAD'}
                        <Download size={20} />
                     </button>
                </div>
            </div>

            {/* Preview Panel */}
            <div className="bg-slate-50 border-4 border-black p-4 flex items-center justify-center overflow-x-auto min-h-[400px]">
                {!image ? (
                    <p className="text-sm font-bold opacity-40 uppercase tracking-widest">Awaiting Image...</p>
                ) : (
                    <canvas ref={canvasRef} className="max-h-[60vh] max-w-full object-contain border border-black/10 shadow-lg bg-cover bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZTVlNWU1Ii8+CjxyZWN0IHg9IjQiIHk9IjQiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNlNWU1ZTUiLz4KPC9zdmc+')] " />
                )}
            </div>
        </div>
    );
}
