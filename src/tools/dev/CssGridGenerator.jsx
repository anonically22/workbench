import React, { useState, useCallback } from 'react';
import { LayoutGrid, LayoutDashboard, Code2, Copy, Check, Trash2, Expand } from 'lucide-react';

// ─── BENTO LAYOUT PRESETS ────────────────────────────────────────────────────
const BENTO_PRESETS = [
    {
        label: '2+1 Stack',
        items: [
            { colStart: 1, colEnd: 3, rowStart: 1, rowEnd: 2 },
            { colStart: 1, colEnd: 2, rowStart: 2, rowEnd: 3 },
            { colStart: 2, colEnd: 3, rowStart: 2, rowEnd: 3 },
        ],
        cols: 2, rows: 2
    },
    {
        label: 'Hero + 3',
        items: [
            { colStart: 1, colEnd: 3, rowStart: 1, rowEnd: 2 },
            { colStart: 1, colEnd: 2, rowStart: 2, rowEnd: 3 },
            { colStart: 2, colEnd: 3, rowStart: 2, rowEnd: 3 },
            { colStart: 1, colEnd: 3, rowStart: 3, rowEnd: 4 },
        ],
        cols: 2, rows: 3
    },
    {
        label: 'Magazine',
        items: [
            { colStart: 1, colEnd: 3, rowStart: 1, rowEnd: 3 },
            { colStart: 3, colEnd: 4, rowStart: 1, rowEnd: 2 },
            { colStart: 3, colEnd: 4, rowStart: 2, rowEnd: 3 },
            { colStart: 1, colEnd: 2, rowStart: 3, rowEnd: 4 },
            { colStart: 2, colEnd: 4, rowStart: 3, rowEnd: 4 },
        ],
        cols: 3, rows: 3
    },
    {
        label: 'Mosaic',
        items: [
            { colStart: 1, colEnd: 2, rowStart: 1, rowEnd: 2 },
            { colStart: 2, colEnd: 4, rowStart: 1, rowEnd: 3 },
            { colStart: 1, colEnd: 2, rowStart: 2, rowEnd: 3 },
            { colStart: 1, colEnd: 3, rowStart: 3, rowEnd: 4 },
            { colStart: 3, colEnd: 4, rowStart: 3, rowEnd: 4 },
        ],
        cols: 3, rows: 3
    },
];

const ACCENT_COLORS = ['#6366f1', '#f43f5e', '#10b981', '#f59e0b', '#3b82f6', '#ec4899'];

// ─── GRID BUILDER MODE ───────────────────────────────────────────────────────
function GridBuilderMode() {
    const [cols, setCols] = useState(3);
    const [rows, setRows] = useState(3);
    const [colGap, setColGap] = useState(16);
    const [rowGap, setRowGap] = useState(16);
    const [activeCells, setActiveCells] = useState([]);
    const [copiedContent, setCopiedContent] = useState('');

    const toggleCell = (x, y) => {
        const id = `${x},${y}`;
        setActiveCells(prev =>
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
        );
    };

    const handleCopyHtml = () => {
        const htmlStr = `<div class="grid-container">\n${activeCells.map((_, i) => `  <div class="grid-item">Item ${i + 1}</div>`).join('\n')}\n</div>`;
        navigator.clipboard.writeText(htmlStr);
        setCopiedContent('html');
        setTimeout(() => setCopiedContent(''), 2000);
    };

    const handleCopyCss = () => {
        const cssStr = `.grid-container {\n  display: grid;\n  grid-template-columns: repeat(${cols}, 1fr);\n  grid-template-rows: repeat(${rows}, 1fr);\n  column-gap: ${colGap}px;\n  row-gap: ${rowGap}px;\n}`;
        navigator.clipboard.writeText(cssStr);
        setCopiedContent('css');
        setTimeout(() => setCopiedContent(''), 2000);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Controls */}
            <div className="bg-white border-4 border-black p-6 brutalist-shadow space-y-8 h-fit">
                <div className="flex items-center gap-3 border-b-2 border-black pb-4">
                    <LayoutGrid size={22} className="text-accent" />
                    <h3 className="font-black uppercase tracking-[0.2em]">Grid Setup</h3>
                </div>
                <div className="grid grid-cols-2 gap-6">
                    {[['Columns', cols, setCols, 12], ['Rows', rows, setRows, 12]].map(([label, val, set, max]) => (
                        <div key={label} className="space-y-3">
                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 flex justify-between">
                                {label} <span>{val}</span>
                            </label>
                            <input type="range" min="1" max={max} value={val} onChange={e => { set(Number(e.target.value)); setActiveCells([]); }}
                                className="w-full accent-black h-2 bg-slate-200 rounded-none cursor-pointer" />
                        </div>
                    ))}
                    {[['Column Gap', colGap, setColGap], ['Row Gap', rowGap, setRowGap]].map(([label, val, set]) => (
                        <div key={label} className="space-y-3 col-span-2">
                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 flex justify-between">
                                {label} <span>{val}px</span>
                            </label>
                            <input type="range" min="0" max="64" step="4" value={val} onChange={e => set(Number(e.target.value))}
                                className="w-full accent-black h-2 bg-slate-200 rounded-none cursor-pointer" />
                        </div>
                    ))}
                </div>
                <button onClick={() => setActiveCells([])}
                    className="w-full py-3 text-xs font-bold uppercase tracking-widest border-2 border-black hover:bg-red-50 hover:text-red-500 flex items-center justify-center gap-2 transition-colors">
                    <Trash2 size={14} /> Reset Items
                </button>
            </div>

            {/* Grid Canvas */}
            <div className="lg:col-span-2 bg-slate-100 border-4 border-black p-6 brutalist-shadow flex flex-col min-h-[500px]">
                <div className="flex justify-between items-center mb-5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Click cells to add items</span>
                    <span className="text-[10px] font-mono font-bold bg-white px-2 py-1 border border-black">{cols}×{rows}</span>
                </div>
                <div className="flex-1 bg-white border border-slate-200 p-4 shadow-inner">
                    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)`, columnGap: colGap, rowGap: rowGap, height: '100%' }}>
                        {Array.from({ length: rows }).map((_, y) =>
                            Array.from({ length: cols }).map((_, x) => {
                                const id = `${x},${y}`;
                                const isActive = activeCells.includes(id);
                                return (
                                    <button key={id} onClick={() => toggleCell(x, y)}
                                        className={`border-2 flex items-center justify-center transition-all duration-150 min-h-[48px]
                                        ${isActive ? 'bg-accent text-white border-black' : 'bg-slate-50 border-dashed border-slate-300 hover:border-black/40 hover:bg-slate-100'}`}>
                                        {isActive && <span className="font-black text-xl">{activeCells.indexOf(id) + 1}</span>}
                                    </button>
                                );
                            })
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-5">
                    {[['Copy HTML', 'html', handleCopyHtml, Code2], ['Copy CSS', 'css', handleCopyCss, Copy]].map(([label, key, fn, Icon]) => (
                        <button key={key} onClick={fn}
                            className={`h-12 font-black uppercase tracking-widest border-2 border-black flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0 transition-transform
                                ${key === 'css' ? 'bg-accent text-white' : 'bg-black text-white'}`}>
                            {copiedContent === key ? <Check size={16} /> : <Icon size={16} />}
                            {copiedContent === key ? `${key.toUpperCase()} Copied!` : label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ─── BENTO LAYOUT MAKER ─────────────────────────────────────────────────────
function BentoMakerMode() {
    const [cols, setCols] = useState(3);
    const [rows, setRows] = useState(3);
    const [gap, setGap] = useState(12);
    const [items, setItems] = useState(BENTO_PRESETS[0].items);
    const [selectedPreset, setSelectedPreset] = useState(0);
    const [copied, setCopied] = useState(false);
    const [editingItem, setEditingItem] = useState(null); // index being edited
    const [itemColors, setItemColors] = useState(['#6366f1', '#f43f5e', '#10b981', '#f59e0b', '#3b82f6']);

    const applyPreset = (i) => {
        const p = BENTO_PRESETS[i];
        setSelectedPreset(i);
        setItems(p.items);
        setCols(p.cols);
        setRows(p.rows);
        setEditingItem(null);
    };

    const addItem = () => {
        setItems(prev => [...prev, { colStart: 1, colEnd: 2, rowStart: 1, rowEnd: 2 }]);
        setEditingItem(items.length);
    };

    const removeItem = (idx) => {
        setItems(prev => prev.filter((_, i) => i !== idx));
        setEditingItem(null);
    };

    const updateItem = (idx, field, val) => {
        setItems(prev => prev.map((it, i) => i === idx ? { ...it, [field]: Number(val) } : it));
    };

    const generateCSS = () => {
        const containerCss = `.bento-grid {\n  display: grid;\n  grid-template-columns: repeat(${cols}, 1fr);\n  grid-template-rows: repeat(${rows}, 1fr);\n  gap: ${gap}px;\n  min-height: 400px;\n}\n`;
        const itemsCss = items.map((it, i) => `.bento-item-${i + 1} {\n  grid-column: ${it.colStart} / ${it.colEnd};\n  grid-row: ${it.rowStart} / ${it.rowEnd};\n}`).join('\n');
        return containerCss + itemsCss;
    };

    const generateHTML = () => {
        return `<div class="bento-grid">\n${items.map((_, i) => `  <div class="bento-item-${i + 1}">Item ${i + 1}</div>`).join('\n')}\n</div>`;
    };

    const handleCopyCSS = () => {
        navigator.clipboard.writeText(generateCSS());
        setCopied('css');
        setTimeout(() => setCopied(false), 2000);
    };

    const handleCopyHTML = () => {
        navigator.clipboard.writeText(generateHTML());
        setCopied('html');
        setTimeout(() => setCopied(false), 2000);
    };

    const itemColor = (i) => ACCENT_COLORS[i % ACCENT_COLORS.length];

    return (
        <div className="space-y-8">
            {/* Grid Config */}
            <div className="bg-white border-4 border-black p-6 brutalist-shadow grid grid-cols-2 md:grid-cols-4 gap-6">
                {[['Columns', cols, setCols, 1, 8], ['Rows', rows, setRows, 1, 8]].map(([label, val, set, min, max]) => (
                    <div key={label} className="space-y-2">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 flex justify-between">{label} <span>{val}</span></label>
                        <input type="range" min={min} max={max} value={val} onChange={e => set(Number(e.target.value))}
                            className="w-full accent-black" />
                    </div>
                ))}
                <div className="space-y-2">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 flex justify-between">Gap <span>{gap}px</span></label>
                    <input type="range" min="0" max="40" step="4" value={gap} onChange={e => setGap(Number(e.target.value))}
                        className="w-full accent-black" />
                </div>
                <button onClick={addItem}
                    className="self-end bg-black text-white h-11 font-black text-xs uppercase tracking-widest border-2 border-black hover:-translate-y-0.5 transition-transform flex items-center justify-center gap-2">
                    + Add Item
                </button>
            </div>

            {/* Presets */}
            <div className="flex gap-3 flex-wrap">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 self-center mr-2">Presets:</span>
                {BENTO_PRESETS.map((p, i) => (
                    <button key={p.label} onClick={() => applyPreset(i)}
                        className={`px-4 py-2 text-xs font-black uppercase tracking-widest border-2 border-black transition-colors
                            ${selectedPreset === i ? 'bg-black text-white' : 'bg-white hover:bg-slate-100'}`}>
                        {p.label}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Live Bento Preview */}
                <div className="lg:col-span-2 bg-[#0f0f11] border-4 border-black p-6 min-h-[500px] flex flex-col">
                    <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-4">Live Preview — {cols}×{rows} Bento Grid</div>
                    <div
                        className="flex-1"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: `repeat(${cols}, 1fr)`,
                            gridTemplateRows: `repeat(${rows}, 1fr)`,
                            gap: `${gap}px`,
                        }}
                    >
                        {items.map((item, i) => (
                            <div
                                key={i}
                                onClick={() => setEditingItem(editingItem === i ? null : i)}
                                className={`relative cursor-pointer flex items-center justify-center rounded-[4px] transition-all duration-200 border-2 group
                                    ${editingItem === i ? 'border-white scale-[0.97]' : 'border-transparent hover:border-white/30'}`}
                                style={{
                                    gridColumn: `${item.colStart} / ${item.colEnd}`,
                                    gridRow: `${item.rowStart} / ${item.rowEnd}`,
                                    backgroundColor: itemColor(i),
                                    opacity: editingItem !== null && editingItem !== i ? 0.6 : 1,
                                    minHeight: 60,
                                }}
                            >
                                <span className="font-black text-white text-2xl opacity-60 select-none">{i + 1}</span>
                                {editingItem === i && (
                                    <button onClick={(e) => { e.stopPropagation(); removeItem(i); }}
                                        className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white flex items-center justify-center text-xs border border-red-700">
                                        <Trash2 size={12} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Item Editor + Output */}
                <div className="space-y-6">
                    {/* Item Editor */}
                    <div className="bg-white border-4 border-black p-5 brutalist-shadow space-y-5">
                        <h4 className="font-black uppercase tracking-widest text-sm border-b-2 border-black pb-3">
                            {editingItem !== null ? `Edit Item ${editingItem + 1}` : 'Click item to edit'}
                        </h4>
                        {editingItem !== null && editingItem < items.length ? (
                            <div className="grid grid-cols-2 gap-4">
                                {['colStart', 'colEnd', 'rowStart', 'rowEnd'].map(field => (
                                    <div key={field} className="space-y-1">
                                        <label className="block text-[9px] font-black uppercase tracking-widest text-slate-400">
                                            {field.replace(/([A-Z])/g, ' $1')}
                                        </label>
                                        <input
                                            type="number" min="1" max={field.startsWith('col') ? cols + 1 : rows + 1}
                                            value={items[editingItem][field]}
                                            onChange={e => updateItem(editingItem, field, e.target.value)}
                                            className="w-full border-2 border-black p-2 font-mono font-bold text-center focus:outline-none focus:ring-2 focus:ring-accent"
                                        />
                                    </div>
                                ))}
                                <div className="col-span-2 text-[9px] font-bold text-slate-400 leading-relaxed">
                                    Span: {items[editingItem].colEnd - items[editingItem].colStart} col(s) × {items[editingItem].rowEnd - items[editingItem].rowStart} row(s)
                                </div>
                            </div>
                        ) : (
                            <p className="text-xs font-bold text-slate-400 leading-relaxed">
                                Click any item in the preview to set its column and row spans.
                            </p>
                        )}
                    </div>

                    {/* Export Buttons */}
                    <div className="space-y-3">
                        {[['Copy CSS', 'css', handleCopyCSS], ['Copy HTML', 'html', handleCopyHTML]].map(([label, key, fn]) => (
                            <button key={key} onClick={fn}
                                className={`w-full h-12 font-black uppercase tracking-widest border-2 border-black flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0 transition-transform
                                    ${key === 'css' ? 'bg-accent text-white' : 'bg-black text-white'}`}>
                                {copied === key ? <Check size={16} /> : <Copy size={16} />}
                                {copied === key ? `${key.toUpperCase()} Copied!` : label}
                            </button>
                        ))}
                    </div>

                    {/* Generated CSS Preview */}
                    <div className="bg-slate-900 text-white p-4 border-2 border-black overflow-auto max-h-48">
                        <pre className="text-[10px] font-mono whitespace-pre-wrap">{generateCSS()}</pre>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function CssGridGenerator() {
    const [mode, setMode] = useState('grid'); // 'grid' | 'bento'

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Mode Toggle */}
            <div className="bg-white border-4 border-black p-2 brutalist-shadow flex gap-2 w-fit">
                <button
                    onClick={() => setMode('grid')}
                    className={`flex items-center gap-2 px-6 py-3 font-black uppercase tracking-widest text-sm border-2 border-transparent transition-colors ${mode === 'grid' ? 'bg-black text-white' : 'text-slate-500 hover:text-black'}`}
                >
                    <LayoutGrid size={18} /> Grid Builder
                </button>
                <button
                    onClick={() => setMode('bento')}
                    className={`flex items-center gap-2 px-6 py-3 font-black uppercase tracking-widest text-sm border-2 border-transparent transition-colors ${mode === 'bento' ? 'bg-black text-white' : 'text-slate-500 hover:text-black'}`}
                >
                    <LayoutDashboard size={18} /> Bento Maker
                </button>
            </div>

            {mode === 'grid' ? <GridBuilderMode /> : <BentoMakerMode />}
        </div>
    );
}
