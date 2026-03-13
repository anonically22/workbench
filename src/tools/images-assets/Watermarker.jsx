import React, { useState, useRef, useEffect } from 'react';
import { Upload, Download, Type, Image as ImageIcon, Settings2, Sliders } from 'lucide-react';

export default function Watermarker() {
    const [image, setImage] = useState(null);
    const [watermarkType, setWatermarkType] = useState('text'); // text or image
    
    // Text watermark settings
    const [text, setText] = useState('CONFIDENTIAL');
    const [fontSize, setFontSize] = useState(48);
    const [textColor, setTextColor] = useState('#ffffff');
    const [opacity, setOpacity] = useState(0.5);
    const [rotation, setRotation] = useState(-30);
    const [pattern, setPattern] = useState(true); // Single vs repeated pattern
    
    // Image watermark
    const [watermarkImg, setWatermarkImg] = useState(null);
    const [wmScale, setWmScale] = useState(0.2); // proportional to base image

    const canvasRef = useRef(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const img = new Image();
            img.onload = () => setImage(img);
            img.src = URL.createObjectURL(file);
        }
    };

    const handleWatermarkUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const img = new Image();
            img.onload = () => setWatermarkImg(img);
            img.src = URL.createObjectURL(file);
        }
    };

    useEffect(() => {
        if (!image || !canvasRef.current) return;
        drawWatermark();
    }, [image, watermarkType, text, fontSize, textColor, opacity, rotation, pattern, watermarkImg, wmScale]);

    const drawWatermark = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        canvas.width = image.width;
        canvas.height = image.height;
        
        // Draw base image
        ctx.drawImage(image, 0, 0);

        ctx.globalAlpha = opacity;
        
        // Draw Watermark
        if (watermarkType === 'text') {
            const scaledFontSize = (fontSize / 1000) * canvas.width; // scale font relative to image size
            ctx.font = `600 ${scaledFontSize}px sans-serif`;
            ctx.fillStyle = textColor;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            if (pattern) {
                // Determine spacing based on text length and angle
                const stepX = scaledFontSize * text.length * 0.8;
                const stepY = scaledFontSize * 3;
                
                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.rotate((rotation * Math.PI) / 180);
                
                // Draw a grid of text
                for (let x = -canvas.width * 2; x < canvas.width * 2; x += stepX) {
                    for (let y = -canvas.height * 2; y < canvas.height * 2; y += stepY) {
                        ctx.fillText(text, x, y);
                    }
                }
                
                // Reset transform
                ctx.setTransform(1, 0, 0, 1, 0, 0);
            } else {
                // Just center one
                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.rotate((rotation * Math.PI) / 180);
                ctx.fillText(text, 0, 0);
                ctx.setTransform(1, 0, 0, 1, 0, 0);
            }
        } else if (watermarkType === 'image' && watermarkImg) {
            
            const wWidth = canvas.width * wmScale;
            const wHeight = watermarkImg.height * (wWidth / watermarkImg.width);
            
            if (pattern) {
                const stepX = wWidth * 2;
                const stepY = wHeight * 2;
                
                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.rotate((rotation * Math.PI) / 180);
                
                for (let x = -canvas.width * 2; x < canvas.width * 2; x += stepX) {
                    for (let y = -canvas.height * 2; y < canvas.height * 2; y += stepY) {
                        ctx.drawImage(watermarkImg, x - (wWidth/2), y - (wHeight/2), wWidth, wHeight);
                    }
                }
                ctx.setTransform(1, 0, 0, 1, 0, 0);
            } else {
                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.rotate((rotation * Math.PI) / 180);
                ctx.drawImage(watermarkImg, -wWidth / 2, -wHeight / 2, wWidth, wHeight);
                ctx.setTransform(1, 0, 0, 1, 0, 0);
            }
        }
        
        ctx.globalAlpha = 1.0;
    };

    const handleDownload = () => {
        if (!canvasRef.current) return;
        setIsGenerating(true);
        setTimeout(() => {
            const link = document.createElement('a');
            link.download = `watermarked-${Date.now()}.jpg`;
            link.href = canvasRef.current.toDataURL('image/jpeg', 0.9);
            link.click();
            setIsGenerating(false);
        }, 300);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Controls Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white border-4 border-black p-6 brutalist-shadow flex flex-col gap-6">
                        
                        {!image ? (
                             <label className="block border-2 border-dashed border-black bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer p-8 text-center relative group">
                                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-12 h-12 bg-accent text-white border-2 border-black flex items-center justify-center brutalist-shadow group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                                        <ImageIcon size={24} />
                                    </div>
                                    <span className="font-bold uppercase tracking-widest text-sm">Upload Image</span>
                                </div>
                            </label>
                        ) : (
                            <div className="flex justify-between items-center border-b-2 border-black pb-4">
                                <span className="font-bold uppercase tracking-widest text-sm">Base Image Uploaded</span>
                                <button onClick={() => setImage(null)} className="text-xs font-bold text-red-500 uppercase tracking-widest hover:underline">Remove</button>
                            </div>
                        )}

                        <div className="space-y-4">
                            <label className="block text-xs font-black uppercase tracking-widest text-black flex items-center gap-2">
                                <Settings2 size={16} /> Watermark Type
                            </label>
                            <div className="flex bg-slate-100 border-2 border-black p-1">
                                <button 
                                    className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${watermarkType === 'text' ? 'bg-black text-white' : 'text-slate-500 hover:text-black'}`}
                                    onClick={() => setWatermarkType('text')}
                                >
                                    Text Mode
                                </button>
                                <button 
                                    className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${watermarkType === 'image' ? 'bg-black text-white' : 'text-slate-500 hover:text-black'}`}
                                    onClick={() => setWatermarkType('image')}
                                >
                                    Image Overlay
                                </button>
                            </div>
                        </div>

                        {/* Text Controls */}
                        {watermarkType === 'text' && (
                            <div className="space-y-5 animate-in fade-in slide-in-from-left-2">
                                <div className="space-y-2">
                                    <label className="block text-xs font-black uppercase tracking-widest text-black">Text</label>
                                    <input 
                                        type="text" 
                                        value={text} 
                                        onChange={e => setText(e.target.value)} 
                                        className="w-full border-2 border-black p-3 font-bold bg-white focus:outline-none focus:ring-4 focus:ring-accent/20"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-xs font-black uppercase tracking-widest text-black flex justify-between">
                                        Font Size <span>{fontSize}</span>
                                    </label>
                                    <input 
                                        type="range" min="10" max="200" 
                                        value={fontSize} onChange={e => setFontSize(Number(e.target.value))}
                                        className="w-full accent-black h-2 bg-slate-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-xs font-black uppercase tracking-widest text-black">Color</label>
                                    <div className="flex gap-2">
                                        <input 
                                            type="color" value={textColor} 
                                            onChange={e => setTextColor(e.target.value)}
                                            className="w-10 h-10 border-2 border-black cursor-pointer p-0"
                                        />
                                        <input 
                                            type="text" value={textColor} readOnly
                                            className="flex-1 border-2 border-black px-3 font-mono text-sm uppercase bg-slate-50 outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Image Controls */}
                        {watermarkType === 'image' && (
                            <div className="space-y-5 animate-in fade-in slide-in-from-right-2">
                                <label className="block border-2 border-black bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer p-4 text-center cursor-pointer">
                                    <input type="file" accept="image/png,image/svg+xml" onChange={handleWatermarkUpload} className="hidden" />
                                    <span className="font-bold uppercase tracking-widest text-xs">{watermarkImg ? 'Watermark Selected ✓' : 'Upload PNG/SVG Watermark'}</span>
                                </label>
                                {watermarkImg && (
                                    <div className="space-y-2">
                                        <label className="block text-xs font-black uppercase tracking-widest text-black flex justify-between">
                                            Scale <span>{(wmScale * 100).toFixed(0)}%</span>
                                        </label>
                                        <input 
                                            type="range" min="0.05" max="1" step="0.05"
                                            value={wmScale} onChange={e => setWmScale(Number(e.target.value))}
                                            className="w-full accent-black h-2 bg-slate-200"
                                        />
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Global Settings */}
                        <div className="space-y-5 pt-4 border-t-2 border-black border-dashed">
                             <div className="space-y-2">
                                <label className="block text-xs font-black uppercase tracking-widest text-black flex justify-between">
                                    Opacity <span>{opacity}</span>
                                </label>
                                <input 
                                    type="range" min="0.05" max="1" step="0.05"
                                    value={opacity} onChange={e => setOpacity(Number(e.target.value))}
                                    className="w-full accent-black h-2 bg-slate-200"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-xs font-black uppercase tracking-widest text-black flex justify-between">
                                    Rotation <span>{rotation}°</span>
                                </label>
                                <input 
                                    type="range" min="-90" max="90" step="5"
                                    value={rotation} onChange={e => setRotation(Number(e.target.value))}
                                    className="w-full accent-black h-2 bg-slate-200"
                                />
                            </div>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={pattern} 
                                    onChange={e => setPattern(e.target.checked)}
                                    className="w-5 h-5 accent-black border-2 border-black rounded-none"
                                />
                                <span className="text-xs font-bold uppercase tracking-widest">Repeat as Pattern</span>
                            </label>
                        </div>
                        
                        <button
                            onClick={handleDownload}
                            disabled={!image || isGenerating || (watermarkType === 'image' && !watermarkImg)}
                            className="w-full h-14 mt-4 bg-accent text-white font-black uppercase tracking-widest border-2 border-black flex items-center justify-center gap-2 brutalist-shadow hover:-translate-y-1 hover:-translate-x-1 active:translate-y-0 active:translate-x-0 transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:translate-x-0"
                        >
                            {isGenerating ? 'PROCESSING...' : 'DOWNLOAD RESULT'}
                            <Download size={20} />
                        </button>
                    </div>
                </div>

                {/* Live Preview */}
                <div className="lg:col-span-2 bg-slate-50 border-4 border-black p-4 flex items-center justify-center relative min-h-[500px]">
                    <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 font-bold text-[10px] tracking-widest uppercase shadow-sm z-10 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                        Live Preview
                    </div>
                    {!image ? (
                        <div className="text-center opacity-30 select-none">
                            <span className="material-symbols-outlined text-6xl block mb-2">image_not_supported</span>
                            <span className="font-bold uppercase tracking-widest text-sm">Waiting for upload</span>
                        </div>
                    ) : (
                        <canvas ref={canvasRef} className="max-w-full max-h-[70vh] object-contain border border-black/10 shadow-lg bg-cover bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZTVlNWU1Ii8+CjxyZWN0IHg9IjQiIHk9IjQiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNlNWU1ZTUiLz4KPC9zdmc+')] " />
                    )}
                </div>
            </div>
        </div>
    );
}
