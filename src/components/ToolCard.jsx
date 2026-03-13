import { Link } from 'react-router-dom';

// ─── Site palette:
//  bg-slate-100 / bg-white   → light base
//  bg-black / text-black      → strong contrast
//  bg-slate-200/300/400       → mid tones
//  bg-accent / text-accent    → #6366f1 highlight
//  border-2 border-black      → brutalist edge
// All previews share this language.

const getPreview = (slug) => {
    switch (slug) {

        // ── ON THE BENCH ─────────────────────────────────────────────────────
        case 'qr-forge':
            return (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                    <svg viewBox="0 0 40 40" className="w-16 h-16" fill="none">
                        <rect x="2"  y="2"  width="16" height="16" stroke="black" strokeWidth="2"/>
                        <rect x="6"  y="6"  width="8"  height="8"  fill="black"/>
                        <rect x="22" y="2"  width="16" height="16" stroke="black" strokeWidth="2"/>
                        <rect x="26" y="6"  width="8"  height="8"  fill="black"/>
                        <rect x="2"  y="22" width="16" height="16" stroke="black" strokeWidth="2"/>
                        <rect x="6"  y="26" width="8"  height="8"  fill="black"/>
                        <rect x="22" y="22" width="4"  height="4"  fill="black"/>
                        <rect x="30" y="22" width="8"  height="4"  fill="black"/>
                        <rect x="22" y="30" width="8"  height="8"  fill="black" opacity="0.5"/>
                    </svg>
                </div>
            );

        case 'palette-lab':
            return (
                <div className="w-full h-full flex flex-col">
                    <div className="flex-1 bg-black"/>
                    <div className="flex-1 bg-accent"/>
                    <div className="flex-1 bg-slate-400"/>
                    <div className="flex-1 bg-slate-200"/>
                    <div className="flex-1 bg-slate-100"/>
                </div>
            );

        // ── IMAGE SHOP ───────────────────────────────────────────────────────
        case 'social-cropper':
            return (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                    <div className="w-16 h-16 border-2 border-dashed border-black relative flex items-center justify-center">
                        <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-black"/>
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-black"/>
                        <span className="text-[9px] font-black uppercase tracking-widest text-black">1:1</span>
                    </div>
                </div>
            );

        case 'image-compressor':
            return (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center gap-3">
                    <div className="border-2 border-black w-12 h-16 bg-slate-200 flex flex-col items-center justify-end pb-1">
                        <span className="text-[8px] font-black">2 MB</span>
                    </div>
                    <span className="font-black text-black text-xl">›</span>
                    <div className="border-2 border-accent w-8 h-11 bg-accent/10 flex flex-col items-center justify-end pb-1">
                        <span className="text-[8px] font-black text-accent">500K</span>
                    </div>
                </div>
            );

        case 'favicon-generator':
            return (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center gap-3">
                    {[['64px','w-12 h-12 text-xs'],['32px','w-8 h-8 text-[9px]'],['16px','w-5 h-5 text-[7px]']].map(([s, cls]) => (
                        <div key={s} className={`border-2 border-black bg-black flex items-center justify-center ${cls}`}>
                            <span className="font-black text-white">{s}</span>
                        </div>
                    ))}
                </div>
            );

        case 'image-resizer':
            return (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                    <div className="relative">
                        <div className="w-16 h-12 border-2 border-slate-300 bg-slate-200 absolute top-0 left-0"/>
                        <div className="w-10 h-7 border-2 border-black bg-white relative translate-x-6 translate-y-5 flex items-center justify-center">
                            <span className="text-[7px] font-black">800</span>
                        </div>
                    </div>
                </div>
            );

        case 'base64-image-encoder':
            return (
                <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center gap-2 p-3">
                    <div className="w-10 h-8 border-2 border-black bg-slate-200 flex items-center justify-center">
                        <span className="material-symbols-outlined text-sm">image</span>
                    </div>
                    <div className="text-slate-400 font-mono text-[7px] break-all text-center leading-tight">
                        data:image/png;base64,iVBOR...
                    </div>
                </div>
            );

        case 'exif-metadata-viewer':
            return (
                <div className="w-full h-full bg-white flex flex-col p-4 gap-2">
                    <div className="flex items-center gap-2 border-b-2 border-black pb-2">
                        <span className="material-symbols-outlined text-base">camera</span>
                        <div className="h-1.5 w-2/3 bg-black"/>
                    </div>
                    {['Camera Model','ISO 400','f/2.8 — 1/120s'].map(k => (
                        <div key={k} className="flex justify-between">
                            <div className="h-1.5 bg-slate-200" style={{width:'70%'}}/>
                        </div>
                    ))}
                </div>
            );

        case 'noise-texture-generator':
            return (
                <div className="w-full h-full bg-slate-300 relative overflow-hidden"
                     style={{backgroundImage:'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.15\'/%3E%3C/svg%3E")',backgroundSize:'cover'}}>
                    <div className="absolute inset-0" style={{backgroundImage:'radial-gradient(black 1px, transparent 1px)',backgroundSize:'4px 4px',opacity:0.12}}/>
                </div>
            );

        case 'mockup-frame-generator':
            return (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                    <div className="w-20 h-14 border-2 border-black bg-white relative flex flex-col pt-4 px-1 pb-1">
                        <div className="absolute top-1 left-2 flex gap-0.5">
                            {[1,2,3].map(i=><div key={i} className="w-1.5 h-1.5 rounded-full bg-black/40"/>)}
                        </div>
                        <div className="flex-1 bg-slate-200 border border-slate-300"/>
                    </div>
                </div>
            );

        case 'seamless-scroll-generator':
            return (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center gap-1">
                    {[1,2,3,4].map(i => (
                        <div key={i} className={`w-6 h-14 border-2 border-dashed ${i===2?'border-accent bg-accent/10':'border-black bg-white'}`}/>
                    ))}
                </div>
            );

        case 'watermarker':
            return (
                <div className="w-full h-full bg-slate-200 flex items-center justify-center relative overflow-hidden">
                    <div className="w-full h-full border-2 border-slate-300 opacity-50 bg-slate-100 absolute inset-0 flex items-center justify-center">
                        <span className="material-symbols-outlined text-4xl text-slate-300">image</span>
                    </div>
                    <div className="text-black/25 text-lg font-black uppercase tracking-widest -rotate-12 select-none relative z-10 border border-black/20 px-2">
                        © MARK
                    </div>
                </div>
            );

        case 'screen-color-picker':
            return (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                    <div className="relative">
                        <div className="w-14 h-14 rounded-full border-2 border-black"
                             style={{background:'conic-gradient(#ef4444,#f59e0b,#22c55e,#6366f1,#ef4444)'}}/>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-5 h-5 rounded-full bg-white border-2 border-black"/>
                        </div>
                    </div>
                </div>
            );

        // ── DEV UTILITIES ────────────────────────────────────────────────────
        case 'aspect-calculator':
            return (
                <div className="w-full h-full bg-black flex items-center justify-center">
                    <span className="text-4xl font-black text-white">16:9</span>
                </div>
            );

        case 'svg-surgeon':
            return (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center p-4">
                    <svg viewBox="0 0 100 60" className="w-full h-full" fill="none">
                        <path d="M5,30 Q25,5 50,30 Q75,55 95,30" stroke="#cbd5e1" strokeWidth="2"/>
                        <path d="M5,30 Q25,5 50,30 Q75,55 95,30" stroke="black" strokeWidth="2.5" strokeDasharray="6 0"/>
                    </svg>
                </div>
            );

        case 'json-formatter':
            return (
                <div className="w-full h-full bg-slate-800 p-4 flex flex-col gap-1.5 font-mono text-[9px]">
                    <span className="text-white/50">{'{'}</span>
                    <span className="text-white/50 ml-3">"key": <span className="text-accent">"value"</span></span>
                    <span className="text-white/50 ml-3">"n": <span className="text-emerald-400">42</span></span>
                    <span className="text-white/50">{'}'}</span>
                </div>
            );

        case 'slug-generator':
            return (
                <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                    <span className="font-mono font-black text-black text-sm tracking-widest">my-cool-slug</span>
                </div>
            );

        case 'password-generator':
            return (
                <div className="w-full h-full bg-black flex items-center justify-center">
                    <span className="font-mono font-black text-2xl tracking-[0.3em] text-white">*#@!&</span>
                </div>
            );

        case 'markdown-previewer':
            return (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center border-4 border-slate-200">
                    <span className="text-5xl font-black text-black opacity-25">M↓</span>
                </div>
            );

        case 'diff-checker':
            return (
                <div className="w-full h-full flex">
                    <div className="flex-1 bg-slate-100 p-3 pt-5 flex flex-col gap-2 border-r border-slate-300">
                        <div className="h-1 w-full bg-slate-300"/>
                        <div className="h-1 w-2/3 bg-slate-300"/>
                        <div className="h-2 w-full bg-red-200 border-l-2 border-red-500"/>
                    </div>
                    <div className="flex-1 bg-white p-3 pt-5 flex flex-col gap-2">
                        <div className="h-1 w-full bg-slate-200"/>
                        <div className="h-1 w-2/3 bg-slate-200"/>
                        <div className="h-2 w-full bg-accent/10 border-l-2 border-accent"/>
                    </div>
                </div>
            );

        case 'encoding-tools':
            return (
                <div className="w-full h-full bg-black flex flex-col items-center justify-center gap-1">
                    <div className="font-mono text-white font-black text-sm">"UTF-8"</div>
                    <div className="text-white/30 text-xl">⇅</div>
                    <div className="font-mono text-white/40 text-xs">%22UTF%22</div>
                </div>
            );

        case 'box-shadow-generator':
            return (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center pt-3 pl-3">
                    <div className="w-14 h-14 bg-white border-2 border-black"
                         style={{boxShadow:'6px 6px 0 0 #6366f1'}}/>
                </div>
            );

        case 'css-clamp-generator':
            return (
                <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center gap-1 px-4">
                    <div className="font-mono text-[9px] text-accent font-black text-center leading-relaxed border-l-2 border-accent pl-2">
                        clamp(<br/>1rem, 2vw+1rem,<br/>3rem)
                    </div>
                </div>
            );

        case 'css-grid-generator':
            return (
                <div className="w-full h-full bg-slate-50 p-2 grid grid-cols-3 grid-rows-3 gap-[2px]">
                    <div className="bg-slate-200 border border-black"/>
                    <div className="bg-slate-200 border border-black col-span-2"/>
                    <div className="bg-accent/20 border border-accent row-span-2"/>
                    <div className="bg-slate-200 border border-black"/>
                    <div className="bg-slate-200 border border-black"/>
                    <div className="bg-slate-200 border border-black col-span-3"/>
                </div>
            );

        case 'svg-path-visualizer':
            return (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center p-4">
                    <svg viewBox="0 0 100 60" className="w-full h-full" fill="none">
                        <path d="M10,50 C25,10 75,50 90,10" stroke="black" strokeWidth="2.5" strokeLinecap="round"/>
                        <circle cx="10" cy="50" r="2.5" fill="black"/>
                        <circle cx="90" cy="10" r="2.5" fill="black"/>
                        <circle cx="25" cy="10" r="2" fill="none" stroke="black" opacity="0.3" strokeDasharray="2"/>
                        <circle cx="75" cy="50" r="2" fill="none" stroke="black" opacity="0.3" strokeDasharray="2"/>
                        <line x1="10" y1="50" x2="25" y2="10" stroke="black" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.3"/>
                        <line x1="90" y1="10" x2="75" y2="50" stroke="black" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.3"/>
                    </svg>
                </div>
            );

        // ── TYPE & TEXT ──────────────────────────────────────────────────────
        case 'unit-converter':
            return (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center gap-3">
                    <div className="text-center">
                        <div className="text-3xl font-black text-black">16</div>
                        <div className="text-[8px] font-bold uppercase text-black/50">px</div>
                    </div>
                    <span className="font-black text-black text-xl">→</span>
                    <div className="text-center">
                        <div className="text-3xl font-black text-accent">1</div>
                        <div className="text-[8px] font-bold uppercase text-accent">rem</div>
                    </div>
                </div>
            );

        case 'word-counter':
            return (
                <div className="w-full h-full bg-white border-4 border-slate-100 p-4 flex flex-col justify-center gap-2">
                    {[1,0.75,1,0.55].map((w,i) => (
                        <div key={i} className="h-2.5 bg-slate-200" style={{width:`${w*100}%`}}/>
                    ))}
                    <div className="text-[8px] font-black text-accent uppercase tracking-widest mt-1">247 words</div>
                </div>
            );

        case 'text-case-converter':
            return (
                <div className="w-full h-full bg-black flex flex-col items-center justify-center">
                    <div className="font-black tracking-widest text-white text-sm uppercase">UPPER</div>
                    <div className="text-white/30 text-xl my-1">⇅</div>
                    <div className="font-mono text-white/50 text-sm">camelCase</div>
                </div>
            );

        case 'lorem-ipsum-generator':
            return (
                <div className="w-full h-full bg-white p-4 flex flex-col gap-1.5 border-2 border-slate-100">
                    {[1,0.7,1,0.8,0.45].map((w,i) => (
                        <div key={i} className="h-1.5 bg-slate-200" style={{width:`${w*100}%`}}/>
                    ))}
                </div>
            );

        case 'readability-checker':
            return (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-5xl font-black text-black">A+</div>
                        <div className="text-[8px] uppercase tracking-widest text-black/40 mt-1 font-bold">Grade 8</div>
                    </div>
                </div>
            );

        // ── COLOR LAB ────────────────────────────────────────────────────────
        case 'gradient-generator':
            return (
                <div className="w-full h-full" style={{background:'linear-gradient(135deg, #000 0%, #6366f1 100%)'}}/>
            );

        case 'contrast-checker':
            return (
                <div className="w-full h-full flex">
                    <div className="flex-1 bg-black flex items-center justify-center">
                        <span className="text-4xl font-black text-white">Aa</span>
                    </div>
                    <div className="flex-1 bg-white border-l-2 border-black flex items-center justify-center">
                        <span className="text-4xl font-black text-black">Aa</span>
                    </div>
                </div>
            );

        case 'tint-shade-generator':
            return (
                <div className="w-full h-full flex flex-col">
                    <div className="flex-1 bg-slate-100"/>
                    <div className="flex-1 bg-slate-300"/>
                    <div className="flex-1 bg-slate-500"/>
                    <div className="flex-1 bg-slate-700"/>
                    <div className="flex-1 bg-black"/>
                </div>
            );

        case 'tailwind-shade-generator':
            return (
                <div className="w-full h-full bg-slate-100 flex items-end gap-[2px] p-3">
                    {[0.08,0.15,0.25,0.38,0.55,0.7,0.85,1].map((o,i) => (
                        <div key={i} className="flex-1 bg-black"
                             style={{height:`${28+i*10}%`,opacity:Math.max(o,0.08)}}/>
                    ))}
                </div>
            );

        case 'color-name-finder':
            return (
                <div className="w-full h-full bg-accent flex items-center justify-center">
                    <div className="bg-white/80 backdrop-blur-sm border-2 border-black px-4 py-2 -rotate-3">
                        <span className="text-[10px] font-black uppercase tracking-widest text-black">Indigo Blue</span>
                    </div>
                </div>
            );

        case 'accessible-color-pair-finder':
            return (
                <div className="w-full h-full bg-black flex flex-col items-center justify-center gap-2">
                    <span className="text-4xl font-black text-white">Aa</span>
                    <span className="text-[9px] font-black uppercase tracking-widest border border-white/30 px-2 py-0.5 text-white/70">WCAG AA ✓</span>
                </div>
            );

        // ── UI COMPONENTS ───────────────────────────────────────────────────
        case 'button-style-generator':
            return (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                    <div className="px-5 py-2 bg-accent text-white text-xs font-black border-2 border-black uppercase tracking-widest"
                         style={{boxShadow:'3px 3px 0 0 #000'}}>
                        CLICK ME
                    </div>
                </div>
            );

        case 'shadow-palette-generator':
            return (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                    <div className="relative w-12 h-12">
                        <div className="absolute w-12 h-12 bg-white border-2 border-black" style={{boxShadow:'8px 8px 0 0 #e2e8f0'}}/>
                        <div className="absolute w-12 h-12 bg-white border-2 border-black translate-x-2 translate-y-2" style={{boxShadow:'4px 4px 0 0 #6366f1'}}/>
                    </div>
                </div>
            );

        case 'border-radius-scale-generator':
            return (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center gap-3">
                    {['rounded-none','rounded-sm','rounded-xl','rounded-full'].map((r,i) => (
                        <div key={i} className={`w-6 h-6 border-2 border-black bg-white ${r}`}/>
                    ))}
                </div>
            );

        case 'skeleton-screen-generator':
            return (
                <div className="w-full h-full bg-white flex flex-col p-4 gap-2 justify-center">
                    <div className="w-10 h-10 bg-slate-200"/>
                    <div className="h-2 w-full bg-slate-200"/>
                    <div className="h-2 w-3/4 bg-slate-200"/>
                    <div className="h-2 w-5/6 bg-slate-100 border border-slate-200"/>
                </div>
            );

        case 'simple-icon-set':
            return (
                <div className="w-full h-full bg-slate-100 grid grid-cols-3 gap-3 p-5 items-center justify-items-center">
                    {['home','search','settings','favorite','share','person'].map((ic,i) => (
                        <span key={i} className={`material-symbols-outlined text-xl ${i===4?'text-accent':'text-black/40'}`}>{ic}</span>
                    ))}
                </div>
            );

        // ── LAYOUT TOOL ──────────────────────────────────────────────────────
        case 'flexbox-playground':
            return (
                <div className="w-full h-full bg-slate-50 flex items-end justify-between p-3 gap-2 border-4 border-slate-200">
                    <div className="flex-1 h-1/3 bg-slate-300 border border-black"/>
                    <div className="flex-1 h-2/3 bg-accent/30 border border-accent"/>
                    <div className="flex-1 h-1/2 bg-slate-300 border border-black"/>
                </div>
            );

        case 'golden-ratio-calculator':
            return (
                <div className="w-full h-full bg-slate-100 p-2 flex gap-1">
                    <div className="flex-[1.618] h-full border-2 border-black bg-white relative overflow-hidden">
                        <div className="absolute bottom-0 right-0 w-full aspect-square border-t border-l border-black/20 rounded-tr-full opacity-40"/>
                    </div>
                    <div className="flex-1 h-full flex flex-col gap-1">
                        <div className="flex-[1.618] border border-black bg-white"/>
                        <div className="flex-1 border border-black bg-slate-200"/>
                    </div>
                </div>
            );

        case '8pt-grid-checker':
            return (
                <div className="w-full h-full bg-slate-50 relative overflow-hidden"
                     style={{backgroundImage:'linear-gradient(to right,#cbd5e1 1px,transparent 1px),linear-gradient(to bottom,#cbd5e1 1px,transparent 1px)',backgroundSize:'8px 8px'}}>
                    <div className="absolute top-3 left-3 w-16 h-8 bg-accent/20 border-2 border-accent flex items-center justify-center">
                        <span className="text-[8px] font-black text-accent">8pt</span>
                    </div>
                </div>
            );

        case 'grid-system-calculator':
            return (
                <div className="w-full h-full p-3 flex gap-1 bg-slate-50 border-4 border-slate-200">
                    {[1,2,1,2,1].map((w,i) => (
                        <div key={i} className={`flex-${w} h-full border-x-2 ${i===1||i===3?'border-accent/50 bg-accent/10':'border-slate-300 bg-slate-200'}`}/>
                    ))}
                </div>
            );

        case 'bleed-margin-calculator':
            return (
                <div className="w-full h-full bg-white flex items-center justify-center p-4">
                    <div className="relative">
                        <div className="w-12 h-16 border border-slate-300 bg-slate-50">
                            <div className="absolute -inset-2 border border-dashed border-red-400"/>
                            <div className="absolute inset-2 border border-dashed border-accent"/>
                        </div>
                    </div>
                </div>
            );

        case 'export-multiplier-calculator':
            return (
                <div className="w-full h-full bg-black flex items-center justify-center gap-3 font-mono">
                    <span className="text-white/30 font-black text-sm">@1x</span>
                    <span className="text-accent font-black text-2xl">@2x</span>
                    <span className="text-white/60 font-black text-lg">@3x</span>
                </div>
            );

        // ── DATA UTILITIES ───────────────────────────────────────────────────
        case 'fake-data-generator':
            return (
                <div className="w-full h-full bg-slate-50 p-4 flex flex-col gap-2 justify-center">
                    {[['Name','John Doe'],['Email','j@ex.com'],['ID','#4829']].map(([k,v]) => (
                        <div key={k} className="flex justify-between items-center border-b border-slate-200 pb-1">
                            <span className="text-[8px] font-black uppercase text-black/40">{k}</span>
                            <span className="text-[8px] font-mono font-black text-accent">{v}</span>
                        </div>
                    ))}
                </div>
            );

        case 'character-map-browser':
            return (
                <div className="w-full h-full bg-slate-900 flex items-center justify-center border-4 border-slate-700">
                    <div className="grid grid-cols-4 gap-2 text-white font-mono text-xl">
                        {['⌘','⌥','⇧','⎋','↩','⌫','⌃','⇥'].map((c,i) => (
                            <span key={i} className={`text-base ${i===0?'text-accent':'text-white/30'}`}>{c}</span>
                        ))}
                    </div>
                </div>
            );

        // ── DESIGN INSPECTION ────────────────────────────────────────────────
        case 'touch-target-checker':
            return (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                    <div className="relative">
                        <div className="w-6 h-6 bg-black"/>
                        <div className="absolute -inset-3 border border-dashed border-red-400 bg-red-400/10"/>
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] font-black text-red-500 whitespace-nowrap">48×48</div>
                    </div>
                </div>
            );

        case 'reading-flow-simulator':
            return (
                <div className="w-full h-full bg-white p-4 relative">
                    {[1,0.7,1,0.5].map((w,i) => (
                        <div key={i} className="h-1.5 mb-2 bg-slate-200" style={{width:`${w*100}%`}}/>
                    ))}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                        <path d="M10,20 L90,20 L20,60 L70,60" fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 3" opacity="0.7"/>
                    </svg>
                </div>
            );

        case 'artboard-size-reference':
            return (
                <div className="w-full h-full bg-slate-100 flex items-end justify-center gap-2 p-4">
                    <div className="w-5 h-10 border-2 border-black bg-white"/>
                    <div className="w-8 h-14 border-2 border-accent bg-accent/5"/>
                    <div className="w-14 h-9 border-2 border-black bg-white"/>
                </div>
            );

        default:
            return (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                    <span className="material-symbols-outlined text-5xl text-black opacity-10 select-none">
                        precision_manufacturing
                    </span>
                </div>
            );
    }
};

export default function ToolCard({ id, slug, name, description, icon, tags }) {
    return (
        <Link
            to={`/tools/${slug}`}
            className="group block bg-white border-2 border-black p-6 flex flex-col h-full brutalist-shadow brutalist-shadow-hover transition-all focus:outline-none focus:ring-4 focus:ring-accent/20"
        >
            <div className="flex justify-between items-start mb-6">
                <span className="font-mono text-sm font-bold opacity-50 tracking-widest">{id}</span>
                <span className="material-symbols-outlined text-black group-hover:text-accent transition-colors">
                    {icon || "build"}
                </span>
            </div>

            <div className="mb-6 w-full aspect-[4/3] sm:aspect-square bg-slate-100 border-2 border-black overflow-hidden relative group">
                <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-500 will-change-transform">
                    {getPreview(slug)}
                </div>
            </div>

            <h3 className="text-2xl font-bold uppercase mb-2 tracking-[0.2em] text-black group-hover:text-accent transition-colors">
                {name}
            </h3>

            <p className="text-slate-600 font-medium mb-6 flex-grow leading-relaxed">
                {description}
            </p>

            {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-auto">
                    {tags.map((tag, idx) => (
                        <span
                            key={idx}
                            className="text-[10px] font-bold uppercase border-2 border-black px-2 py-1 bg-accent/10 text-black tracking-widest"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            )}
        </Link>
    );
}
