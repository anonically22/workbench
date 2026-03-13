import React, { useState, useEffect } from 'react';
import { Upload, Download, Columns, Image as ImageIcon } from 'lucide-react';

export default function SeamlessScrollGenerator() {
    const [image, setImage] = useState(null);
    const [slicesCount, setSlicesCount] = useState(3);
    const [slices, setSlices] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);
    
    // Default Aspect Ratio tracking for info
    const [aspectRatio, setAspectRatio] = useState("");

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const img = new Image();
            img.onload = () => {
                setImage(img);
                generateSlices(img, slicesCount);
            };
            img.src = URL.createObjectURL(file);
        }
    };

    const generateSlices = (img, count) => {
        setIsGenerating(true);
        const newSlices = [];
        const sliceWidth = img.width / count;
        const sliceHeight = img.height;
        
        const ratio = (sliceWidth / sliceHeight).toFixed(2);
        if (ratio === "1.00") setAspectRatio("1:1 (Square)");
        else if (ratio === "0.80") setAspectRatio("4:5 (Portrait)");
        else setAspectRatio(`${ratio}:1`);

        for (let i = 0; i < count; i++) {
            const canvas = document.createElement('canvas');
            canvas.width = sliceWidth;
            canvas.height = sliceHeight;
            const ctx = canvas.getContext('2d');
            
            ctx.drawImage(
                img, 
                i * sliceWidth, 0, sliceWidth, sliceHeight,
                0, 0, sliceWidth, sliceHeight
            );
            newSlices.push(canvas.toDataURL('image/png', 0.9));
        }
        
        setSlices(newSlices);
        setIsGenerating(false);
    };

    useEffect(() => {
        if (image) generateSlices(image, slicesCount);
    }, [slicesCount]);

    const downloadSlice = (dataUrl, index) => {
        const link = document.createElement('a');
        link.download = `seamless-slice-${index + 1}.png`;
        link.href = dataUrl;
        link.click();
    };

    const downloadAll = () => {
        slices.forEach((slice, index) => {
            setTimeout(() => downloadSlice(slice, index), index * 300);
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
                            <span className="font-bold uppercase tracking-widest text-sm">Upload Wide Panorama</span>
                            <span className="text-xs font-bold opacity-50 block max-w-sm mx-auto leading-relaxed">
                                Upload a wide image to split perfectly into seamless Instagram or LinkedIn carousel slides.
                            </span>
                        </div>
                    </label>
                </div>

                <div className="space-y-4">
                    <label className="block text-xs font-black uppercase tracking-widest text-black flex items-center gap-2">
                        <Columns size={16} /> Number of Slices
                    </label>
                    <input 
                        type="range" 
                        min="2" max="10" step="1"
                        value={slicesCount} 
                        onChange={e => setSlicesCount(Number(e.target.value))}
                        className="w-full accent-black h-2 bg-slate-200 rounded-none appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xl font-black">
                        <span>{slicesCount}</span>
                        <span className="text-xs uppercase opacity-40 translate-y-2">MAX 10</span>
                    </div>
                </div>

                <div className="space-y-4">
                     <label className="block text-xs font-black uppercase tracking-widest text-black flex items-center gap-2">
                        <ImageIcon size={16} /> Output Info
                     </label>
                     <div className="bg-slate-50 p-4 border-2 border-slate-200 flex flex-col gap-2">
                         <div className="flex justify-between">
                            <span className="text-xs font-bold opacity-50 uppercase tracking-widest">Base Image</span>
                            <span className="text-xs font-bold font-mono">{image ? `${image.width} × ${image.height}` : '—'}</span>
                         </div>
                         <div className="flex justify-between">
                            <span className="text-xs font-bold opacity-50 uppercase tracking-widest">Slice Ratio</span>
                            <span className="text-xs font-bold font-mono">{aspectRatio || '—'}</span>
                         </div>
                     </div>
                </div>

                <div className="space-y-4 flex flex-col justify-end">
                     <button
                        onClick={downloadAll}
                        disabled={slices.length === 0 || isGenerating}
                        className="w-full h-12 bg-black text-white font-black uppercase tracking-widest border-2 border-black flex items-center justify-center gap-2 brutalist-shadow hover:-translate-y-1 hover:-translate-x-1 active:translate-y-0 active:translate-x-0 transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:translate-x-0"
                     >
                        DOWNLOAD ALL ({slicesCount})
                        <Download size={18} />
                     </button>
                </div>
            </div>

            {/* Preview Panel */}
            <div className="bg-slate-50 border-4 border-black p-6 min-h-[400px]">
                {!image ? (
                    <div className="h-full w-full flex items-center justify-center opacity-40">
                        <p className="text-sm font-bold uppercase tracking-widest">Slices will appear here</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-8">
                        <div className="flex items-center justify-between border-b-2 border-black pb-4">
                            <h3 className="text-xl font-black uppercase tracking-widest">Generated Slices</h3>
                            <button onClick={() => setImage(null)} className="text-xs font-bold uppercase tracking-widest opacity-50 hover:opacity-100 hover:text-red-500 transition-colors">Clear</button>
                        </div>
                        
                        <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${Math.min(slicesCount, 5)}, minmax(0, 1fr))` }}>
                            {slices.map((slice, index) => (
                                <div key={index} className="flex flex-col gap-3 group relative">
                                    <div className="relative border-2 border-black brutalist-shadow-sm bg-cover bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZTVlNWU1Ii8+CjxyZWN0IHg9IjQiIHk9IjQiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNlNWU1ZTUiLz4KPC9zdmc+')]">
                                        <img src={slice} alt={`Slice ${index + 1}`} className="w-full object-contain" />
                                        
                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                            <button 
                                                onClick={() => downloadSlice(slice, index)}
                                                className="bg-white text-black p-3 font-bold uppercase text-xs border-2 border-black flex items-center gap-2 hover:bg-accent hover:text-white transition-colors brutalist-shadow-sm"
                                            >
                                                <Download size={16} /> Save
                                            </button>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-center">Slide {index + 1}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
