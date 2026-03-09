import { useState } from 'react';
import { Heart, Copy, RefreshCw, Layers, Info, Trash2 } from 'lucide-react';

export default function EmpathyMap() {
    const [data, setData] = useState({
        says: 'I want something that just works.',
        thinks: 'I hope this is secure enough for my data.',
        does: 'Clicks "Skip" on every tutorial popup.',
        feels: 'Overwhelmed by too many features.'
    });

    const update = (key, val) => setData(prev => ({ ...prev, [key]: val }));

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-sidebar p-8 rounded-[40px] border border-border space-y-6">
                    {Object.keys(data).map(key => (
                        <div key={key}>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-2 px-1">{key}</label>
                            <textarea
                                value={data[key]}
                                onChange={(e) => update(key, e.target.value)}
                                className="w-full p-4 bg-background border border-border rounded-xl text-sm font-medium outline-none focus:border-primary h-20"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
                <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-[40px] border border-border shadow-soft aspect-square lg:aspect-video relative overflow-hidden">
                    {/* Center Heart Icon */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                            <Heart className="text-primary" fill="currentColor" size={24} />
                        </div>
                    </div>

                    <div className="p-8 bg-sidebar rounded-3xl border border-border flex flex-col items-center justify-center text-center gap-2 group transition-all hover:bg-white hover:shadow-soft">
                        <p className="text-[10px] font-black uppercase text-primary tracking-widest">Says</p>
                        <p className="text-sm font-bold text-text-primary leading-relaxed">{data.says}</p>
                    </div>
                    <div className="p-8 bg-sidebar rounded-3xl border border-border flex flex-col items-center justify-center text-center gap-2 group transition-all hover:bg-white hover:shadow-soft">
                        <p className="text-[10px] font-black uppercase text-primary tracking-widest">Thinks</p>
                        <p className="text-sm font-bold text-text-primary leading-relaxed">{data.thinks}</p>
                    </div>
                    <div className="p-8 bg-sidebar rounded-3xl border border-border flex flex-col items-center justify-center text-center gap-2 group transition-all hover:bg-white hover:shadow-soft">
                        <p className="text-[10px] font-black uppercase text-primary tracking-widest">Does</p>
                        <p className="text-sm font-bold text-text-primary leading-relaxed">{data.does}</p>
                    </div>
                    <div className="p-8 bg-sidebar rounded-3xl border border-border flex flex-col items-center justify-center text-center gap-2 group transition-all hover:bg-white hover:shadow-soft">
                        <p className="text-[10px] font-black uppercase text-primary tracking-widest">Feels</p>
                        <p className="text-sm font-bold text-text-primary leading-relaxed">{data.feels}</p>
                    </div>
                </div>

                <div className="flex justify-between items-center bg-sidebar p-4 rounded-3xl border border-border border-dashed">
                    <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest pl-2">User Sentiment Model</p>
                    <button
                        onClick={() => navigator.clipboard.writeText(JSON.stringify(data, null, 2))}
                        className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest hover:underline"
                    >
                        <Copy size={16} /> Copy JSON Data
                    </button>
                </div>
            </div>
        </div>
    );
}
