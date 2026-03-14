import { useState } from 'react';
import { Pipette, Copy, Info, CheckCircle2 } from 'lucide-react';

export default function ScreenPicker() {
    const [color, setColor] = useState('#6366F1');
    const [isSupported] = useState('EyeDropper' in window);

    const pickColor = async () => {
        if (!isSupported) return;
        try {
            const eyeDropper = new window.EyeDropper();
            const result = await eyeDropper.open();
            setColor(result.sRGBHex.toUpperCase());
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
                <div className="bg-sidebar p-8 rounded-3xl border border-border flex flex-col items-center text-center gap-6">
                    <div
                        className="w-48 h-48 rounded-3xl shadow-soft border-8 border-white flex items-center justify-center group cursor-pointer transition-transform hover:scale-95 active:scale-90"
                        style={{ backgroundColor: color }}
                        onClick={pickColor}
                    >
                        <div className="bg-white/20 backdrop-blur-md p-4 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                            <Pipette size={32} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-xl font-bold text-text-primary">Screen Colour Picker</h3>
                        <p className="text-sm text-text-secondary max-w-xs">
                            Grab any colour from your desktop or other browser tabs.
                        </p>
                    </div>

                    {isSupported ? (
                        <button
                            onClick={pickColor}
                            className="flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-bold hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95"
                        >
                            <Pipette size={20} />
                            Open Dropper
                        </button>
                    ) : (
                        <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-xs font-semibold flex gap-2 items-center">
                            <Info size={16} />
                            EyeDropper API not supported in this browser.
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-8">
                <div className="space-y-4">
                    <label className="block text-[10px] font-black uppercase text-text-secondary tracking-[0.2em]">Selected Hex</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            readOnly
                            value={color}
                            className="flex-1 bg-surface border-2 border-border p-4 rounded-2xl font-mono text-xl font-black text-primary outline-none"
                        />
                        <button
                            onClick={() => navigator.clipboard.writeText(color)}
                            className="p-4 bg-primary text-white rounded-2xl hover:bg-primary-dark transition-all active:scale-90 shadow-lg shadow-primary/20"
                        >
                            <Copy size={24} />
                        </button>
                    </div>
                </div>

                <div className="p-6 bg-green-50/50 rounded-2xl border border-green-100 space-y-3">
                    <div className="flex items-center gap-2 text-green-700 font-bold text-sm">
                        <CheckCircle2 size={18} />
                        Ready for Design
                    </div>
                    <p className="text-xs text-green-600 leading-relaxed">
                        Workbench uses the standard browser EyeDropper API. It&apos;s perfect for sampling brand colours from style guides or reference images.
                    </p>
                    <div className="pt-2 flex flex-wrap gap-2">
                        {['#FFFFFF', '#000000', '#6366F1', '#F43F5E', '#10B981'].map(c => (
                            <button
                                key={c}
                                onClick={() => setColor(c)}
                                className="w-6 h-6 rounded-full border border-white shadow-sm"
                                style={{ backgroundColor: c }}
                            />
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest px-1">Tip</p>
                    <div className="p-4 bg-sidebar rounded-xl border border-border border-dashed text-[11px] text-text-secondary leading-relaxed">
                        Press <strong>Esc</strong> to cancel the dropper if you don&apos;t want to pick a colour. In some browsers, you can pick colours from outside the window!
                    </div>
                </div>
            </div>
        </div>
    );
}
