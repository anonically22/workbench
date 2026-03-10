import { useState } from 'react';
import { ShieldCheck, Copy, RefreshCw, FileText, Info, CheckCircle2 } from 'lucide-react';

export default function ConsentGenerator() {
    const [project, setProject] = useState('Workbench User Research');
    const [company, setCompany] = useState('Workbench Labs');
    const [duration, setDuration] = useState('45 minutes');

    const text = `
CONSENT FOR PARTICIPATION IN USER RESEARCH

Project: ${project}
Conducted by: ${company}

I volunteer to participate in a research study conducted by ${company}. I understand that the session will last approximately ${duration} and may be recorded for internal analysis.

1. MY PARTICIPATION IS VOLUNTARY
I understand that I may withdraw from the study at any time without penalty.

2. CONFIDENTIALITY
All data collected during this session will be kept confidential and used solely for the purpose of improving the product. My name will not be shared publicly.

3. DATA USAGE
I grant ${company} permission to use any feedback, recordings, or screenshots gathered during this session for internal development.

Participant Name: __________________________
Date: ____________________________________
  `.trim();

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-sidebar p-8 rounded-[40px] border border-border space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-2">Project Name</label>
                            <input type="text" value={project} onChange={(e) => setProject(e.target.value)} className="w-full p-4 bg-background border border-border rounded-xl font-bold text-sm outline-none focus:border-primary" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-2">Company / Group</label>
                            <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} className="w-full p-4 bg-background border border-border rounded-xl font-bold text-sm outline-none focus:border-primary" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-2">Duration</label>
                            <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full p-4 bg-background border border-border rounded-xl font-bold text-sm outline-none focus:border-primary" />
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-green-50 rounded-[40px] border border-green-100 flex items-start gap-4">
                    <CheckCircle2 size={24} className="text-green-500 shrink-0" />
                    <div className="space-y-1">
                        <p className="text-xs font-bold text-green-700">Ethical Compliance</p>
                        <p className="text-[11px] text-green-700/70 leading-relaxed">
                            Clear consent builds trust with participants and protects your organisation legally during data processing.
                        </p>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
                <div className="bg-white rounded-[40px] border border-border p-12 min-h-[500px] shadow-soft relative overflow-hidden group">
                    {/* Decorative watermark */}
                    <div className="absolute -top-12 -right-12 text-sidebar/10 select-none pointer-events-none">
                        <ShieldCheck size={200} />
                    </div>

                    <pre className="font-serif text-sm text-text-primary leading-loose whitespace-pre-wrap">
                        {text}
                    </pre>

                    <div className="absolute top-6 right-6">
                        <button
                            onClick={() => navigator.clipboard.writeText(text)}
                            className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest hover:underline"
                        >
                            <Copy size={16} /> Copy Document
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
