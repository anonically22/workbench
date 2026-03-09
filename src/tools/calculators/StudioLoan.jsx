import { useState } from 'react';
import { Home, Copy, RefreshCw, Layers, Info, DollarSign } from 'lucide-react';

export default function StudioLoan() {
    const [amount, setAmount] = useState(250000);
    const [rate, setRate] = useState(5.5);
    const [years, setYears] = useState(15);

    const monthlyRate = (rate / 100) / 12;
    const n = years * 12;
    const payment = (amount * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
    const total = payment * n;

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-sidebar p-8 rounded-[40px] border border-border space-y-6 shadow-sm">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-2 px-1">Loan Amount ($)</label>
                            <input type="number" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value))} className="w-full p-4 bg-background border border-border rounded-xl font-bold text-sm outline-none focus:border-primary" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-4 flex justify-between">Interest rate <span className="text-primary">{rate}%</span></label>
                            <input type="range" min="0.1" max="15" step="0.1" value={rate} onChange={(e) => setRate(parseFloat(e.target.value))} className="w-full accent-primary" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-4 flex justify-between">Term <span className="text-primary">{years} Years</span></label>
                            <input type="range" min="1" max="30" value={years} onChange={(e) => setYears(parseInt(e.target.value))} className="w-full accent-primary" />
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-white border border-border rounded-[40px] flex items-start gap-4">
                    <Home size={24} className="text-primary shrink-0" />
                    <div className="space-y-1">
                        <p className="text-xs font-bold text-text-primary">Studio Investment</p>
                        <p className="text-[11px] text-text-secondary leading-relaxed">
                            Planning to buy your own studio space? Use this to estimate monthly overhead mortgage costs for your business planning.
                        </p>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
                <div className="bg-slate-900 p-12 rounded-[40px] text-white shadow-xl flex flex-col items-center justify-center text-center group overflow-hidden">
                    <div className="relative z-10 space-y-6">
                        <div className="space-y-1">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Est. Monthly Payment</p>
                            <p className="text-7xl font-black text-primary">${Math.round(payment).toLocaleString()}</p>
                        </div>
                        <div className="h-0.5 bg-white/10 w-24 mx-auto" />
                        <div className="space-y-1">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Total Cost of Loan</p>
                            <p className="text-3xl font-bold text-white/60">${Math.round(total).toLocaleString()}</p>
                        </div>
                    </div>
                    <DollarSign className="absolute -left-12 -bottom-12 text-white/5" size={300} />
                </div>

                <div className="p-8 bg-sidebar rounded-[40px] border border-border flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex gap-4">
                        <div className="text-center">
                            <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Total Interest</p>
                            <p className="text-lg font-bold text-text-primary">${Math.round(total - amount).toLocaleString()}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => navigator.clipboard.writeText(`Payment: $${Math.round(payment)}/mo\nTotal: $${Math.round(total)}`)}
                        className="flex items-center gap-2 px-8 py-4 bg-white border border-border text-primary font-bold text-xs uppercase tracking-widest rounded-2xl hover:shadow-lg transition-all"
                    >
                        <Copy size={16} /> Copy Breakdown
                    </button>
                </div>
            </div>
        </div>
    );
}
