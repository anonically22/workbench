import React, { useState } from 'react';
import { Pipette, Copy, Check, AlertCircle } from 'lucide-react';
import chroma from 'chroma-js';

export default function ScreenColorPicker() {
    const [color, setColor] = useState('#3b82f6');
    const [copied, setCopied] = useState('');
    const [error, setError] = useState('');

    const isSupported = 'EyeDropper' in window;

    const openPicker = async () => {
        if (!isSupported) {
            setError('Your browser does not support the native EyeDropper API. Please try a modern Chromium browser like Chrome or Edge.');
            return;
        }

        try {
            const eyeDropper = new window.EyeDropper();
            const result = await eyeDropper.open();
            setColor(result.sRGBHex);
            setError('');
        } catch (e) {
            // User likely cancelled the picker
            console.log("EyeDropper cancelled or failed:", e);
        }
    };

    const copyToClipboard = (text, type) => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        setTimeout(() => setCopied(''), 2000);
    };

    const formats = {
        HEX: color.toUpperCase(),
        RGB: chroma(color).css('rgb'),
        HSL: chroma(color).css('hsl')
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
            {error && (
                <div className="bg-red-50 border-4 border-red-500 p-6 flex items-start gap-4 text-red-700 brutalist-shadow">
                    <AlertCircle size={24} className="shrink-0 mt-0.5" />
                    <div>
                        <h4 className="font-black uppercase tracking-widest text-sm mb-1">UNSUPPORTED BROWSER</h4>
                        <p className="font-bold">{error}</p>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Picker Area */}
                <div className="bg-white border-4 border-black p-8 brutalist-shadow flex flex-col items-center justify-center min-h-[400px]">
                    
                    <button
                        onClick={openPicker}
                        disabled={!isSupported}
                        className="w-48 h-48 rounded-full border-8 border-black flex items-center justify-center mb-10 relative group transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-[12px_12px_0_0_rgba(0,0,0,1)]"
                        style={{ backgroundColor: color }}
                    >
                        <div className="absolute inset-x-0 bottom-[-40px] text-center">
                            <span className="font-black text-2xl uppercase tracking-widest bg-white px-4 py-1 border-2 border-black">{color.toUpperCase()}</span>
                        </div>
                        <div className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-full border-2 border-white/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Pipette size={32} className="text-white drop-shadow-md" />
                        </div>
                    </button>

                    <p className="text-center font-bold opacity-60 max-w-xs leading-relaxed uppercase tracking-widest text-xs mt-4">
                        Click the circle to pick a color from anywhere on your screen.
                    </p>
                </div>

                {/* Values Area */}
                <div className="space-y-4">
                    <h3 className="font-black uppercase tracking-[0.2em] text-sm mb-6 border-b-2 border-black pb-2">Color Formats</h3>
                    
                    {Object.entries(formats).map(([label, value]) => (
                        <div key={label} className="bg-slate-50 border-2 border-black p-4 flex gap-4 items-center brutalist-shadow-sm-hover transition-all">
                            <div className="w-14 shrink-0 font-black tracking-widest text-xs opacity-50">{label}</div>
                            <div className="flex-grow font-mono font-bold text-lg truncate" title={value}>{value}</div>
                            <button
                                onClick={() => copyToClipboard(value, label)}
                                className="w-10 h-10 border-2 border-black bg-white flex items-center justify-center hover:bg-accent hover:text-white hover:-translate-y-1 transition-all active:translate-y-0 shrink-0"
                                title="Copy"
                            >
                                {copied === label ? <Check size={18} /> : <Copy size={18} />}
                            </button>
                        </div>
                    ))}
                    
                    <div className="pt-8">
                        <h3 className="font-black uppercase tracking-[0.2em] text-sm mb-6 border-b-2 border-black pb-2">Tint & Shade Preview</h3>
                        <div className="flex h-12 border-2 border-black w-full overflow-hidden brutalist-shadow-sm">
                            <div className="flex-1" style={{ backgroundColor: chroma(color).brighten(1.5).hex() }} title="Lighter"></div>
                            <div className="flex-1" style={{ backgroundColor: chroma(color).brighten(0.7).hex() }} title="Light"></div>
                            <div className="flex-1 border-x-4 border-black" style={{ backgroundColor: color }} title="Base"></div>
                            <div className="flex-1" style={{ backgroundColor: chroma(color).darken(0.7).hex() }} title="Dark"></div>
                            <div className="flex-1" style={{ backgroundColor: chroma(color).darken(1.5).hex() }} title="Darker"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
