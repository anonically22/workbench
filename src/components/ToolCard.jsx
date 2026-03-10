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
