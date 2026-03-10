import { useState, useEffect } from 'react';
import ToolShell from '../../components/ToolShell';
import { Copy } from 'lucide-react';

export default function GridSystemCalculator() {
    const [containerWidth, setContainerWidth] = useState(1200);
    const [columns, setColumns] = useState(12);
    const [gutter, setGutter] = useState(24);
    const [margin, setMargin] = useState(0);

    const [columnWidth, setColumnWidth] = useState(0);

    useEffect(() => {
        // Calculate the effective width available for columns
        const availableWidth = containerWidth - (margin * 2);
        // Calculate the total width taken by gutters
        const totalGutterWidth = gutter * (columns - 1);
        // Calculate width per column
        const colWidth = (availableWidth - totalGutterWidth) / columns;

        setColumnWidth(Math.max(0, parseFloat(colWidth.toFixed(2))));
    }, [containerWidth, columns, gutter, margin]);

    const copyToClipboard = () => {
        const css = `.container {
    max-width: ${containerWidth}px;
    margin: 0 auto;
    padding: 0 ${margin}px;
}
.grid {
    display: grid;
    grid-template-columns: repeat(${columns}, 1fr);
    column-gap: ${gutter}px;
}
/* Computed column width: ${columnWidth}px */`;
        navigator.clipboard.writeText(css);
    };

    return (
        <ToolShell
            title="Grid System Calculator"
            description="Calculate exact column widths, gutters, and margins for responsive layouts."
        >
            <div className="grid md:grid-cols-12 gap-8">
                {/* Controls */}
                <div className="md:col-span-4 space-y-6 p-6 border-2 border-black bg-white brutalist-shadow-sm">
                    <h3 className="font-bold text-xl uppercase tracking-[0.2em] mb-4">Parameters</h3>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest">
                                <label>Container Width</label>
                                <span>{containerWidth}px</span>
                            </div>
                            <input
                                type="range" min="320" max="1920"
                                value={containerWidth} onChange={(e) => setContainerWidth(Number(e.target.value))}
                                className="w-full h-2 bg-slate-200 appearance-none border-2 border-black accent-accent"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest">
                                <label>Columns</label>
                                <span>{columns}</span>
                            </div>
                            <input
                                type="range" min="1" max="24"
                                value={columns} onChange={(e) => setColumns(Number(e.target.value))}
                                className="w-full h-2 bg-slate-200 appearance-none border-2 border-black accent-accent"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest">
                                <label>Gutter Width</label>
                                <span>{gutter}px</span>
                            </div>
                            <input
                                type="range" min="0" max="100"
                                value={gutter} onChange={(e) => setGutter(Number(e.target.value))}
                                className="w-full h-2 bg-slate-200 appearance-none border-2 border-black accent-accent"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest">
                                <label>Outer Margin</label>
                                <span>{margin}px</span>
                            </div>
                            <input
                                type="range" min="0" max="200"
                                value={margin} onChange={(e) => setMargin(Number(e.target.value))}
                                className="w-full h-2 bg-slate-200 appearance-none border-2 border-black accent-accent"
                            />
                        </div>
                    </div>

                    <div className="pt-6 border-t-2 border-black mt-6 space-y-4">
                        <div className="bg-slate-100 p-4 border-2 border-black text-center">
                            <span className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Column Width</span>
                            <span className="text-3xl font-black">{columnWidth}px</span>
                        </div>
                        <button
                            onClick={copyToClipboard}
                            className="w-full px-4 py-3 bg-black text-white font-bold tracking-[0.2em] uppercase border-2 border-black brutalist-shadow-hover flex items-center justify-center gap-2"
                        >
                            <Copy size={16} /> Get CSS Setup
                        </button>
                    </div>
                </div>

                {/* Preview */}
                <div className="md:col-span-8 flex flex-col justify-center border-2 border-black bg-slate-50 relative brutalist-shadow-sm overflow-hidden p-[80px_20px]">
                    <div className="absolute top-4 left-4 font-bold uppercase tracking-widest text-xs opacity-50">Visual Preview</div>

                    <div className="mx-auto border-x-4 border-accent relative" style={{ width: `${containerWidth / 2}px` /* Scaled down for preview */ }}>
                        {/* Scale label */}
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-mono font-bold bg-accent text-white px-2 py-1">
                            {containerWidth}px
                        </div>

                        <div
                            className="flex h-64 relative"
                            style={{
                                padding: `0 ${margin / 2}px`,
                                gap: `${gutter / 2}px`
                            }}
                        >
                            {Array.from({ length: columns }).map((_, i) => (
                                <div
                                    key={i}
                                    className="h-full bg-blue-200 border-2 border-blue-400 flex items-center justify-center transition-all"
                                    style={{ flex: 1 }}
                                >
                                    {columns <= 12 && <span className="font-mono text-[10px] text-blue-800 font-bold opacity-60 mix-blend-multiply rotate-90 scale-75 whitespace-nowrap">{columnWidth}px</span>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </ToolShell>
    );
}
