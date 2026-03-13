import React, { useState } from 'react';
import { Upload, Eye, MousePointerClick, MoveRight } from 'lucide-react';

export default function ReadingFlowSimulator() {
    const [image, setImage] = useState(null);
    const [pattern, setPattern] = useState('f-pattern'); // f-pattern, z-pattern
    const [opacity, setOpacity] = useState(0.8);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const img = new Image();
            img.onload = () => setImage(img);
            img.src = URL.createObjectURL(file);
        }
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
                            <span className="font-bold uppercase tracking-widest text-sm">Upload Landing Page Screenshot</span>
                        </div>
                    </label>
                </div>

                <div className="space-y-4 md:col-span-2">
                    <label className="block text-xs font-black uppercase tracking-widest text-black">Scan Pattern</label>
                    <div className="flex gap-4">
                        {[
                            { id: 'f-pattern', label: 'F-Pattern (Text Heavy)', icon: <Eye size={16} /> },
                            { id: 'z-pattern', label: 'Z-Pattern (Landing Pages)', icon: <MoveRight size={16} /> },
                        ].map(pat => (
                            <button
                                key={pat.id}
                                onClick={() => setPattern(pat.id)}
                                className={`flex-1 py-3 px-4 border-2 border-black font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-colors ${pattern === pat.id ? 'bg-black text-white' : 'bg-white text-black hover:bg-slate-100'}`}
                            >
                                {pat.icon} {pat.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                     <label className="block text-xs font-black uppercase tracking-widest text-black flex justify-between">
                         Overlay Intensity <span>{opacity}</span>
                     </label>
                     <input 
                        type="range" 
                        min="0" max="1" step="0.1"
                        value={opacity} 
                        onChange={e => setOpacity(Number(e.target.value))}
                        className="w-full accent-black h-2 bg-slate-200 rounded-none appearance-none cursor-pointer"
                     />
                </div>
            </div>

            {/* Preview Panel */}
            <div className="bg-slate-100 border-4 border-black p-4 flex flex-col items-center overflow-hidden min-h-[500px] relative w-full">
                
                {!image ? (
                    <div className="h-full w-full flex items-center justify-center opacity-40 mt-32">
                        <p className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                            <MousePointerClick size={20} /> Upload a design to see reading flow
                        </p>
                    </div>
                ) : (
                    <div className="relative inline-block border border-black max-w-full">
                        <img 
                            src={image.src} 
                            alt="Reading Flow Base" 
                            className="max-h-[80vh] object-contain block w-full"
                        />
                        
                        {/* Overlay Canvas for patterns */}
                        <div 
                            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                            style={{ opacity }}
                        >
                            {pattern === 'f-pattern' && (
                                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                    <defs>
                                        <linearGradient id="heat" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="rgba(239, 68, 68, 0.8)" />
                                            <stop offset="100%" stopColor="rgba(239, 68, 68, 0)" />
                                        </linearGradient>
                                    </defs>
                                    
                                    {/* Top heavy read */}
                                    <rect x="0" y="5" width="100" height="15" fill="url(#heat)" />
                                    {/* Middle medium read */}
                                    <rect x="0" y="30" width="70" height="12" fill="url(#heat)" />
                                    {/* Lower short reads */}
                                    <rect x="0" y="55" width="40" height="8" fill="url(#heat)" />
                                    <rect x="0" y="70" width="30" height="8" fill="url(#heat)" />
                                    <rect x="0" y="85" width="20" height="8" fill="url(#heat)" />

                                    {/* Flow Arrows */}
                                    <path d="M 5 12 L 80 12" stroke="#fff" strokeWidth="1" strokeDasharray="2 2" fill="none" markerEnd="url(#arrow)" />
                                    <path d="M 5 36 L 60 36" stroke="#fff" strokeWidth="1" strokeDasharray="2 2" fill="none" markerEnd="url(#arrow)" />
                                    <path d="M 5 12 L 5 95" stroke="#fff" strokeWidth="1.5" strokeDasharray="4 2" fill="none" markerEnd="url(#arrow)" />

                                    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#fff" />
                                    </marker>
                                </svg>
                            )}

                            {pattern === 'z-pattern' && (
                                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                    <defs>
                                        <linearGradient id="z-heat" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.8)" />
                                            <stop offset="50%" stopColor="rgba(59, 130, 246, 0.4)" />
                                            <stop offset="100%" stopColor="rgba(239, 68, 68, 0.9)" />
                                        </linearGradient>
                                    </defs>
                                    
                                    {/* Z Path Highlights */}
                                    {/* Top Horizontal */}
                                    <rect x="5" y="5" width="90" height="15" fill="url(#z-heat)" rx="4" />
                                    {/* Diagonal (approximate with a polygon) */}
                                    <polygon points="85,20 95,20 15,80 5,80" fill="rgba(59, 130, 246, 0.3)" />
                                    {/* Bottom Horizontal */}
                                    <rect x="5" y="80" width="90" height="15" fill="url(#z-heat)" rx="4" />

                                    {/* Flow Arrows */}
                                    <path d="M 10 12 L 90 12" stroke="#fff" strokeWidth="1.5" strokeDasharray="4 2" fill="none" markerEnd="url(#arrow-blue)" />
                                    <path d="M 90 12 L 10 87" stroke="#fff" strokeWidth="1.5" strokeDasharray="4 2" fill="none" markerEnd="url(#arrow-blue)" />
                                    <path d="M 10 87 L 90 87" stroke="#fff" strokeWidth="1.5" strokeDasharray="4 2" fill="none" markerEnd="url(#arrow-blue)" />

                                    <marker id="arrow-blue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#fff" />
                                    </marker>
                                </svg>
                            )}
                        </div>
                    </div>
                )}
            </div>
            
            {/* Context Box */}
            <div className="bg-white border-2 border-black p-6 brutalist-shadow text-sm font-bold leading-relaxed text-slate-800">
                 {pattern === 'f-pattern' ? (
                     <p><strong>The F-Pattern</strong> describes how users read blocks of content. They first read in a horizontal movement across the upper part of the content area. Next, they move down the page a bit and read across in a second horizontal movement. Finally, users scan the content's left side in a vertical movement.</p>
                 ) : (
                     <p><strong>The Z-Pattern</strong> traces the route the human eye travels when they read — left to right, top to bottom. It's highly effective for landing pages attempting to guide users to a final Call to Action (CTA).</p>
                 )}
            </div>
        </div>
    );
}
