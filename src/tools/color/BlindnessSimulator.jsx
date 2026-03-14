import { useState, useRef } from 'react';
import { Upload, Eye, EyeOff, Info } from 'lucide-react';

const DEFICIENCIES = [
    { id: 'none', name: 'Normal Vision', desc: 'No impairment', filter: null },
    { id: 'protanopia', name: 'Protanopia', desc: 'No red (1% of males)', filter: 'url(#protanopia)' },
    { id: 'deuteranopia', name: 'Deuteranopia', desc: 'No green (1% of males)', filter: 'url(#deuteranopia)' },
    { id: 'tritanopia', name: 'Tritanopia', desc: 'No blue (<0.1%)', filter: 'url(#tritanopia)' },
    { id: 'achromatopsia', name: 'Achromatopsia', desc: 'Total color blindness', filter: 'url(#achromatopsia)' }
];

export default function BlindnessSimulator() {
    const [image, setImage] = useState(null);
    const [activeFilter, setActiveFilter] = useState('none');
    const [showComparison, setShowComparison] = useState(false);

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => setImage(event.target.result);
            reader.readAsDataURL(file);
        }
    };

    const currentDesc = DEFICIENCIES.find(d => d.id === activeFilter);

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* SVG Filters Hidden Definition */}
            <svg style={{ display: 'none' }}>
                <defs>
                    <filter id="protanopia">
                        <feColorMatrix type="matrix" values="0.567, 0.433, 0, 0, 0, 0.558, 0.442, 0, 0, 0, 0, 0.242, 0.758, 0, 0, 0, 0, 0, 1, 0" />
                    </filter>
                    <filter id="deuteranopia">
                        <feColorMatrix type="matrix" values="0.625, 0.375, 0, 0, 0, 0.7, 0.3, 0, 0, 0, 0, 0.3, 0.7, 0, 0, 0, 0, 0, 1, 0" />
                    </filter>
                    <filter id="tritanopia">
                        <feColorMatrix type="matrix" values="0.95, 0.05, 0, 0, 0, 0, 0.433, 0.567, 0, 0, 0, 0.475, 0.525, 0, 0, 0, 0, 0, 1, 0" />
                    </filter>
                    <filter id="achromatopsia">
                        <feColorMatrix type="matrix" values="0.299, 0.587, 0.114, 0, 0, 0.299, 0.587, 0.114, 0, 0, 0.299, 0.587, 0.114, 0, 0, 0, 0, 0, 1, 0" />
                    </filter>
                </defs>
            </svg>

            <div className="lg:col-span-1 space-y-6">
                <div>
                    <label className="block text-sm font-semibold mb-2">1. Upload UI/Image</label>
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-xl hover:bg-sidebar transition-all cursor-pointer group">
                        <Upload className="text-text-secondary group-hover:text-primary mb-2" />
                        <span className="text-xs font-medium text-text-secondary text-center px-4">Upload a screenshot of your design</span>
                        <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
                    </label>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-semibold mb-2">2. Select Deficiency</label>
                    {DEFICIENCIES.map((d) => (
                        <button
                            key={d.id}
                            onClick={() => setActiveFilter(d.id)}
                            className={`w-full p-4 rounded-xl border text-left transition-all ${activeFilter === d.id ? 'bg-primary border-primary shadow-md' : 'bg-surface border-border hover:bg-sidebar'
                                }`}
                        >
                            <p className={`text-sm font-bold ${activeFilter === d.id ? 'text-white' : 'text-text-primary'}`}>{d.name}</p>
                            <p className={`text-[10px] ${activeFilter === d.id ? 'text-white/70' : 'text-text-secondary'}`}>{d.desc}</p>
                        </button>
                    ))}
                </div>

                <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 flex gap-3">
                    <Info size={16} className="text-primary shrink-0 mt-0.5" />
                    <p className="text-[10px] text-text-secondary leading-relaxed">
                        Color ignorance affects ~8% of males. Testing your palettes ensures your design is truly inclusive.
                    </p>
                </div>
            </div>

            <div className="lg:col-span-3 flex flex-col gap-6">
                <div className="flex justify-between items-center bg-sidebar p-2 rounded-xl border border-border">
                    <div className="flex gap-1">
                        <button
                            onClick={() => setShowComparison(false)}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${!showComparison ? 'bg-white shadow-sm text-primary' : 'text-text-secondary hover:text-text-primary'}`}
                        >
                            Deficiency Only
                        </button>
                        <button
                            onClick={() => setShowComparison(true)}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${showComparison ? 'bg-white shadow-sm text-primary' : 'text-text-secondary hover:text-text-primary'}`}
                        >
                            Compare Side-by-Side
                        </button>
                    </div>
                    <div className="flex items-center gap-2 px-3 text-[10px] font-black text-primary uppercase tracking-widest">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        Live Filter: {currentDesc.name}
                    </div>
                </div>

                <div className={`grid ${showComparison ? 'grid-cols-2' : 'grid-cols-1'} gap-4 flex-1`}>
                    {showComparison && (
                        <div className="bg-sidebar rounded-2xl border border-border p-4 flex flex-col items-center justify-center relative min-h-[400px]">
                            <span className="absolute top-6 left-6 text-[10px] font-black uppercase text-text-secondary bg-white px-2 py-1 rounded shadow-sm">Original</span>
                            {image ? (
                                <img src={image} className="max-w-full max-h-full object-contain rounded-lg shadow-soft" alt="Original" />
                            ) : (
                                <EyeOff className="text-border" size={48} />
                            )}
                        </div>
                    )}
                    <div className="bg-sidebar rounded-2xl border border-border p-4 flex flex-col items-center justify-center relative min-h-[400px]">
                        <span className="absolute top-6 left-6 text-[10px] font-black uppercase text-primary bg-white px-2 py-1 rounded shadow-sm">{currentDesc.name}</span>
                        {image ? (
                            <img
                                src={image}
                                style={{ filter: DEFICIENCIES.find(d => d.id === activeFilter).filter }}
                                className="max-w-full max-h-full object-contain rounded-lg shadow-soft transition-all duration-300"
                                alt="Impaled"
                            />
                        ) : (
                            <Eye className="text-border" size={48} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
