import { useState, useEffect } from 'react';
import chroma from 'chroma-js';
import { Copy, Plus, Trash2, ArrowRight, RotateCw } from 'lucide-react';

export default function GradientGenerator() {
    const [colors, setColors] = useState(['#6366F1', '#A855F7']);
    const [angle, setAngle] = useState(135);
    const [type, setType] = useState('linear');
    const [cssCode, setCssCode] = useState('');

    useEffect(() => {
        generateCSS();
    }, [colors, angle, type]);

    const generateCSS = () => {
        const colorStr = colors.join(', ');
        const code = type === 'linear'
            ? `linear-gradient(${angle}deg, ${colorStr})`
            : `radial-gradient(circle, ${colorStr})`;
        setCssCode(code);
    };

    const addColor = () => {
        if (colors.length < 5) {
            setColors([...colors, chroma.random().hex()]);
        }
    };

    const removeColor = (index) => {
        if (colors.length > 2) {
            setColors(colors.filter((_, i) => i !== index));
        }
    };

    const updateColor = (index, val) => {
        const newColors = [...colors];
        newColors[index] = val;
        setColors(newColors);
    };

    const copyCSS = () => {
        navigator.clipboard.writeText(`background: ${cssCode};`);
    };

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <div className="space-y-4">
                    <label className="block text-sm font-semibold mb-2">Colors</label>
                    <div className="space-y-3">
                        {colors.map((c, i) => (
                            <div key={i} className="flex gap-2 group">
                                <input
                                    type="color"
                                    value={c}
                                    onChange={(e) => updateColor(i, e.target.value)}
                                    className="w-12 h-12 rounded-lg border border-border cursor-pointer overflow-hidden p-1 bg-white"
                                />
                                <input
                                    type="text"
                                    value={c.toUpperCase()}
                                    onChange={(e) => updateColor(i, e.target.value)}
                                    className="flex-1 px-4 rounded-lg border border-border font-mono text-sm"
                                />
                                {colors.length > 2 && (
                                    <button
                                        onClick={() => removeColor(i)}
                                        className="p-3 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                )}
                            </div>
                        ))}
                        {colors.length < 5 && (
                            <button
                                onClick={addColor}
                                className="w-full py-3 flex items-center justify-center gap-2 bg-sidebar border-2 border-dashed border-border rounded-xl text-text-secondary hover:border-primary hover:text-primary transition-all text-sm font-bold"
                            >
                                <Plus size={16} />
                                Add Stop
                            </button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold mb-2">Type</label>
                        <div className="flex bg-sidebar p-1 rounded-lg border border-border">
                            <button
                                onClick={() => setType('linear')}
                                className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${type === 'linear' ? 'bg-white shadow-sm text-primary' : 'text-text-secondary hover:text-text-primary'}`}
                            >
                                Linear
                            </button>
                            <button
                                onClick={() => setType('radial')}
                                className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${type === 'radial' ? 'bg-white shadow-sm text-primary' : 'text-text-secondary hover:text-text-primary'}`}
                            >
                                Radial
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Angle: {angle}°</label>
                        <input
                            type="range" min="0" max="360" value={angle}
                            onChange={(e) => setAngle(e.target.value)}
                            disabled={type === 'radial'}
                            className="w-full accent-primary"
                        />
                    </div>
                </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
                <div
                    className="h-64 rounded-2xl border-4 border-white shadow-soft transition-all duration-500 flex items-center justify-center group"
                    style={{ background: cssCode }}
                >
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-[10px] font-black uppercase tracking-widest">
                        Preview
                    </div>
                </div>

                <div className="bg-sidebar border border-border rounded-2xl p-6 space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Generated CSS</span>
                        <button
                            onClick={copyCSS}
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold hover:shadow-lg transition-all active:scale-95"
                        >
                            <Copy size={14} />
                            Copy Code
                        </button>
                    </div>
                    <div className="bg-background border border-border p-4 rounded-xl font-mono text-sm text-primary overflow-x-auto whitespace-pre-wrap leading-relaxed">
                        background: {cssCode};<br />
                        background: {cssCode.replace(/gradient\(/, '-webkit-gradient(')};
                    </div>
                </div>
            </div>
        </div>
    );
}
