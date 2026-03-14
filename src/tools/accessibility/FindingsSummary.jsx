import { useState } from 'react';
import { FileText, Copy, RefreshCw, Search, Info, CheckCircle2 } from 'lucide-react';

export default function FindingsSummary() {
    const [topic, setTopic] = useState('Checkout Flow Usability');
    const [insights, setInsights] = useState(['Users find the shipping selector confusing.', 'Mobile tap targets are too small on the payment page.', 'Guest checkout is the most preferred path.']);

    const add = () => setInsights([...insights, '']);
    const update = (idx, val) => {
        const next = [...insights];
        next[idx] = val;
        setInsights(next);
    };

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-sidebar p-8 rounded-[40px] border border-border space-y-8">
                    <div>
                        <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-4 px-1">Study Topic</label>
                        <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} className="w-full p-4 bg-background border border-border rounded-xl font-bold text-sm outline-none focus:border-primary" />
                    </div>
                    <button
                        onClick={add}
                        className="w-full py-3 bg-white border-2 border-dashed border-primary/20 text-primary font-bold text-xs rounded-xl hover:border-primary transition-all"
                    >
                        + Add Key Insight
                    </button>
                </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
                <div className="bg-primary p-12 rounded-[40px] text-white shadow-xl flex flex-col items-start gap-4 group">
                    <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                        <FileText size={24} />
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Executive Summary</p>
                        <h3 className="text-4xl font-black">{topic}</h3>
                    </div>
                </div>

                <div className="bg-sidebar rounded-[40px] border border-border p-12 space-y-8 shadow-inner">
                    {insights.map((insight, i) => (
                        <div key={i} className="flex gap-4 group/row">
                            <div className="pt-2">
                                <CheckCircle2 className="text-primary" size={20} />
                            </div>
                            <div className="flex-1 space-y-2">
                                <textarea
                                    value={insight}
                                    onChange={(e) => update(i, e.target.value)}
                                    className="w-full bg-transparent text-lg font-bold text-text-primary outline-none focus:text-primary transition-colors resize-none overflow-hidden"
                                    placeholder="Type an insight..."
                                    rows={1}
                                />
                                <div className="h-0.5 bg-border w-12 group-hover/row:w-full transition-all duration-500" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-between items-center px-4">
                    <div className="flex items-center gap-2 text-text-secondary text-[10px] font-black uppercase tracking-widest">
                        <Info size={14} className="text-primary" />
                        Deeper Analysis Required
                    </div>
                    <button
                        onClick={() => navigator.clipboard.writeText(`Topic: ${topic}\n\nKey Insights:\n` + insights.map(i => `- ${i}`).join('\n'))}
                        className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest hover:underline"
                    >
                        <Copy size={16} /> Copy Full Report
                    </button>
                </div>
            </div>
        </div>
    );
}
