import { Link } from 'react-router-dom';

const getPreview = (slug, icon) => {
    switch (slug) {
        case 'qr-forge':
            return (
                <div className="w-full h-full bg-gradient-to-br from-accent/10 to-accent/30 flex items-center justify-center">
                    <span className="material-symbols-outlined text-6xl opacity-20 text-accent">filter_center_focus</span>
                </div>
            );
        case 'palette-lab':
            return (
                <div className="w-full h-full flex flex-col">
                    <div className="flex-1 bg-black"></div>
                    <div className="flex-1 bg-slate-400"></div>
                    <div className="flex-1 bg-slate-200"></div>
                </div>
            );
        case 'social-cropper':
            return (
                <div className="w-full h-full bg-accent/5 flex items-center justify-center">
                    <div className="w-1/2 h-1/2 border-2 border-dashed border-black flex items-center justify-center">
                        <span className="material-symbols-outlined text-4xl text-black">aspect_ratio</span>
                    </div>
                </div>
            );
        case 'aspect-calculator':
            return (
                <div className="w-full h-full flex items-center justify-center bg-black text-white">
                    <span className="text-5xl font-black">16:9</span>
                </div>
            );
        case 'svg-surgeon':
            return (
                <div className="w-full h-full bg-slate-100 p-8 flex items-center justify-center">
                    <svg className="w-full h-full text-black" viewBox="0 0 100 100">
                        <path d="M10,50 Q50,10 90,50 T10,50" fill="none" stroke="currentColor" strokeWidth="4"></path>
                    </svg>
                </div>
            );
        case 'unit-converter':
            return (
                <div className="w-full h-full flex items-center justify-center gap-2 bg-slate-100 p-2">
                    <div className="text-center">
                        <div className="text-3xl font-black text-black">16</div>
                        <div className="text-xs font-bold uppercase text-black">PX</div>
                    </div>
                    <span className="material-symbols-outlined text-black font-bold">arrow_forward</span>
                    <div className="text-center">
                        <div className="text-3xl font-black text-black">1.0</div>
                        <div className="text-xs font-bold uppercase text-black">REM</div>
                    </div>
                </div>
            );
        case 'gradient-generator':
            return (
                <div className="w-full h-full bg-gradient-to-tr from-slate-900 to-slate-300"></div>
            );
        case 'contrast-checker':
            return (
                <div className="w-full h-full flex items-center justify-center bg-black">
                    <span className="text-5xl font-black text-white">Aa</span>
                </div>
            );
        case 'json-formatter':
            return (
                <div className="w-full h-full flex items-center justify-center bg-slate-800 text-white font-mono text-xl font-bold">
                    {'{ ... }'}
                </div>
            );
        case 'slug-generator':
            return (
                <div className="w-full h-full flex items-center justify-center bg-slate-200 text-black font-mono font-bold text-center p-4 break-words">
                    make-it-slug
                </div>
            );
        case 'word-counter':
            return (
                <div className="w-full h-full flex items-center justify-center bg-white border-4 border-slate-100 p-4">
                    <div className="w-full space-y-2">
                        <div className="h-3 bg-slate-200 w-3/4 rounded-full"></div>
                        <div className="h-3 bg-slate-200 w-full rounded-full"></div>
                        <div className="h-3 bg-slate-200 w-5/6 rounded-full"></div>
                        <div className="h-3 bg-slate-200 w-1/2 rounded-full"></div>
                    </div>
                </div>
            );
        case 'password-generator':
            return (
                <div className="w-full h-full flex items-center justify-center bg-black text-white font-mono text-2xl font-black tracking-[0.2em]">
                    *#@!&
                </div>
            );
        case 'markdown-previewer':
            return (
                <div className="w-full h-full flex p-4 bg-slate-100 font-mono text-xs font-bold text-black border-4 border-slate-200 items-center justify-center relative">
                    <span className="text-5xl font-black opacity-30">M↓</span>
                </div>
            );
        case 'image-compressor':
            return (
                <div className="w-full h-full flex items-center justify-center gap-2 bg-slate-100 relative overflow-hidden">
                    <div className="flex flex-col items-center">
                        <span className="material-symbols-outlined text-4xl text-black">image</span>
                        <span className="text-[10px] font-bold mt-1">2 MB</span>
                    </div>
                    <span className="material-symbols-outlined text-black font-bold text-sm">arrow_forward</span>
                    <div className="flex flex-col items-center">
                        <span className="material-symbols-outlined text-4xl text-black">photo_library</span>
                        <span className="text-[10px] font-bold mt-1">500 KB</span>
                    </div>
                </div>
            );
        case 'favicon-generator':
            return (
                <div className="w-full h-full flex items-center justify-center bg-slate-100 text-black">
                    <div className="grid grid-cols-2 gap-2">
                        <div className="w-8 h-8 bg-black flex items-center justify-center">
                            <span className="font-black text-white uppercase text-[8px]">32x</span>
                        </div>
                        <div className="w-8 h-8 bg-slate-400 flex items-center justify-center">
                            <span className="font-black text-black uppercase text-[8px]">16x</span>
                        </div>
                    </div>
                </div>
            );
        case 'tint-shade-generator':
            return (
                <div className="w-full h-full flex flex-col items-center bg-white cursor-crosshair">
                    <div className="w-full h-1/3 bg-slate-200"></div>
                    <div className="w-full h-1/3 bg-slate-500"></div>
                    <div className="w-full h-1/3 bg-slate-900 border-t-2 border-black flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-3xl opacity-50">exposure</span>
                    </div>
                </div>
            );
        case 'tailwind-shade-generator':
            return (
                <div className="w-full h-full flex items-center bg-slate-100">
                    <div className="flex-1 h-full bg-slate-200"></div>
                    <div className="flex-1 h-full bg-slate-400"></div>
                    <div className="flex-1 h-full mx-1 translate-y-2 bg-slate-700 border-2 border-black drop-shadow-md"></div>
                    <div className="flex-1 h-full bg-black"></div>
                </div>
            );
        case 'color-name-finder':
            return (
                <div className="w-full h-full bg-accent flex items-center justify-center relative">
                    <div className="absolute w-24 h-12 bg-white/40 backdrop-blur-sm border-2 border-black flex items-center justify-center transform -rotate-6 shadow-xl">
                        <span className="text-[10px] font-black tracking-widest text-black uppercase drop-shadow-sm">Accent</span>
                    </div>
                </div>
            );
        case 'accessible-color-pair-finder':
            return (
                <div className="w-full h-full flex flex-col items-center justify-center bg-black text-white relative">
                    <span className="text-6xl font-black mb-1">Aa</span>
                    <span className="text-[10px] uppercase font-black tracking-[0.3em] bg-white/10 text-white border border-white/50 px-3 py-1 -mt-2">Pass 12.0</span>
                </div>
            );
        case 'image-resizer':
            return (
                <div className="w-full h-full bg-slate-100 p-6 flex items-center justify-center">
                    <div className="w-20 h-14 border-4 dashed border-black flex items-center justify-center relative bg-white/50">
                        <span className="absolute -top-4 w-full text-center text-[10px] font-black font-mono">1920</span>
                        <span className="absolute -right-6 top-1/2 -translate-y-1/2 text-[10px] font-black font-mono rotate-90">1080</span>
                        <span className="material-symbols-outlined text-xl opacity-30">aspect_ratio</span>
                    </div>
                </div>
            );
        case 'base64-image-encoder':
            return (
                <div className="w-full h-full bg-slate-50 flex flex-col items-center justify-center gap-1 overflow-hidden p-4 border border-slate-200">
                    <div className="w-10 h-10 border-2 border-black bg-slate-200 mb-2 flex items-center justify-center"><span className="material-symbols-outlined text-black">image</span></div>
                    <div className="text-[8px] mt-1 font-mono font-bold leading-[10px] text-center w-[120%] text-slate-400 opacity-60 break-all select-none">
                        data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...
                    </div>
                </div>
            );
        case 'exif-metadata-viewer':
            return (
                <div className="w-full h-full bg-white flex flex-col p-4 border-2 border-slate-100 outline outline-4 outline-slate-50 outline-offset-[-12px]">
                    <div className="flex border-b-2 border-black pb-2 items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-xl text-accent">camera</span>
                        <div className="h-1.5 w-1/2 bg-slate-800"></div>
                    </div>
                    <div className="flex flex-col gap-1.5 opacity-50 pl-2 border-l border-slate-300">
                        <div className="h-1 w-3/4 bg-slate-400"></div>
                        <div className="h-1 w-1/2 bg-slate-400"></div>
                        <div className="h-1 w-2/3 bg-slate-400"></div>
                    </div>
                </div>
            );
        case 'noise-texture-generator':
            return (
                <div className="w-full h-full relative p-4 flex items-center justify-center bg-slate-900 overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')] mix-blend-overlay filter blur-[0.5px]"></div>
                    <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/10 to-black/40"></div>
                    <span className="material-symbols-outlined text-white opacity-40 text-4xl mix-blend-overlay z-10">grain</span>
                </div>
            );
        case 'diff-checker':
            return (
                <div className="w-full h-full flex relative border-4 border-white bg-slate-50">
                    <div className="flex-1 bg-slate-200 p-3 pt-6 flex flex-col gap-2 relative overflow-hidden border-r border-slate-300">
                        <div className="h-[2px] w-full bg-slate-400 relative"><div className="absolute inset-0 bg-white/40 top-1/2 rotate-1 scale-110 h-[1px]"></div></div>
                        <div className="h-1 w-3/4 bg-slate-300"></div>
                    </div>
                    <div className="flex-1 bg-accent/10 p-3 pt-6 flex flex-col gap-2 relative border-l border-slate-200">
                        <div className="h-2 w-[110%] bg-accent/20 box-content px-2 -ml-2 -mt-1"><div className="h-[2px] w-full bg-accent translate-y-1"></div></div>
                        <div className="h-1 w-4/5 bg-accent/40 translate-y-2"></div>
                    </div>
                </div>
            );
        case 'encoding-tools':
            return (
                <div className="w-full h-full flex flex-col justify-center items-center bg-black text-white p-2">
                    <div className="font-mono text-xl font-black">"UTF8"</div>
                    <span className="material-symbols-outlined block text-accent my-1 rotate-90 scale-75">sync_alt</span>
                    <div className="font-mono text-sm tracking-widest opacity-50">%22%</div>
                </div>
            );
        case 'box-shadow-generator':
            return (
                <div className="w-full h-full flex items-center justify-center bg-slate-100 relative pt-3 pl-3">
                    <div className="w-16 h-16 bg-white border-2 border-black drop-shadow-[6px_6px_0_theme(colors.accent)] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 relative group-hover:drop-shadow-[10px_10px_0_theme(colors.accent)] z-10">
                    </div>
                </div>
            );
        case 'grid-system-calculator':
            return (
                <div className="w-full h-full p-6 flex gap-3 h-full bg-slate-50 border-4 border-slate-200">
                    <div className="flex-1 border-x-4 border-x-accent/50 bg-slate-200 h-full w-4 relative isolate"></div>
                    <div className="flex-1 border-x-4 border-x-accent/50 bg-slate-200 h-full w-4 relative isolate"></div>
                    <div className="flex-1 border-x-4 border-x-accent/50 bg-slate-200 h-full w-4 relative hidden sm:block"></div>
                </div>
            );
        case 'button-style-generator':
            return (
                <div className="w-full h-full flex items-center justify-center bg-slate-100">
                    <div className="px-6 py-2 bg-accent text-white font-bold border-2 border-black brutalist-shadow text-xs">CLICK ME</div>
                </div>
            );
        case 'shadow-palette-generator':
            return (
                <div className="w-full h-full flex items-center justify-center bg-white relative">
                    <div className="w-12 h-12 bg-white border-2 border-black absolute translate-x-2 translate-y-2 opacity-20"></div>
                    <div className="w-12 h-12 bg-white border-2 border-black absolute translate-x-1 translate-y-1 opacity-50"></div>
                    <div className="w-12 h-12 bg-white border-2 border-black relative"></div>
                </div>
            );
        case 'border-radius-scale-generator':
            return (
                <div className="w-full h-full flex items-center justify-center bg-slate-200 p-4">
                    <div className="w-full h-full border-4 border-black border-t-8 border-l-8 rounded-tr-xl rounded-bl-3xl bg-white"></div>
                </div>
            );
        case 'skeleton-screen-generator':
            return (
                <div className="w-full h-full flex flex-col items-center justify-center bg-white p-4 gap-2">
                    <div className="w-12 h-12 bg-slate-200 self-start"></div>
                    <div className="w-full h-2 bg-slate-200"></div>
                    <div className="w-3/4 h-2 bg-slate-200 self-start"></div>
                </div>
            );
        case 'flexbox-playground':
            return (
                <div className="w-full h-full flex items-center justify-between p-2 bg-slate-100 border-4 border-white">
                    <div className="w-4 h-full bg-accent/20 border border-accent"></div>
                    <div className="w-8 h-full bg-accent/40 border border-accent"></div>
                    <div className="w-4 h-full bg-accent/20 border border-accent"></div>
                </div>
            );
        case 'golden-ratio-calculator':
            return (
                <div className="w-full h-full flex bg-slate-100 p-2 gap-1">
                    <div className="flex-[1.618] bg-white border border-black relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-full aspect-square border-l border-b border-black rounded-bl-full opacity-20"></div>
                    </div>
                    <div className="flex-1 flex flex-col gap-1">
                        <div className="flex-[1.618] bg-white border border-black"></div>
                        <div className="flex-1 bg-white border border-black"></div>
                    </div>
                </div>
            );
        case '8pt-grid-checker':
            return (
                <div className="w-full h-full bg-slate-50 relative overflow-hidden">
                    <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(to right, #ccc 1px, transparent 1px), linear-gradient(to bottom, #ccc 1px, transparent 1px)', backgroundSize: '8px 8px' }}></div>
                    <div className="absolute top-4 left-4 w-16 h-16 bg-accent/30 border-2 border-accent backdrop-blur-sm flex items-center justify-center">
                        <span className="font-mono text-[8px] font-bold text-accent">24px</span>
                    </div>
                </div>
            );
        case 'text-case-converter':
            return (
                <div className="w-full h-full flex flex-col items-center justify-center bg-black text-white p-2">
                    <span className="font-mono text-xl tracking-widest uppercase">UPPER</span>
                    <span className="material-symbols-outlined text-accent text-sm my-1">swap_vert</span>
                    <span className="font-mono text-sm opacity-50">camelCase</span>
                </div>
            );
        case 'lorem-ipsum-generator':
            return (
                <div className="w-full h-full bg-white p-4 overflow-hidden border-2 border-slate-100">
                    <p className="font-serif text-[6px] leading-[10px] text-slate-400 text-justify">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                    </p>
                </div>
            );
        case 'readability-checker':
            return (
                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100">
                    <div className="text-4xl font-black text-black">A+</div>
                    <div className="text-[8px] uppercase tracking-widest font-bold text-slate-500 mt-1">Grade Level</div>
                </div>
            );
        case 'fake-data-generator':
            return (
                <div className="w-full h-full bg-slate-50 p-2 flex flex-col gap-1 justify-center">
                    <div className="flex items-center gap-2 bg-white border border-slate-200 px-2 py-1">
                        <span className="material-symbols-outlined text-[10px] text-slate-400">person</span>
                        <div className="h-1.5 w-16 bg-slate-300"></div>
                    </div>
                    <div className="flex items-center gap-2 bg-white border border-slate-200 px-2 py-1">
                        <span className="material-symbols-outlined text-[10px] text-slate-400">mail</span>
                        <div className="h-1.5 w-10 bg-slate-300"></div>
                    </div>
                </div>
            );
        case 'character-map-browser':
            return (
                <div className="w-full h-full flex items-center justify-center bg-slate-900 border-4 border-slate-700">
                    <div className="grid grid-cols-2 gap-2 text-white font-mono text-xl">
                        <span className="opacity-50 hover:opacity-100 cursor-default">⌘</span>
                        <span className="opacity-50 hover:opacity-100 cursor-default">⌥</span>
                        <span className="opacity-50 hover:opacity-100 cursor-default">⇧</span>
                        <span className="text-accent hover:opacity-100 cursor-default">⎋</span>
                    </div>
                </div>
            );
        default:
            return (
                <div className="w-full h-full bg-gradient-to-br from-accent/10 to-accent/30 flex items-center justify-center">
                    <span className="material-symbols-outlined text-7xl text-accent opacity-30 select-none">
                        {icon || "precision_manufacturing"}
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
                    {getPreview(slug, icon)}
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
