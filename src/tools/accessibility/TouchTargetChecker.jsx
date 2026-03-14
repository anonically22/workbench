import React, { useState, useRef, useEffect } from 'react';
import { Upload, Hand, MonitorSmartphone, Target } from 'lucide-react';

export default function TouchTargetChecker() {
    const [image, setImage] = useState(null);
    const [targetSize, setTargetSize] = useState(48); // 48px is Google's rec, 44px is Apple's
    const [scale, setScale] = useState(1);
    
    // For custom cursor overlay
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    
    const containerRef = useRef(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const img = new Image();
            img.onload = () => setImage(img);
            img.src = URL.createObjectURL(file);
        }
    };

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Control Panel */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white border-4 border-black p-6 brutalist-shadow">
                
                <div className="md:col-span-3">
                     <label className="block border-2 border-dashed border-black bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer p-8 text-center relative group">
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-12 h-12 bg-accent text-white border-2 border-black flex items-center justify-center brutalist-shadow group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                                <Upload size={24} />
                            </div>
                            <span className="font-bold uppercase tracking-widest text-sm">Upload UI Screenshot</span>
                            <span className="text-xs font-bold opacity-50 block max-w-sm mx-auto leading-relaxed">
                                Ensure your screenshot is captured at 1x scale (actual size) for accurate touch target measurement.
                            </span>
                        </div>
                    </label>
                </div>

                <div className="space-y-4 md:col-span-2">
                    <label className="block text-xs font-black uppercase tracking-widest text-black flex justify-between">
                         Target Standard <span>{targetSize}px</span>
                    </label>
                    <div className="flex gap-4">
                        {[
                            { label: 'Apple (44px)', value: 44 },
                            { label: 'Google (48px)', value: 48 },
                            { label: 'Desktop (32px)', value: 32 }
                        ].map(std => (
                            <button
                                key={std.value}
                                onClick={() => setTargetSize(std.value)}
                                className={`flex-1 py-3 border-2 border-black font-bold uppercase tracking-wider text-xs transition-colors ${targetSize === std.value ? 'bg-black text-white' : 'bg-white text-black hover:bg-slate-100'}`}
                            >
                                {std.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                     <label className="block text-xs font-black uppercase tracking-widest text-black flex justify-between">
                         Image Zoom <span>{Math.round(scale * 100)}%</span>
                     </label>
                     <input 
                        type="range" 
                        min="0.5" max="3" step="0.1"
                        value={scale} 
                        onChange={e => setScale(Number(e.target.value))}
                        className="w-full accent-black h-2 bg-slate-200 rounded-none appearance-none cursor-pointer"
                     />
                     <div className="flex justify-between text-[10px] font-bold text-slate-400">
                         <span>50%</span>
                         <span>300%</span>
                     </div>
                </div>
            </div>

            {/* Interactive Preview Panel */}
            <div className="bg-slate-100 border-4 border-black p-4 flex flex-col items-center overflow-hidden min-h-[500px] relative w-full">
                
                <div className="absolute top-4 left-4 bg-white border-2 border-black px-4 py-2 flex items-center gap-3 brutalist-shadow-sm z-10 w-48 text-center text-xs font-bold uppercase tracking-widest">
                    <Target size={16} className="text-red-500" /> Hover over buttons
                </div>

                {!image ? (
                    <div className="h-full w-full flex items-center justify-center opacity-40 mt-32">
                        <p className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                            <Hand size={20} /> Awaiting UI Screenshot
                        </p>
                    </div>
                ) : (
                    <div 
                        ref={containerRef}
                        className="relative cursor-none overflow-hidden border border-black/20 shadow-xl inline-block mt-8 max-w-full max-h-[70vh] overflow-y-auto"
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        style={{ cursor: 'none' }}
                    >
                        <img 
                            src={image.src} 
                            alt="UI Check" 
                            style={{ 
                                transform: `scale(${scale})`, 
                                transformOrigin: 'top left',
                                maxWidth: 'none', // Allow scrolling
                                width: image.width,
                                height: image.height
                            }} 
                        />
                        
                        {/* Custom Touch Target Cursor */}
                        {isHovering && (
                            <div 
                                className="absolute pointer-events-none z-50 rounded-full border border-red-500 bg-red-500/20 mix-blend-multiply transition-none flex items-center justify-center"
                                style={{
                                    width: targetSize * scale,
                                    height: targetSize * scale,
                                    left: mousePos.x - ((targetSize * scale) / 2),
                                    top: mousePos.y - ((targetSize * scale) / 2),
                                }}
                            >
                                <div className="w-1 h-1 bg-red-600 rounded-full" />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
