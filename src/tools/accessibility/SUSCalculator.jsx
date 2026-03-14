import { useState } from 'react';
import { BarChart, Copy, RefreshCw, Calculator, Info, TrendingUp } from 'lucide-react';

const QUESTIONS = [
    "I think I would like to use this system frequently.",
    "I found the system unnecessarily complex.",
    "I thought the system was easy to use.",
    "I think I would need technical support to use this system.",
    "I found the various functions were well integrated.",
    "I thought there was too much inconsistency in this system.",
    "I imagine most people would learn to use this system very quickly.",
    "I found the system very cumbersome to use.",
    "I felt very confident using the system.",
    "I needed to learn a lot of things before I could get going with this system."
];

export default function SUSCalculator() {
    const [scores, setScores] = useState(Array(10).fill(3));

    const update = (idx, val) => {
        const next = [...scores];
        next[idx] = parseInt(val);
        setScores(next);
    };

    const calculate = () => {
        let total = 0;
        scores.forEach((s, i) => {
            // Odd questions: (score - 1)
            // Even questions: (5 - score)
            if ((i + 1) % 2 !== 0) total += (s - 1);
            else total += (5 - s);
        });
        return total * 2.5;
    };

    const result = calculate();

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 space-y-6">
                <div className="bg-sidebar p-8 rounded-[40px] border border-border space-y-6">
                    <div className="space-y-4">
                        {QUESTIONS.map((q, i) => (
                            <div key={i} className="space-y-3 p-4 bg-white rounded-2xl border border-border shadow-sm">
                                <div className="flex gap-4">
                                    <span className="text-[10px] font-black text-text-secondary">{i + 1}</span>
                                    <p className="text-xs font-bold text-text-primary leading-tight">{q}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[8px] font-black uppercase text-text-secondary w-16">Disagree</span>
                                    <div className="flex-1 flex gap-1">
                                        {[1, 2, 3, 4, 5].map(v => (
                                            <button
                                                key={v}
                                                onClick={() => update(i, v)}
                                                className={`flex-1 h-8 rounded-lg font-bold text-[10px] transition-all border ${scores[i] === v ? 'bg-primary border-primary text-white shadow-md' : 'bg-sidebar border-border text-text-secondary hover:bg-white'}`}
                                            >
                                                {v}
                                            </button>
                                        ))}
                                    </div>
                                    <span className="text-[8px] font-black uppercase text-text-secondary w-16 text-right">Agree</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
                <div className="bg-primary p-12 rounded-[40px] text-white flex flex-col items-center text-center shadow-xl group">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-2">SUS Usability Score</p>
                    <span className="text-8xl font-black group-hover:scale-110 transition-transform duration-500">{result}</span>
                    <div className="mt-8 px-8 py-3 bg-white/20 rounded-full font-bold text-sm backdrop-blur-md">
                        {result > 80 ? 'Excellent' : result > 68 ? 'Good/Average' : 'Below Average'}
                    </div>
                </div>

                <div className="p-8 bg-sidebar rounded-[40px] border border-border space-y-4">
                    <h4 className="text-xs font-bold text-text-primary flex items-center gap-2">
                        <TrendingUp className="text-primary" size={16} />
                        Insight interpretation
                    </h4>
                    <p className="text-[11px] text-text-secondary leading-relaxed">
                        A SUS score above <strong>68</strong> is considered the industry average. Anything below requires immediate usability intervention. Scores above 80 are in the top 10% of products.
                    </p>
                </div>

                <div className="p-6 bg-white border border-border rounded-3xl flex items-start gap-4 shadow-soft">
                    <Info className="text-primary shrink-0" size={20} />
                    <p className="text-[10px] text-text-secondary leading-relaxed">
                        The System Usability Scale (SUS) is a reliable tool for measuring perceived usability across any type of interface.
                    </p>
                </div>
            </div>
        </div>
    );
}
