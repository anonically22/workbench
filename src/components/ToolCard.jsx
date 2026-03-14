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
                <div className="w-full h-full bg-[var(--color-background)] flex items-center justify-center">
                    <svg viewBox="0 0 40 40" className="w-16 h-16" fill="none">
                        <rect x="2"  y="2"  width="16" height="16" stroke="var(--color-black)" strokeWidth="2"/>
                        <rect x="6"  y="6"  width="8"  height="8"  fill="var(--color-black)"/>
                        <rect x="22" y="2"  width="16" height="16" stroke="var(--color-black)" strokeWidth="2"/>
                        <rect x="26" y="6"  width="8"  height="8"  fill="var(--color-black)"/>
                        <rect x="2"  y="22" width="16" height="16" stroke="var(--color-black)" strokeWidth="2"/>
                        <rect x="6"  y="26" width="8"  height="8"  fill="var(--color-black)"/>
                        <rect x="22" y="22" width="4"  height="4"  fill="var(--color-black)"/>
                        <rect x="30" y="22" width="8"  height="4"  fill="var(--color-black)"/>
                        <rect x="22" y="30" width="8"  height="8"  fill="var(--color-black)" opacity="0.5"/>
                    </svg>
                </div>
            );

        case 'palette-lab':
            return (
                <div className="w-full h-full flex flex-col">
                    <div className="flex-1 bg-[var(--color-black)]"/>
                    <div className="flex-1 bg-accent"/>
                    <div className="flex-1 bg-[var(--color-text-secondary)] opacity-50"/>
                    <div className="flex-1 bg-[var(--color-border)]"/>
                    <div className="flex-1 bg-[var(--color-background)]"/>
                </div>
            );

        // ── IMAGE SHOP ───────────────────────────────────────────────────────
        case 'social-cropper':
            return (
                <div className="w-full h-full bg-[var(--color-background)] flex items-center justify-center">
                    <div className="w-16 h-16 border-2 border-dashed border-[var(--color-black)] relative flex items-center justify-center">
                        <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-[var(--color-black)]"/>
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-[var(--color-black)]"/>
                        <span className="text-[9px] font-black uppercase tracking-widest text-[var(--color-text-primary)]">1:1</span>
                    </div>
                </div>
            );

        case 'image-compressor':
            return (
                <div className="w-full h-full bg-[var(--color-background)] flex items-center justify-center gap-3">
                    <div className="border-2 border-[var(--color-black)] w-12 h-16 bg-[var(--color-border)] flex flex-col items-center justify-end pb-1">
                        <span className="text-[8px] font-black text-[var(--color-text-primary)]">2 MB</span>
                    </div>
                    <span className="font-black text-[var(--color-text-primary)] text-xl">›</span>
                    <div className="border-2 border-accent w-8 h-11 bg-accent/10 flex flex-col items-center justify-end pb-1">
                        <span className="text-[8px] font-black text-accent">500K</span>
                    </div>
                </div>
            );

        case 'favicon-generator':
            return (
                <div className="w-full h-full bg-[var(--color-background)] flex items-center justify-center gap-3">
                    {[['64px','w-12 h-12 text-xs'],['32px','w-8 h-8 text-[9px]'],['16px','w-5 h-5 text-[7px]']].map(([s, cls]) => (
                        <div key={s} className={`border-2 border-[var(--color-black)] bg-[var(--color-black)] flex items-center justify-center ${cls}`}>
                            <span className="font-black text-[var(--color-background)]">{s}</span>
                        </div>
                    ))}
                </div>
            );

        case 'image-resizer':
            return (
                <div className="w-full h-full bg-[var(--color-background)] flex items-center justify-center">
                    <div className="relative">
                        <div className="w-16 h-12 border-2 border-[var(--color-border)] bg-[var(--color-border)] opacity-50 absolute top-0 left-0"/>
                        <div className="w-10 h-7 border-2 border-[var(--color-black)] bg-[var(--color-surface)] relative translate-x-6 translate-y-5 flex items-center justify-center">
                            <span className="text-[7px] font-black text-[var(--color-text-primary)]">800</span>
                        </div>
                    </div>
                </div>
            );

        case 'base64-image-encoder':
            return (
                <div className="w-full h-full bg-[var(--color-background)] flex flex-col items-center justify-center gap-2 p-3">
                    <div className="w-10 h-8 border-2 border-[var(--color-black)] bg-[var(--color-border)] flex items-center justify-center">
                        <span className="material-symbols-outlined text-sm text-[var(--color-text-primary)]">image</span>
                    </div>
                    <div className="text-[var(--color-text-secondary)] font-mono text-[7px] break-all text-center leading-tight opacity-60">
                        data:image/png;base64,iVBOR...
                    </div>
                </div>
            );

        case 'exif-metadata-viewer':
            return (
                <div className="w-full h-full bg-[var(--color-surface)] flex flex-col p-4 gap-2">
                    <div className="flex items-center gap-2 border-b-2 border-[var(--color-black)] pb-2">
                        <span className="material-symbols-outlined text-base text-[var(--color-text-primary)]">camera</span>
                        <div className="h-1.5 w-2/3 bg-[var(--color-black)]"/>
                    </div>
                    {['Camera Model','ISO 400','f/2.8 — 1/120s'].map(k => (
                        <div key={k} className="flex justify-between">
                            <div className="h-1.5 bg-[var(--color-border)]" style={{width:'70%'}}/>
                        </div>
                    ))}
                </div>
            );

        case 'noise-texture-generator':
            return (
                <div className="w-full h-full bg-[var(--color-border)] relative overflow-hidden"
                     style={{backgroundImage:'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.15\'/%3E%3C/svg%3E")',backgroundSize:'cover'}}>
                    <div className="absolute inset-0" style={{backgroundImage:'radial-gradient(var(--color-black) 1px, transparent 1px)',backgroundSize:'4px 4px',opacity:0.12}}/>
                </div>
            );

        case 'mockup-frame-generator':
            return (
                <div className="w-full h-full bg-[var(--color-background)] flex items-center justify-center">
                    <div className="w-20 h-14 border-2 border-[var(--color-black)] bg-[var(--color-surface)] relative flex flex-col pt-4 px-1 pb-1">
                        <div className="absolute top-1 left-2 flex gap-0.5">
                            {[1,2,3].map(i=><div key={i} className="w-1.5 h-1.5 rounded-full bg-[var(--color-black)] opacity-40"/>)}
                        </div>
                        <div className="flex-1 bg-[var(--color-border)] border border-[var(--color-border)]"/>
                    </div>
                </div>
            );

        case 'seamless-scroll-generator':
            return (
                <div className="w-full h-full bg-[var(--color-background)] flex items-center justify-center gap-1">
                    {[1,2,3,4].map(i => (
                        <div key={i} className={`w-6 h-14 border-2 border-dashed ${i===2?'border-accent bg-accent/10':'border-[var(--color-black)] bg-[var(--color-surface)]'}`}/>
                    ))}
                </div>
            );

        case 'watermarker':
            return (
                <div className="w-full h-full bg-[var(--color-border)] flex items-center justify-center relative overflow-hidden">
                    <div className="w-full h-full border-2 border-[var(--color-border)] opacity-50 bg-[var(--color-background)] absolute inset-0 flex items-center justify-center">
                        <span className="material-symbols-outlined text-4xl text-[var(--color-border)]">image</span>
                    </div>
                    <div className="text-[var(--color-black)] opacity-25 text-lg font-black uppercase tracking-widest -rotate-12 select-none relative z-10 border border-[var(--color-black)] opacity-20 px-2">
                        © MARK
                    </div>
                </div>
            );

        case 'screen-color-picker':
            return (
                <div className="w-full h-full bg-[var(--color-background)] flex items-center justify-center">
                    <div className="relative">
                        <div className="w-14 h-14 rounded-full border-2 border-[var(--color-black)]"
                             style={{background:'conic-gradient(#ef4444,#f59e0b,#22c55e,#6366f1,#ef4444)'}}/>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-5 h-5 rounded-full bg-[var(--color-surface)] border-2 border-[var(--color-black)]"/>
                        </div>
                    </div>
                </div>
            );

        // ── DEV UTILITIES ────────────────────────────────────────────────────
        case 'aspect-calculator':
            return (
                <div className="w-full h-full bg-[var(--color-black)] flex items-center justify-center">
                    <span className="text-4xl font-black text-[var(--color-surface)]">16:9</span>
                </div>
            );

        case 'svg-surgeon':
            return (
                <div className="w-full h-full bg-[var(--color-background)] flex items-center justify-center p-4">
                    <svg viewBox="0 0 100 60" className="w-full h-full" fill="none">
                        <path d="M5,30 Q25,5 50,30 Q75,55 95,30" stroke="var(--color-border)" strokeWidth="2"/>
                        <path d="M5,30 Q25,5 50,30 Q75,55 95,30" stroke="var(--color-black)" strokeWidth="2.5" strokeDasharray="6 0"/>
                    </svg>
                </div>
            );

        case 'json-formatter':
            return (
                <div className="w-full h-full bg-[var(--color-black)] p-4 flex flex-col gap-1.5 font-mono text-[9px] overflow-hidden">
                    <span className="text-[var(--color-surface)] opacity-50">{'{'}</span>
                    <span className="text-[var(--color-surface)] opacity-50 ml-3">"key": <span className="text-accent">"value"</span></span>
                    <span className="text-[var(--color-surface)] opacity-50 ml-3">"n": <span className="text-emerald-400">42</span></span>
                    <span className="text-[var(--color-surface)] opacity-50">{'}'}</span>
                </div>
            );

        case 'slug-generator':
            return (
                <div className="w-full h-full bg-[var(--color-border)] flex items-center justify-center px-4">
                    <span className="font-mono font-black text-[var(--color-text-primary)] text-sm tracking-widest break-all text-center">my-cool-slug</span>
                </div>
            );

        case 'password-generator':
            return (
                <div className="w-full h-full bg-[var(--color-black)] flex items-center justify-center">
                    <span className="font-mono font-black text-2xl tracking-[0.3em] text-[var(--color-surface)]">*#@!&</span>
                </div>
            );

        case 'markdown-previewer':
            return (
                <div className="w-full h-full bg-[var(--color-background)] flex items-center justify-center border-4 border-[var(--color-border)]">
                    <span className="text-5xl font-black text-[var(--color-text-primary)] opacity-25">M↓</span>
                </div>
            );

        case 'diff-checker':
            return (
                <div className="w-full h-full flex">
                    <div className="flex-1 bg-[var(--color-background)] p-3 pt-5 flex flex-col gap-2 border-r border-[var(--color-border)]">
                        <div className="h-1 w-full bg-[var(--color-border)]"/>
                        <div className="h-1 w-2/3 bg-[var(--color-border)]"/>
                        <div className="h-2 w-full bg-red-500/10 border-l-2 border-red-500"/>
                    </div>
                    <div className="flex-1 bg-[var(--color-surface)] p-3 pt-5 flex flex-col gap-2">
                        <div className="h-1 w-full bg-[var(--color-border)] opacity-50"/>
                        <div className="h-1 w-2/3 bg-[var(--color-border)] opacity-50"/>
                        <div className="h-2 w-full bg-accent/10 border-l-2 border-accent"/>
                    </div>
                </div>
            );

        case 'encoding-tools':
            return (
                <div className="w-full h-full bg-[var(--color-black)] flex flex-col items-center justify-center gap-1">
                    <div className="font-mono text-[var(--color-surface)] font-black text-sm">"UTF-8"</div>
                    <div className="text-accent text-xl">⇅</div>
                    <div className="font-mono text-[var(--color-surface)] opacity-40 text-xs text-center break-all px-2">%22UTF%22</div>
                </div>
            );

        case 'box-shadow-generator':
            return (
                <div className="w-full h-full bg-[var(--color-background)] flex items-center justify-center pt-3 pl-3">
                    <div className="w-14 h-14 bg-[var(--color-surface)] border-2 border-[var(--color-black)]"
                         style={{boxShadow:'6px 6px 0 0 var(--color-accent)'}}/>
                </div>
            );

        case 'css-clamp-generator':
            return (
                <div className="w-full h-full bg-[var(--color-background)] flex flex-col items-center justify-center gap-1 px-4">
                    <div className="font-mono text-[9px] text-accent font-black text-center leading-relaxed border-l-2 border-accent pl-2">
                        clamp(<br/>1rem, 2vw+1rem,<br/>3rem)
                    </div>
                </div>
            );

        case 'css-grid-generator':
            return (
                <div className="w-full h-full bg-[var(--color-background)] p-2 grid grid-cols-3 grid-rows-3 gap-[2px]">
                    <div className="bg-[var(--color-surface)] border border-[var(--color-black)]"/>
                    <div className="bg-[var(--color-surface)] border border-[var(--color-black)] col-span-2"/>
                    <div className="bg-accent/20 border border-accent row-span-2"/>
                    <div className="bg-[var(--color-surface)] border border-[var(--color-black)]"/>
                    <div className="bg-[var(--color-surface)] border border-[var(--color-black)]"/>
                    <div className="bg-[var(--color-border)] border border-[var(--color-black)] col-span-3"/>
                </div>
            );

        case 'svg-path-visualizer':
            return (
                <div className="w-full h-full bg-[var(--color-background)] flex items-center justify-center p-4">
                    <svg viewBox="0 0 100 60" className="w-full h-full" fill="none">
                        <path d="M10,50 C25,10 75,50 90,10" stroke="var(--color-black)" strokeWidth="2.5" strokeLinecap="round"/>
                        <circle cx="10" cy="50" r="2.5" fill="var(--color-black)"/>
                        <circle cx="90" cy="10" r="2.5" fill="var(--color-black)"/>
                        <circle cx="25" cy="10" r="2" fill="none" stroke="var(--color-black)" opacity="0.3" strokeDasharray="2"/>
                        <circle cx="75" cy="50" r="2" fill="none" stroke="var(--color-black)" opacity="0.3" strokeDasharray="2"/>
                        <line x1="10" y1="50" x2="25" y2="10" stroke="var(--color-black)" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.3"/>
                        <line x1="90" y1="10" x2="75" y2="50" stroke="var(--color-black)" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.3"/>
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
                <div className="w-full h-full bg-[var(--color-surface)] border-4 border-[var(--color-background)] p-4 flex flex-col justify-center gap-2">
                    {[1,0.75,1,0.55].map((w,i) => (
                        <div key={i} className="h-2.5 bg-[var(--color-border)] opacity-60" style={{width:`${w*100}%`}}/>
                    ))}
                    <div className="text-[10px] font-black text-accent uppercase tracking-widest mt-1">247 words</div>
                </div>
            );

        case 'text-case-converter':
            return (
                <div className="w-full h-full bg-[var(--color-black)] flex flex-col items-center justify-center">
                    <div className="font-black tracking-widest text-[var(--color-surface)] text-sm uppercase">UPPER</div>
                    <div className="text-accent text-xl my-1">⇅</div>
                    <div className="font-mono text-[var(--color-surface)] opacity-50 text-sm">camelCase</div>
                </div>
            );

        case 'lorem-ipsum-generator':
            return (
                <div className="w-full h-full bg-[var(--color-surface)] p-4 flex flex-col gap-1.5 border-2 border-[var(--color-background)]">
                    {[1,0.7,1,0.8,0.45].map((w,i) => (
                        <div key={i} className="h-1.5 bg-[var(--color-border)] opacity-60" style={{width:`${w*100}%`}}/>
                    ))}
                </div>
            );

        case 'readability-checker':
            return (
                <div className="w-full h-full bg-[var(--color-background)] flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-5xl font-black text-[var(--color-text-primary)]">A+</div>
                        <div className="text-[8px] uppercase tracking-widest text-[var(--color-text-primary)] opacity-40 mt-1 font-bold">Grade 8</div>
                    </div>
                </div>
            );

        // ── COLOR LAB ────────────────────────────────────────────────────────
        case 'gradient-generator':
            return (
                <div className="w-full h-full" style={{background:'linear-gradient(135deg, var(--color-black) 0%, var(--color-accent) 100%)'}}/>
            );

        case 'contrast-checker':
            return (
                <div className="w-full h-full flex">
                    <div className="flex-1 bg-[var(--color-black)] flex items-center justify-center">
                        <span className="text-4xl font-black text-[var(--color-surface)]">Aa</span>
                    </div>
                    <div className="flex-1 bg-[var(--color-surface)] border-l-2 border-[var(--color-black)] flex items-center justify-center">
                        <span className="text-4xl font-black text-[var(--color-text-primary)]">Aa</span>
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
                <div className="w-full h-full bg-[var(--color-background)] flex items-end gap-[2px] p-3">
                    {[0.08,0.15,0.25,0.38,0.55,0.7,0.85,1].map((o,i) => (
                        <div key={i} className="flex-1 bg-[var(--color-black)]"
                             style={{height:`${28+i*10}%`,opacity:Math.max(o,0.08)}}/>
                    ))}
                </div>
            );

        case 'color-name-finder':
            return (
                <div className="w-full h-full bg-accent flex items-center justify-center">
                    <div className="bg-[var(--color-surface)]/80 backdrop-blur-sm border-2 border-[var(--color-black)] px-4 py-2 -rotate-3">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-primary)]">Indigo Blue</span>
                    </div>
                </div>
            );

        case 'accessible-color-pair-finder':
            return (
                <div className="w-full h-full bg-[var(--color-black)] flex flex-col items-center justify-center gap-2">
                    <span className="text-4xl font-black text-[var(--color-surface)]">Aa</span>
                    <span className="text-[9px] font-black uppercase tracking-widest border border-[var(--color-surface)]/30 px-2 py-0.5 text-[var(--color-surface)]/70">WCAG AA ✓</span>
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
                <div className="w-full h-full bg-[var(--color-surface)] flex flex-col p-4 gap-2 justify-center">
                    <div className="w-10 h-10 bg-[var(--color-border)] opacity-60"/>
                    <div className="h-2 w-full bg-[var(--color-border)] opacity-60"/>
                    <div className="h-2 w-3/4 bg-[var(--color-border)] opacity-60"/>
                    <div className="h-2 w-5/6 bg-[var(--color-background)] border border-[var(--color-border)]"/>
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
                <div className="w-full h-full bg-[var(--color-background)] flex items-end justify-between p-3 gap-2 border-4 border-[var(--color-border)]">
                    <div className="flex-1 h-1/3 bg-[var(--color-border)] border border-[var(--color-black)] opacity-60"/>
                    <div className="flex-1 h-2/3 bg-accent/30 border border-accent"/>
                    <div className="flex-1 h-1/2 bg-[var(--color-border)] border border-[var(--color-black)] opacity-60"/>
                </div>
            );

        case 'golden-ratio-calculator':
            return (
                <div className="w-full h-full bg-[var(--color-background)] p-2 flex gap-1">
                    <div className="flex-[1.618] h-full border-2 border-[var(--color-black)] bg-[var(--color-surface)] relative overflow-hidden">
                        <div className="absolute bottom-0 right-0 w-full aspect-square border-t border-l border-[var(--color-black)]/20 rounded-tr-full opacity-40"/>
                    </div>
                    <div className="flex-1 h-full flex flex-col gap-1">
                        <div className="flex-[1.618] border border-[var(--color-black)] bg-[var(--color-surface)]"/>
                        <div className="flex-1 border border-[var(--color-black)] bg-[var(--color-border)]"/>
                    </div>
                </div>
            );

        case '8pt-grid-checker':
            return (
                <div className="w-full h-full bg-[var(--color-background)] relative overflow-hidden"
                     style={{backgroundImage:'linear-gradient(to right,var(--color-border) 1px,transparent 1px),linear-gradient(to bottom,var(--color-border) 1px,transparent 1px)',backgroundSize:'8px 8px'}}>
                    <div className="absolute top-3 left-3 w-16 h-8 bg-accent/20 border-2 border-accent flex items-center justify-center">
                        <span className="text-[8px] font-black text-accent">8pt</span>
                    </div>
                </div>
            );

        case 'grid-system-calculator':
            return (
                <div className="w-full h-full p-3 flex gap-1 bg-[var(--color-background)] border-4 border-[var(--color-border)]">
                    {[1,2,1,2,1].map((w,i) => (
                        <div key={i} className={`flex-${w} h-full border-x-2 ${i===1||i===3?'border-accent/50 bg-accent/10':'border-[var(--color-border)] bg-[var(--color-border)] opacity-50'}`}/>
                    ))}
                </div>
            );

        case 'bleed-margin-calculator':
            return (
                <div className="w-full h-full bg-[var(--color-surface)] flex items-center justify-center p-4">
                    <div className="relative">
                        <div className="w-12 h-16 border border-[var(--color-border)] bg-[var(--color-background)]">
                            <div className="absolute -inset-2 border border-dashed border-red-400"/>
                            <div className="absolute inset-2 border border-dashed border-accent"/>
                        </div>
                    </div>
                </div>
            );

        case 'export-multiplier-calculator':
            return (
                <div className="w-full h-full bg-[var(--color-black)] flex items-center justify-center gap-3 font-mono">
                    <span className="text-[var(--color-surface)] opacity-30 font-black text-sm">@1x</span>
                    <span className="text-accent font-black text-2xl">@2x</span>
                    <span className="text-[var(--color-surface)] opacity-60 font-black text-lg">@3x</span>
                </div>
            );

        // ── DATA UTILITIES ───────────────────────────────────────────────────
        case 'fake-data-generator':
            return (
                <div className="w-full h-full bg-[var(--color-background)] p-4 flex flex-col gap-2 justify-center">
                    {[['Name','John Doe'],['Email','j@ex.com'],['ID','#4829']].map(([k,v]) => (
                        <div key={k} className="flex justify-between items-center border-b border-[var(--color-border)] pb-1">
                            <span className="text-[8px] font-black uppercase text-[var(--color-text-primary)] opacity-40">{k}</span>
                            <span className="text-[8px] font-mono font-black text-accent">{v}</span>
                        </div>
                    ))}
                </div>
            );

        case 'character-map-browser':
            return (
                <div className="w-full h-full bg-[var(--color-black)] flex items-center justify-center border-4 border-[var(--color-border)] opacity-90">
                    <div className="grid grid-cols-4 gap-2 text-[var(--color-surface)] font-mono text-xl">
                        {['⌘','⌥','⇧','⎋','↩','⌫','⌃','⇥'].map((c,i) => (
                            <span key={i} className={`text-base ${i===0?'text-accent':'opacity-30'}`}>{c}</span>
                        ))}
                    </div>
                </div>
            );

        // ── DESIGN INSPECTION ────────────────────────────────────────────────
        case 'touch-target-checker':
            return (
                <div className="w-full h-full bg-[var(--color-background)] flex items-center justify-center">
                    <div className="relative">
                        <div className="w-6 h-6 bg-[var(--color-black)]"/>
                        <div className="absolute -inset-3 border border-dashed border-red-400 bg-red-400/10"/>
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] font-black text-red-500 whitespace-nowrap">48×48</div>
                    </div>
                </div>
            );

        case 'reading-flow-simulator':
            return (
                <div className="w-full h-full bg-[var(--color-surface)] p-4 relative">
                    {[1,0.7,1,0.5].map((w,i) => (
                        <div key={i} className="h-1.5 mb-2 bg-[var(--color-border)] opacity-60" style={{width:`${w*100}%`}}/>
                    ))}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                        <path d="M10,20 L90,20 L20,60 L70,60" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeDasharray="4 3" opacity="0.7"/>
                    </svg>
                </div>
            );

        case 'artboard-size-reference':
            return (
                <div className="w-full h-full bg-[var(--color-background)] flex items-end justify-center gap-2 p-4">
                    <div className="w-5 h-10 border-2 border-[var(--color-black)] bg-[var(--color-surface)]"/>
                    <div className="w-8 h-14 border-2 border-accent bg-accent/5"/>
                    <div className="w-14 h-9 border-2 border-[var(--color-black)] bg-[var(--color-surface)]"/>
                </div>
            );

        // ── PHASE 5 ──────────────────────────────────────────────────────────
        case 'color-blindness-simulator':
            return (
                <div className="w-full h-full bg-[var(--color-background)] flex items-center justify-center gap-1">
                    <div className="flex flex-col gap-1">
                        <div className="w-8 h-8 rounded-full border-2 border-[var(--color-black)] bg-red-400"/>
                        <div className="w-8 h-8 rounded-full border-2 border-[var(--color-black)] bg-green-400"/>
                    </div>
                    <svg viewBox="0 0 24 24" className="w-6 h-6 text-[var(--color-text-primary)] mx-2"><path d="M14 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none"/></svg>
                    <div className="flex flex-col gap-1">
                        <div className="w-8 h-8 rounded-full border-2 border-[var(--color-black)] bg-amber-400"/>
                        <div className="w-8 h-8 rounded-full border-2 border-[var(--color-black)] bg-amber-500"/>
                    </div>
                </div>
            );

        case 'font-pairing-explorer':
            return (
                <div className="w-full h-full bg-[var(--color-background)] flex flex-col items-center justify-center gap-2 p-4">
                    <span className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)]" style={{fontFamily:'serif'}}>Aa</span>
                    <div className="w-12 h-px bg-[var(--color-black)]"/>
                    <span className="text-sm font-bold text-[var(--color-text-secondary)] opacity-60" style={{fontFamily:'sans-serif'}}>Bb Cc</span>
                </div>
            );

        case 'svg-to-jsx':
            return (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center gap-2 p-4">
                    <div className="border-2 border-black px-2 py-1 text-[10px] font-mono font-bold bg-white">&lt;svg&gt;</div>
                    <svg viewBox="0 0 24 24" className="w-5 h-5"><path d="M14 5l7 7-7 7" stroke="black" strokeWidth="2" fill="none"/></svg>
                    <div className="border-2 border-accent px-2 py-1 text-[10px] font-mono font-bold bg-accent/10 text-accent">&lt;JSX/&gt;</div>
                </div>
            );

        case 'regex-tester':
            return (
                <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center gap-2 p-4">
                    <div className="text-xs font-mono font-bold text-black border-2 border-black bg-white px-3 py-1">/[A-Z]+/g</div>
                    <div className="flex gap-1">
                        <span className="text-[10px] font-mono bg-accent/20 text-accent border-b-2 border-accent px-1">MATCH</span>
                        <span className="text-[10px] font-mono text-slate-300 px-1">text</span>
                        <span className="text-[10px] font-mono bg-accent/20 text-accent border-b-2 border-accent px-1">FIND</span>
                    </div>
                </div>
            );

        case 'hash-generator':
            return (
                <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center gap-2 p-4">
                    <div className="text-xs font-black uppercase tracking-widest text-black">SHA-256</div>
                    <div className="text-[8px] font-mono text-slate-400 max-w-[120px] truncate">e3b0c44298fc1c14...</div>
                    <div className="w-8 h-px bg-black"/>
                </div>
            );

        case 'aria-role-reference':
            return (
                <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center gap-2 p-4">
                    <div className="text-xs font-mono font-bold text-accent">role="button"</div>
                    <div className="text-xs font-mono font-bold text-slate-400">role="dialog"</div>
                    <div className="text-xs font-mono font-bold text-slate-300">role="alert"</div>
                </div>
            );

        default:
            return (
                <div className="w-full h-full bg-[var(--color-background)] flex items-center justify-center">
                    <span className="material-symbols-outlined text-5xl text-[var(--color-text-primary)] opacity-10 select-none">
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
            className="group block bg-[var(--color-surface)] border-2 border-[var(--color-black)] p-6 flex flex-col h-full brutalist-shadow brutalist-shadow-hover transition-all focus:outline-none focus:ring-4 focus:ring-accent/20"
        >
            <div className="flex justify-between items-start mb-6">
                <span className="font-mono text-sm font-bold text-[var(--color-text-primary)] opacity-50 tracking-widest">{id}</span>
                <span className="material-symbols-outlined text-[var(--color-text-primary)] group-hover:text-accent transition-colors">
                    {icon || "build"}
                </span>
            </div>

            <div className="mb-6 w-full aspect-[4/3] sm:aspect-square bg-[var(--color-background)] border-2 border-[var(--color-black)] overflow-hidden relative group">
                <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-500 will-change-transform">
                    {getPreview(slug)}
                </div>
            </div>

            <h3 className="text-2xl font-bold uppercase mb-2 tracking-[0.2em] text-[var(--color-text-primary)] group-hover:text-accent transition-colors">
                {name}
            </h3>

            <p className="text-[var(--color-text-secondary)] font-medium mb-6 flex-grow leading-relaxed">
                {description}
            </p>

            {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-auto">
                    {tags.map((tag, idx) => (
                        <span
                            key={idx}
                            className="text-[10px] font-bold uppercase border-2 border-[var(--color-black)] px-2 py-1 bg-accent/10 text-[var(--color-text-primary)] tracking-widest"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            )}
        </Link>
    );
}
