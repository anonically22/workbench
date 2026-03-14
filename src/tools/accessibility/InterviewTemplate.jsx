import { useState } from 'react';
import { MessageSquare, Copy, RefreshCw, Layers, Info, Trash2 } from 'lucide-react';

const SCENARIOS = [
    {
        name: 'Discovery',
        questions: [
            "What are the biggest challenges in your current workflow?",
            "Can you walk me through the last time you used [Product]?",
            "What else have you tried to solve this problem?",
            "If you had a magic wand, what one thing would you change?"
        ]
    },
    {
        name: 'Usability Testing',
        questions: [
            "What's your first impression of this screen?",
            "Try to [Task Name] — what are you thinking as you do this?",
            "Was that what you expected to happen?",
            "How easy or difficult was that on a scale of 1-5?"
        ]
    },
    {
        name: 'Onboarding',
        questions: [
            "How did you first hear about this tool?",
            "What was the very first thing you did after signing up?",
            "Did anything feel confusing or overwhelming?",
            "What motivated you to keep going through the setup?"
        ]
    }
];

export default function InterviewTemplate() {
    const [scenario, setScenario] = useState(SCENARIOS[0]);
    const [topic, setTopic] = useState('Workbench Design Toolkit');

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-sidebar p-8 rounded-[40px] border border-border space-y-8">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-4 px-1">Research Topic</label>
                            <input
                                type="text"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                className="w-full p-4 bg-background border border-border rounded-xl font-bold text-sm outline-none focus:border-primary"
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-4 px-1">Scenario Template</label>
                            <div className="flex flex-col gap-2">
                                {SCENARIOS.map(s => (
                                    <button
                                        key={s.name}
                                        onClick={() => setScenario(s)}
                                        className={`p-4 rounded-xl border text-left transition-all ${scenario.name === s.name ? 'bg-primary border-primary text-white shadow-md' : 'bg-white border-border text-text-primary hover:bg-sidebar'}`}
                                    >
                                        <span className="text-sm font-bold">{s.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-primary/5 rounded-[40px] border border-primary/10 flex items-start gap-4">
                    <Info size={24} className="text-primary shrink-0" />
                    <p className="text-[11px] text-text-secondary leading-relaxed">
                        Good interview questions are <strong>open-ended</strong>. Avoid leading questions that suggest a "right" answer. Let the user tell their story.
                    </p>
                </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
                <div className="bg-sidebar rounded-[40px] border border-border p-8 min-h-[500px] flex flex-col gap-8 shadow-inner relative group">
                    <div className="space-y-2 border-b border-border pb-6">
                        <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Interview Script for</p>
                        <h3 className="text-3xl font-black text-text-primary">{topic}</h3>
                    </div>

                    <div className="space-y-8">
                        {scenario.questions.map((q, i) => (
                            <div key={i} className="flex gap-4 group/q">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1 font-bold text-primary text-xs">
                                    {i + 1}
                                </div>
                                <div className="flex-1 space-y-1">
                                    <p className="text-lg font-bold text-text-primary leading-tight">{q}</p>
                                    <p className="text-[10px] text-text-secondary font-black uppercase tracking-widest opacity-40">Insight trigger</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="absolute top-6 right-6">
                        <button
                            onClick={() => navigator.clipboard.writeText(`Topic: ${topic}\n\n` + scenario.questions.join('\n'))}
                            className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest hover:underline"
                        >
                            <Copy size={16} /> Copy Script
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
