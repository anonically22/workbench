import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSiteConfig } from '../context/SiteConfigContext';
import { tools } from '../data/tools';
import { ArrowLeft, Star, StarOff, GripVertical, RotateCcw } from 'lucide-react';

export default function ManagePanel() {
    const { homepageMode, enableThemes, featuredTools, updateConfig, resetConfig } = useSiteConfig();
    const [search, setSearch] = useState('');
    const [dragIdx, setDragIdx] = useState(null);

    // ── Helpers ──────────────────────────────────────────────────────
    const isFeatured = (slug) => featuredTools.includes(slug);

    const toggleFeatured = (slug) => {
        if (isFeatured(slug)) {
            updateConfig({ featuredTools: featuredTools.filter(s => s !== slug) });
        } else {
            if (featuredTools.length >= 6) return; // cap at 6
            updateConfig({ featuredTools: [...featuredTools, slug] });
        }
    };

    const removeFeatured = (slug) => {
        updateConfig({ featuredTools: featuredTools.filter(s => s !== slug) });
    };

    const moveFeatured = (from, to) => {
        const arr = [...featuredTools];
        const [item] = arr.splice(from, 1);
        arr.splice(to, 0, item);
        updateConfig({ featuredTools: arr });
    };

    // Drag & drop for reordering
    const handleDragStart = (idx) => setDragIdx(idx);
    const handleDragOver = (e, idx) => {
        e.preventDefault();
        if (dragIdx === null || dragIdx === idx) return;
        moveFeatured(dragIdx, idx);
        setDragIdx(idx);
    };
    const handleDragEnd = () => setDragIdx(null);

    // Filter tools by search
    const filteredTools = tools.filter(t =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.slug.toLowerCase().includes(search.toLowerCase()) ||
        t.id?.toLowerCase().includes(search.toLowerCase())
    );

    // Resolve featured slugs to tool objects
    const featuredToolObjects = featuredTools
        .map(slug => tools.find(t => t.slug === slug))
        .filter(Boolean);

    return (
        <div className="animate-in fade-in duration-300 pb-20">
            {/* Header */}
            <div className="flex items-center justify-between mb-10">
                <div>
                    <Link to="/" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent hover:underline mb-3">
                        <ArrowLeft size={14} /> Back to Workbench
                    </Link>
                    <h1 className="text-3xl font-black uppercase tracking-[0.15em]">Manage Panel</h1>
                    <p className="text-sm font-bold text-slate-500 mt-1 uppercase tracking-widest">Site Configuration</p>
                </div>
                <button
                    onClick={resetConfig}
                    className="border-2 border-black px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-red-50 hover:border-red-500 hover:text-red-600 transition-colors flex items-center gap-2"
                >
                    <RotateCcw size={14} />
                    Reset to Defaults
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* ── Left Column: Settings ────────────────────────────── */}
                <div className="space-y-8">

                    {/* Homepage Mode */}
                    <section className="border-2 border-black bg-white p-6 brutalist-shadow">
                        <h2 className="text-sm font-black uppercase tracking-[0.2em] mb-6 border-b-2 border-black pb-3">Homepage Settings</h2>
                        <div className="space-y-3">
                            {[
                                { value: 'classic', label: 'Classic Homepage', desc: 'Standard tool grid layout' },
                                { value: 'enhanced', label: 'Enhanced Homepage', desc: 'Includes Featured Tools section' },
                            ].map(opt => (
                                <button
                                    key={opt.value}
                                    onClick={() => updateConfig({ homepageMode: opt.value })}
                                    className={`w-full text-left p-4 border-2 transition-colors ${
                                        homepageMode === opt.value
                                            ? 'border-accent bg-accent/5'
                                            : 'border-slate-200 hover:border-black'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-4 h-4 border-2 flex items-center justify-center ${
                                            homepageMode === opt.value ? 'border-accent bg-accent' : 'border-black'
                                        }`}>
                                            {homepageMode === opt.value && <div className="w-1.5 h-1.5 bg-white" />}
                                        </div>
                                        <div>
                                            <div className="text-xs font-black uppercase tracking-widest">{opt.label}</div>
                                            <div className="text-[10px] text-slate-500 font-bold mt-0.5">{opt.desc}</div>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Revert button */}
                        <button
                            onClick={() => updateConfig({ homepageMode: 'classic' })}
                            disabled={homepageMode === 'classic'}
                            className={`w-full mt-4 px-4 py-3 border-2 text-xs font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2 ${
                                homepageMode === 'classic'
                                    ? 'border-slate-200 text-slate-300 cursor-not-allowed'
                                    : 'border-black hover:bg-black hover:text-white'
                            }`}
                        >
                            <RotateCcw size={12} />
                            Revert to Classic Layout
                        </button>
                    </section>

                    {/* Theme Toggle */}
                    <section className="border-2 border-black bg-white p-6 brutalist-shadow">
                        <h2 className="text-sm font-black uppercase tracking-[0.2em] mb-6 border-b-2 border-black pb-3">Theme Settings</h2>
                        <button
                            onClick={() => updateConfig({ enableThemes: !enableThemes })}
                            className="w-full flex items-center justify-between p-4 border-2 border-slate-200 hover:border-black transition-colors"
                        >
                            <div>
                                <div className="text-xs font-black uppercase tracking-widest">Enable Theme Switching</div>
                                <div className="text-[10px] text-slate-500 font-bold mt-0.5">
                                    {enableThemes ? 'Users can switch themes via the palette button' : 'Theme switcher hidden from main site'}
                                </div>
                            </div>
                            <div className={`w-12 h-6 border-2 border-black relative transition-colors ${enableThemes ? 'bg-accent' : 'bg-slate-200'}`}>
                                <div className={`absolute top-0.5 w-4 h-4 bg-white border border-black transition-all ${enableThemes ? 'left-[22px]' : 'left-0.5'}`} />
                            </div>
                        </button>
                    </section>

                    {/* Featured Tools Order */}
                    <section className="border-2 border-black bg-white p-6 brutalist-shadow">
                        <h2 className="text-sm font-black uppercase tracking-[0.2em] mb-2 border-b-2 border-black pb-3">
                            Featured Tools ({featuredTools.length}/6)
                        </h2>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Drag to reorder · Click ✕ to remove</p>

                        {featuredToolObjects.length === 0 ? (
                            <div className="py-8 text-center border-2 border-dashed border-slate-200">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No featured tools selected</p>
                                <p className="text-[10px] text-slate-300 mt-1">Star tools from the list on the right →</p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {featuredToolObjects.map((tool, idx) => (
                                    <div
                                        key={tool.slug}
                                        draggable
                                        onDragStart={() => handleDragStart(idx)}
                                        onDragOver={(e) => handleDragOver(e, idx)}
                                        onDragEnd={handleDragEnd}
                                        className={`flex items-center gap-3 p-3 border-2 transition-colors cursor-grab active:cursor-grabbing
                                            ${dragIdx === idx ? 'border-accent bg-accent/5' : 'border-slate-200 hover:border-black'}`}
                                    >
                                        <GripVertical size={14} className="text-slate-300 flex-shrink-0" />
                                        <span className="text-[10px] font-mono text-slate-400 w-12 flex-shrink-0">{tool.id}</span>
                                        <span className="text-xs font-black uppercase tracking-widest flex-1 truncate">{tool.name}</span>
                                        <button
                                            onClick={() => removeFeatured(tool.slug)}
                                            className="text-slate-400 hover:text-red-500 transition-colors text-sm font-black"
                                            title="Remove from featured"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </div>

                {/* ── Right Column: All Tools List ────────────────────── */}
                <div className="lg:col-span-2">
                    <section className="border-2 border-black bg-white p-6 brutalist-shadow">
                        <div className="flex items-center justify-between mb-6 border-b-2 border-black pb-3">
                            <h2 className="text-sm font-black uppercase tracking-[0.2em]">All Tools ({tools.length})</h2>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                Click ★ to feature
                            </div>
                        </div>

                        {/* Search */}
                        <div className="mb-6">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search tools by name, slug or ID..."
                                className="w-full border-2 border-black px-4 py-2.5 text-xs font-bold uppercase tracking-widest placeholder:text-slate-300 focus:outline-none focus:border-accent"
                            />
                        </div>

                        {/* Tool List */}
                        <div className="space-y-1 max-h-[600px] overflow-y-auto pr-2">
                            {filteredTools.map(tool => {
                                const featured = isFeatured(tool.slug);
                                return (
                                    <div
                                        key={tool.slug}
                                        className={`flex items-center gap-4 px-4 py-3 border-2 transition-colors ${
                                            featured ? 'border-accent/50 bg-accent/5' : 'border-transparent hover:border-slate-200'
                                        }`}
                                    >
                                        <button
                                            onClick={() => toggleFeatured(tool.slug)}
                                            className={`flex-shrink-0 transition-colors ${
                                                featured ? 'text-accent' : 'text-slate-300 hover:text-accent'
                                            }`}
                                            title={featured ? 'Remove from featured' : featuredTools.length >= 6 ? 'Max 6 featured' : 'Add to featured'}
                                            disabled={!featured && featuredTools.length >= 6}
                                        >
                                            {featured ? <Star size={16} fill="currentColor" /> : <StarOff size={16} />}
                                        </button>
                                        <span className="text-[10px] font-mono text-slate-400 w-14 flex-shrink-0">{tool.id}</span>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-xs font-black uppercase tracking-widest truncate">{tool.name}</div>
                                            <div className="text-[10px] text-slate-400 font-bold truncate">{tool.description}</div>
                                        </div>
                                        <span className="text-[9px] font-bold uppercase tracking-widest border border-slate-200 px-2 py-0.5 text-slate-400 flex-shrink-0 hidden sm:block">
                                            {tool.category}
                                        </span>
                                    </div>
                                );
                            })}
                            {filteredTools.length === 0 && (
                                <div className="py-12 text-center">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No tools match "{search}"</p>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
