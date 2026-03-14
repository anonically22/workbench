import { useState, useEffect } from 'react';
import { Keyboard, Copy, MousePointer2, Info, RefreshCw } from 'lucide-react';

export default function EventKeyCode() {
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            setEvent({
                key: e.key === ' ' ? 'Space' : e.key,
                code: e.code,
                which: e.which,
                location: e.location,
                modifiers: {
                    alt: e.altKey,
                    ctrl: e.ctrlKey,
                    meta: e.metaKey,
                    shift: e.shiftKey
                }
            });
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const Stat = ({ label, value }) => (
        <div className="bg-white p-6 rounded-3xl border border-border flex flex-col items-center text-center shadow-sm">
            <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest mb-1">{label}</p>
            <p className="text-3xl font-black text-primary">{value || '—'}</p>
        </div>
    );

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 space-y-6">
                <div className="bg-sidebar h-[450px] rounded-[40px] border-4 border-dashed border-border flex flex-col items-center justify-center p-12 text-center relative group">
                    {!event ? (
                        <div className="space-y-4 animate-pulse">
                            <Keyboard size={64} className="text-primary/20 mx-auto" />
                            <h3 className="text-2xl font-black text-text-primary/20">Press any key to start...</h3>
                        </div>
                    ) : (
                        <div className="space-y-12 w-full animate-in fade-in zoom-in duration-300">
                            <div className="space-y-2">
                                <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Selected Key</p>
                                <span className="text-9xl font-black text-text-primary block drop-shadow-2xl">{event.key}</span>
                            </div>
                        </div>
                    )}

                    {/* Dynamic background effect */}
                    <div className="absolute inset-x-0 bottom-0 p-8 flex justify-between items-center opacity-40">
                        <div className="flex gap-4">
                            {['CTR', 'SHT', 'ALT', 'CMD'].map(k => (
                                <div key={k} className="w-10 h-10 border border-border rounded-lg flex items-center justify-center text-[10px] font-black">{k}</div>
                            ))}
                        </div>
                        <Info size={16} />
                    </div>
                </div>
            </div>

            <div className="lg:col-span-2 space-y-4">
                <h3 className="text-sm font-bold text-text-primary px-1">Event Metatdata</h3>
                <div className="grid grid-cols-2 gap-4">
                    <Stat label="Key Name" value={event?.key} />
                    <Stat label="Code" value={event?.code} />
                    <Stat label="WHICH / ID" value={event?.which} />
                    <Stat label="Location" value={event?.location} />
                </div>

                <div className="bg-sidebar p-8 rounded-[40px] border border-border space-y-6">
                    <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Active Modifiers</p>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { l: 'Shift', a: event?.modifiers.shift },
                            { l: 'Ctrl', a: event?.modifiers.ctrl },
                            { l: 'Alt', a: event?.modifiers.alt },
                            { l: 'Meta', a: event?.modifiers.meta }
                        ].map(m => (
                            <div key={m.l} className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${m.a ? 'bg-primary border-primary text-white shadow-md scale-105' : 'bg-white border-border text-text-secondary opacity-30 shadow-inner'}`}>
                                {m.l}
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => setEvent(null)}
                        className="w-full flex items-center justify-center gap-2 py-4 border-2 border-border rounded-2xl text-text-secondary font-bold hover:border-primary hover:text-primary transition-all active:scale-95"
                    >
                        <RefreshCw size={16} />
                        Reset Capture
                    </button>
                </div>
            </div>
        </div>
    );
}
