import { useState } from 'react';
import { Wallet, Copy, RefreshCw, Layers, Info, TrendingUp } from 'lucide-react';

export default function SalaryCalculator() {
    const [hourly, setHourly] = useState(50);
    const [hoursPerWeek, setHoursPerWeek] = useState(40);
    const [weeksPerYear, setWeeksPerYear] = useState(52);

    const weekly = hourly * hoursPerWeek;
    const monthly = (weekly * 52) / 12;
    const yearly = weekly * weeksPerYear;

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-sidebar p-8 rounded-[40px] border border-border space-y-6 shadow-sm">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-2 flex justify-between">Hourly Rate <span className="text-primary">${hourly}</span></label>
                            <input type="range" min="15" max="300" step="5" value={hourly} onChange={(e) => setHourly(parseInt(e.target.value))} className="w-full accent-primary" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-2 flex justify-between">Hours / Week <span className="text-primary">{hoursPerWeek}</span></label>
                            <input type="range" min="1" max="80" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(parseInt(e.target.value))} className="w-full accent-primary" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-2 flex justify-between">Billable Weeks / Year <span className="text-primary">{weeksPerYear}</span></label>
                            <input type="range" min="1" max="52" value={weeksPerYear} onChange={(e) => setWeeksPerYear(parseInt(e.target.value))} className="w-full accent-primary" />
                            <p className="text-[10px] mt-2 text-text-secondary italic">Typical: 48 weeks (allows for 4 weeks leave).</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { label: 'Weekly Gross', val: weekly, icon: Wallet },
                        { label: 'Monthly Average', val: monthly, icon: TrendingUp },
                        { label: 'Yearly Total', val: yearly, icon: Layers }
                    ].map(stat => (
                        <div key={stat.label} className="bg-white p-8 rounded-[40px] border border-border flex flex-col items-center text-center gap-2 shadow-soft hover:border-primary transition-all">
                            <stat.icon className="text-primary/20 mb-2" size={32} />
                            <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest">{stat.label}</p>
                            <p className="text-3xl font-black text-text-primary">${Math.round(stat.val).toLocaleString()}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-primary p-12 rounded-[40px] text-white shadow-xl relative overflow-hidden group">
                    <div className="relative z-10 flex flex-col items-center text-center gap-2">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Estimated Take Home (Net)</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-7xl font-black">${Math.round(yearly * 0.7).toLocaleString()}</span>
                            <span className="text-sm font-bold opacity-40">/ year</span>
                        </div>
                        <p className="text-xs font-medium opacity-60 max-w-xs mt-4">Assuming ~30% total effective tax rate and overhead. Individual results may vary.</p>
                    </div>
                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-700">
                        <TrendingUp size={200} />
                    </div>
                </div>

                <div className="p-6 bg-sidebar border border-border rounded-3xl flex items-start gap-4">
                    <Info className="text-primary shrink-0" size={20} />
                    <p className="text-[10px] text-text-secondary leading-relaxed">
                        As a freelancer, your billable weeks are usually lower than a salary employee. Factors include holidays, sick leave, and administrative "non-billable" time.
                    </p>
                </div>
            </div>
        </div>
    );
}
