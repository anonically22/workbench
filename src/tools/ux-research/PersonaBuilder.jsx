import { useState } from 'react';
import { User, Copy, RefreshCw, Star, Info, Target } from 'lucide-react';

export default function PersonaBuilder() {
    const [name, setName] = useState('Sarah the Specialist');
    const [role, setRole] = useState('Senior Product Designer');
    const [goals, setGoals] = useState('Efficiency, pixel-perfection, scalability.');
    const [frustrations, setFrustrations] = useState('Meeting overload, slow handover tools.');

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-sidebar p-8 rounded-[40px] border border-border space-y-6">
                    <div>
                        <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-2 px-1">Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-4 bg-background border border-border rounded-xl font-bold text-sm outline-none focus:border-primary" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-2 px-1">Role / Archetype</label>
                        <input type="text" value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-4 bg-background border border-border rounded-xl font-bold text-sm outline-none focus:border-primary" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-2 px-1">Goals</label>
                        <textarea value={goals} onChange={(e) => setGoals(e.target.value)} className="w-full p-4 bg-background border border-border rounded-xl text-sm outline-none focus:border-primary h-24" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-2 px-1">Frustrations</label>
                        <textarea value={frustrations} onChange={(e) => setFrustrations(e.target.value)} className="w-full p-4 bg-background border border-border rounded-xl text-sm outline-none focus:border-primary h-24" />
                    </div>
                </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
                <div className="bg-white rounded-[40px] border border-border p-12 shadow-soft relative overflow-hidden group">
                    <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                        <div className="w-32 h-32 bg-primary/10 rounded-[32px] flex items-center justify-center shrink-0 border-4 border-white shadow-xl">
                            <User className="text-primary" size={48} />
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <h3 className="text-4xl font-black text-text-primary tracking-tight">{name}</h3>
                                <p className="text-sm font-bold text-primary uppercase tracking-widest">{role}</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 relative z-10">
                        <div className="space-y-4 group/box">
                            <h4 className="flex items-center gap-2 text-xs font-black uppercase text-text-secondary tracking-widest">
                                <Star className="text-amber-400" fill="currentColor" size={14} />
                                Core Goals
                            </h4>
                            <div className="p-6 bg-sidebar rounded-3xl border border-border min-h-[120px] transition-all group-hover/box:shadow-inner group-hover/box:bg-white text-sm font-medium text-text-primary leading-relaxed">
                                {goals}
                            </div>
                        </div>
                        <div className="space-y-4 group/box">
                            <h4 className="flex items-center gap-2 text-xs font-black uppercase text-text-secondary tracking-widest">
                                <Target className="text-rose-400" size={14} />
                                Pain Points
                            </h4>
                            <div className="p-6 bg-sidebar rounded-3xl border border-border min-h-[120px] transition-all group-hover/box:shadow-inner group-hover/box:bg-white text-sm font-medium text-text-primary leading-relaxed">
                                {frustrations}
                            </div>
                        </div>
                    </div>

                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={() => navigator.clipboard.writeText(`Persona: ${name}\nRole: ${role}\nGoals: ${goals}\nFrustrations: ${frustrations}`)}
                            className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest hover:underline"
                        >
                            <Copy size={14} /> Copy Profile
                        </button>
                    </div>
                </div>

                <div className="p-6 bg-sidebar rounded-[40px] border border-border border-dashed flex items-center gap-4">
                    <Info size={24} className="text-primary shrink-0" />
                    <p className="text-[11px] text-text-secondary leading-relaxed">
                        Personas help keep the user at the center of your design decisions. Use this profile during stakeholder reviews to justify interface changes.
                    </p>
                </div>
            </div>
        </div>
    );
}
