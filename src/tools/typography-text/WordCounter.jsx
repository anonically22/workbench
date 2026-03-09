import { useState } from 'react';
import { Type, Info, Clock, Hash, MousePointer2, Trash2 } from 'lucide-react';

export default function WordCounter() {
    const [text, setText] = useState('');

    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const charsNoSpace = text.replace(/\s+/g, '').length;
    const paragraphs = text.split(/\n+/).filter(Boolean).length;

    // Averages
    const readTime = Math.ceil(words / 200); // 200 wpm
    const speakTime = Math.ceil(words / 130); // 130 wpm

    const StatBox = ({ icon: Icon, label, value, sub }) => (
        <div className="bg-white p-6 rounded-3xl border border-border flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all">
            <div className="p-3 bg-sidebar rounded-2xl text-primary mb-4">
                <Icon size={24} />
            </div>
            <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest mb-1">{label}</p>
            <p className="text-3xl font-black text-text-primary">{value}</p>
            {sub && <p className="text-[10px] text-text-secondary mt-1 font-medium">{sub}</p>}
        </div>
    );

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 space-y-6">
                <div className="relative">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full h-[500px] p-8 rounded-[40px] border-2 border-border bg-background focus:border-primary outline-none transition-all text-base leading-relaxed shadow-soft"
                        placeholder="Start typing or paste your copy here..."
                    />
                    <button
                        onClick={() => setText('')}
                        className="absolute top-6 right-6 p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>

                <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Info className="text-primary" size={20} />
                        <p className="text-xs font-bold text-text-secondary">Instant stats, no servers, full privacy.</p>
                    </div>
                    <div className="hidden md:flex gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary" />
                            <span className="text-[10px] font-black uppercase text-text-secondary">Live Count</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-2 space-y-4">
                <h3 className="text-sm font-bold text-text-primary px-1">Content Metrics</h3>
                <div className="grid grid-cols-2 gap-4">
                    <StatBox icon={Hash} label="Words" value={words} />
                    <StatBox icon={Type} label="Characters" value={chars} sub={`${charsNoSpace} w/o spaces`} />
                    <StatBox icon={MousePointer2} label="Paragraphs" value={paragraphs} />
                    <StatBox icon={Clock} label="Reading Time" value={`${readTime} min`} sub="200 words/min" />
                </div>

                <div className="bg-sidebar p-8 rounded-[40px] border border-border mt-4 flex flex-col items-center text-center gap-4">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border border-border">
                        <Clock className="text-primary" size={28} />
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-bold text-text-primary">Speaking Estimate</p>
                        <p className="text-2xl font-black text-primary">{speakTime} minutes</p>
                        <p className="text-[10px] text-text-secondary font-medium px-4">Based on an average speaking speed of 130 words per minute.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
