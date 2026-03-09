import { useState } from 'react';
import { MousePointer2, Copy, Info, Layout } from 'lucide-react';

const CURSORS = [
    'auto', 'default', 'none', 'context-menu', 'help', 'pointer', 'progress', 'wait',
    'cell', 'crosshair', 'text', 'vertical-text', 'alias', 'copy', 'move', 'no-drop',
    'not-allowed', 'grab', 'grabbing', 'all-scroll', 'col-resize', 'row-resize',
    'n-resize', 'e-resize', 's-resize', 'w-resize', 'ne-resize', 'nw-resize', 'se-resize', 'sw-resize'
];

export default function CursorPreview() {
    const [active, setActive] = useState('pointer');

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-sidebar p-6 rounded-[40px] border border-border space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar">
                    <h3 className="text-[10px] font-black uppercase text-text-secondary tracking-widest px-1">Native Cursors</h3>
                    <div className="grid grid-cols-1 gap-2">
                        {CURSORS.map(c => (
                            <button
                                key={c}
                                onClick={() => setActive(c)}
                                className={`p-3 rounded-xl border text-left text-xs font-bold transition-all flex items-center justify-between ${active === c ? 'bg-primary border-primary text-white shadow-md' : 'bg-white border-border text-text-primary hover:bg-sidebar'
                                    }`}
                                style={{ cursor: c }}
                            >
                                {c}
                                <MousePointer2 size={12} className={active === c ? 'opacity-100' : 'opacity-20'} />
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="lg:col-span-3 space-y-8">
                <div
                    className="bg-sidebar h-[450px] rounded-[40px] border border-border flex flex-col items-center justify-center p-12 gap-8 shadow-inner transition-all duration-300"
                    style={{ cursor: active }}
                >
                    <div className="w-64 h-64 bg-white border-4 border-dashed border-primary/20 rounded-[40px] flex flex-col items-center justify-center text-center p-8 pointer-events-none">
                        <MousePointer2 size={48} className="text-primary mb-4 animate-bounce" />
                        <h4 className="text-lg font-black text-text-primary">Testing: {active}</h4>
                        <p className="text-xs text-text-secondary mt-2">Move your mouse here to preview the cursor behavior.</p>
                    </div>

                    <div className="flex gap-4">
                        <div className="px-6 py-2 bg-white rounded-full border border-border shadow-sm text-[10px] font-black uppercase text-primary tracking-widest">
                            Interactive Zone
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900 p-8 rounded-[40px] text-white shadow-xl flex items-center justify-between">
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2 block">CSS Rule</span>
                        <code className="font-mono text-primary text-sm">cursor: {active};</code>
                    </div>
                    <button
                        onClick={() => navigator.clipboard.writeText(`cursor: ${active};`)}
                        className="p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all text-primary"
                    >
                        <Copy size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
