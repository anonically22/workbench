import React, { useState, useRef, useEffect } from 'react';
import { Box, Copy, Check, ZoomIn, ZoomOut, RotateCcw, Crosshair } from 'lucide-react';

const EXAMPLES = [
    { label: 'Circle', viewBox: '0 0 100 100', d: 'M 50 10 C 20 10 10 40 10 60 C 10 80 40 90 50 90 C 60 90 90 80 90 60 C 90 40 80 10 50 10 Z' },
    { label: 'Arrow', viewBox: '0 0 24 24', d: 'M 5 12 L 19 12 M 12 5 L 19 12 L 12 19' },
    { label: 'Star', viewBox: '0 0 100 100', d: 'M 50 10 L 61 35 L 90 35 L 68 57 L 78 82 L 50 65 L 22 82 L 32 57 L 10 35 L 39 35 Z' },
    { label: 'Heart', viewBox: '0 0 100 100', d: 'M 50 80 C 10 50 10 10 30 5 C 40 2 50 12 50 20 C 50 12 60 2 70 5 C 90 10 90 50 50 80 Z' },
    { label: 'House', viewBox: '0 0 100 100', d: 'M 10 50 L 50 10 L 90 50 L 80 50 L 80 90 L 60 90 L 60 65 L 40 65 L 40 90 L 20 90 L 20 50 Z' },
];

const FILL_OPTIONS = [
    { label: 'None', value: 'none' },
    { label: 'Stroke Color', value: 'stroke' },
    { label: 'Semi-Transparent', value: 'rgba(99,102,241,0.15)' },
    { label: 'Black 10%', value: 'rgba(0,0,0,0.10)' },
];

export default function SvgPathVisualizer() {
    const [pathData, setPathData] = useState(EXAMPLES[0].d);
    const [viewBox, setViewBox] = useState(EXAMPLES[0].viewBox);
    const [strokeColor, setStrokeColor] = useState('#6366f1');
    const [strokeWidth, setStrokeWidth] = useState(2);
    const [fillOption, setFillOption] = useState('none');
    const [zoom, setZoom] = useState(1);
    const [showGrid, setShowGrid] = useState(true);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState(false);

    const svgRef = useRef(null);

    const resolvedFill = fillOption === 'stroke' ? strokeColor : fillOption;

    const handlePathChange = (val) => {
        setPathData(val);
        setError(false);
    };

    const handleExample = (ex) => {
        setPathData(ex.d);
        setViewBox(ex.viewBox);
        setError(false);
    };

    const handleCopy = () => {
        const css = `path {\n  d: path("${pathData}");\n  stroke: ${strokeColor};\n  stroke-width: ${strokeWidth};\n  fill: ${resolvedFill};\n}`;
        navigator.clipboard.writeText(css);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSvgError = () => setError(true);

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Quick Examples */}
            <div className="bg-white border-4 border-black p-4 brutalist-shadow flex flex-wrap gap-3 items-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mr-2">Examples:</span>
                {EXAMPLES.map(ex => (
                    <button
                        key={ex.label}
                        onClick={() => handleExample(ex)}
                        className={`px-4 py-1.5 text-xs font-black uppercase tracking-widest border-2 border-black transition-colors hover:bg-black hover:text-white ${pathData === ex.d ? 'bg-black text-white' : 'bg-white text-black'}`}
                    >
                        {ex.label}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Controls */}
                <div className="bg-white border-4 border-black p-6 brutalist-shadow space-y-6">
                    <div className="flex items-center gap-3 border-b-2 border-black pb-4">
                        <Box size={22} className="text-accent" />
                        <h3 className="font-black uppercase tracking-[0.2em]">Path Config</h3>
                    </div>

                    <div className="space-y-3">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">
                            SVG Path Data (d="...")
                        </label>
                        <textarea
                            value={pathData}
                            onChange={e => handlePathChange(e.target.value)}
                            className={`w-full h-36 border-2 p-3 font-mono text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-accent resize-y ${error ? 'border-red-500' : 'border-black'}`}
                            placeholder="M 10 10 L 90 90 Z"
                            spellCheck={false}
                        />
                        {error && <p className="text-xs font-bold text-red-500">Invalid path data – check syntax.</p>}
                    </div>

                    <div className="space-y-3">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                            <Crosshair size={12} /> ViewBox
                        </label>
                        <input
                            type="text"
                            value={viewBox}
                            onChange={e => setViewBox(e.target.value)}
                            className="w-full border-2 border-black p-3 font-mono text-xs font-bold bg-white focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t-2 border-dashed border-slate-200">
                        <div className="space-y-2">
                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">Stroke</label>
                            <div className="flex gap-2">
                                <input
                                    type="color"
                                    value={strokeColor}
                                    onChange={e => setStrokeColor(e.target.value)}
                                    className="h-10 w-12 border-2 border-black cursor-pointer p-0 shrink-0"
                                />
                                <input
                                    type="text"
                                    value={strokeColor}
                                    onChange={e => setStrokeColor(e.target.value)}
                                    className="flex-1 border-2 border-black p-2 font-mono text-xs font-bold bg-white focus:outline-none"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 flex justify-between">
                                Width <span>{strokeWidth}px</span>
                            </label>
                            <input
                                type="range" min="0.5" max="10" step="0.5"
                                value={strokeWidth}
                                onChange={e => setStrokeWidth(Number(e.target.value))}
                                className="w-full accent-black mt-4"
                            />
                        </div>
                        <div className="space-y-2 col-span-2">
                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">Fill</label>
                            <div className="grid grid-cols-2 gap-2">
                                {FILL_OPTIONS.map(opt => (
                                    <button
                                        key={opt.label}
                                        onClick={() => setFillOption(opt.value)}
                                        className={`py-2 text-[10px] font-black uppercase tracking-widest border-2 border-black transition-colors ${fillOption === opt.value ? 'bg-black text-white' : 'bg-white'}`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Live Preview */}
                <div className="lg:col-span-2 bg-[#0f0f11] border-4 border-black p-4 flex flex-col min-h-[520px]">
                    {/* Toolbar */}
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex gap-2">
                            <button onClick={() => setShowGrid(g => !g)}
                                className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-widest border border-white/20 transition-colors ${showGrid ? 'bg-white text-black' : 'text-white'}`}>
                                Grid
                            </button>
                            <button onClick={() => setZoom(z => Math.min(z + 0.25, 3))}
                                className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest border border-white/20 text-white hover:bg-white/10 flex items-center gap-1">
                                <ZoomIn size={12} /> In
                            </button>
                            <button onClick={() => setZoom(z => Math.max(z - 0.25, 0.25))}
                                className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest border border-white/20 text-white hover:bg-white/10 flex items-center gap-1">
                                <ZoomOut size={12} /> Out
                            </button>
                            <button onClick={() => setZoom(1)}
                                className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest border border-white/20 text-white hover:bg-white/10 flex items-center gap-1">
                                <RotateCcw size={12} /> Reset
                            </button>
                        </div>
                        <span className="text-[10px] font-mono text-white/40">{Math.round(zoom * 100)}%</span>
                    </div>

                    {/* Canvas */}
                    <div className="flex-1 relative overflow-hidden flex items-center justify-center">
                        {/* Background grid */}
                        {showGrid && (
                            <div
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)',
                                    backgroundSize: '20px 20px'
                                }}
                            />
                        )}

                        {/* Checkerboard behind svg to show transparency */}
                        <div
                            className="border border-white/10"
                            style={{
                                width: 280 * zoom,
                                height: 280 * zoom,
                                backgroundImage: 'repeating-conic-gradient(#222 0% 25%, #1a1a1a 0% 50%)',
                                backgroundSize: '16px 16px',
                                transition: 'width 0.2s, height 0.2s'
                            }}
                        >
                            <svg
                                ref={svgRef}
                                viewBox={viewBox}
                                xmlns="http://www.w3.org/2000/svg"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    stroke: strokeColor,
                                    strokeWidth: strokeWidth,
                                    fill: resolvedFill,
                                    strokeLinecap: 'round',
                                    strokeLinejoin: 'round',
                                    overflow: 'visible'
                                }}
                            >
                                <path d={pathData} />
                            </svg>
                        </div>

                        {/* ViewBox badge */}
                        <div className="absolute bottom-3 left-3 bg-black/70 text-white text-[9px] font-mono px-2 py-1 border border-white/20">
                            viewBox: {viewBox}
                        </div>
                    </div>

                    {/* Export bar */}
                    <button
                        onClick={handleCopy}
                        className="mt-4 w-full h-12 bg-accent text-white font-black uppercase tracking-widest border-2 border-black flex items-center justify-center gap-2 hover:-translate-y-1 transition-transform"
                    >
                        {copied ? <><Check size={16} /> CSS Copied!</> : <><Copy size={16} /> Copy CSS Path</>}
                    </button>
                </div>
            </div>

            {/* Cheat Sheet */}
            <div className="bg-white border-2 border-black p-6 brutalist-shadow">
                <h4 className="font-black uppercase tracking-widest text-xs mb-4 text-slate-400">SVG Path Command Reference</h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {[['M x y', 'Move To'], ['L x y', 'Line To'], ['H x', 'Horizontal'], ['V y', 'Vertical'], ['C', 'Cubic Bezier'], ['S', 'Smooth Cubic'], ['Q', 'Quadratic'], ['T', 'Smooth Quad'], ['A rx ry ...', 'Arc'], ['Z', 'Close Path']].map(([cmd, label]) => (
                        <div key={cmd} className="bg-slate-50 border border-slate-200 p-3">
                            <div className="font-mono font-black text-sm text-accent">{cmd}</div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">{label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
