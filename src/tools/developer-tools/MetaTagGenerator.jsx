import { useState } from 'react';
import { Globe, Copy, RefreshCw, Search, Info, Tag } from 'lucide-react';

export default function MetaTagGenerator() {
    const [title, setTitle] = useState('Nixby — Personal Design Toolkit');
    const [desc, setDesc] = useState('A collection of single-purpose browser tools for designers and developers.');
    const [url, setUrl] = useState('https://nixby.design');
    const [image, setImage] = useState('https://nixby.design/og.png');

    const tags = `
<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}">
<meta name="description" content="${desc}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="${image}">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${url}">
<meta property="twitter:title" content="${title}">
<meta property="twitter:description" content="${desc}">
<meta property="twitter:image" content="${image}">
`.trim();

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-sidebar p-8 rounded-[40px] border border-border space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-2">Site Title</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-4 bg-background border border-border rounded-xl font-bold text-sm outline-none focus:border-primary" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-2">Description</label>
                            <textarea value={desc} onChange={(e) => setDesc(e.target.value)} className="w-full p-4 bg-background border border-border rounded-xl text-sm outline-none focus:border-primary h-24" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-2">Canonical URL</label>
                            <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} className="w-full p-4 bg-background border border-border rounded-xl font-mono text-xs outline-none focus:border-primary" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-2">OG Image URL</label>
                            <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="w-full p-4 bg-background border border-border rounded-xl font-mono text-xs outline-none focus:border-primary" />
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-primary/5 rounded-[40px] border border-primary/10 flex items-start gap-4">
                    <Info size={24} className="text-primary shrink-0" />
                    <div className="space-y-1">
                        <p className="text-xs font-bold text-text-primary">SEO Best Practice</p>
                        <p className="text-[11px] text-text-secondary leading-relaxed">
                            Keep titles under 60 characters and descriptions under 160 to avoid truncation in Google search results.
                        </p>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
                <div className="bg-sidebar h-[300px] rounded-[40px] border border-border overflow-hidden flex flex-col shadow-inner">
                    <div className="p-4 bg-white border-b border-border flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Search Result Preview</span>
                        <Globe size={16} className="text-text-secondary" />
                    </div>
                    <div className="flex-1 p-8 space-y-2">
                        <span className="text-[11px] text-slate-500 block">{url}</span>
                        <h4 className="text-xl text-blue-700 hover:underline cursor-pointer">{title}</h4>
                        <p className="text-sm text-slate-600 line-clamp-2">{desc}</p>
                    </div>
                </div>

                <div className="bg-slate-900 p-8 rounded-[40px] text-white shadow-xl relative group">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                            <Tag size={16} className="text-primary" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Head Tags Bundle</span>
                        </div>
                        <button
                            onClick={() => navigator.clipboard.writeText(tags)}
                            className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest hover:underline"
                        >
                            <Copy size={14} /> Copy Code
                        </button>
                    </div>
                    <pre className="font-mono text-[10px] opacity-80 leading-relaxed overflow-x-auto whitespace-pre">
                        {tags}
                    </pre>
                </div>
            </div>
        </div>
    );
}
