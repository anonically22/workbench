import { useState } from 'react';
import { Target, Copy, RefreshCw, BarChart, Info, DollarSign } from 'lucide-react';

export default function ProfitabilityCalculator() {
    const [revenue, setRevenue] = useState(5000);
    const [expenses, setExpenses] = useState(1200);
    const [hours, setHours] = useState(40);

    const profit = revenue - expenses;
    const margin = (profit / revenue) * 100;
    const effectiveRate = profit / hours;

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-sidebar p-8 rounded-[40px] border border-border space-y-6 shadow-sm">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-2 px-1">Total Revenue ($)</label>
                            <input type="number" value={revenue} onChange={(e) => setRevenue(parseFloat(e.target.value))} className="w-full p-4 bg-background border border-border rounded-xl font-bold text-sm outline-none focus:border-primary" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-2 px-1">Total Expenses ($)</label>
                            <input type="number" value={expenses} onChange={(e) => setExpenses(parseFloat(e.target.value))} className="w-full p-4 bg-background border border-border rounded-xl font-bold text-sm outline-none focus:border-primary" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-2 px-1">Actual Hours Worked</label>
                            <input type="number" value={hours} onChange={(e) => setHours(parseFloat(e.target.value))} className="w-full p-4 bg-background border border-border rounded-xl font-bold text-sm outline-none focus:border-primary" />
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-white border border-border rounded-[40px] flex items-start gap-4 shadow-soft">
                    <Info size={24} className="text-primary shrink-0" />
                    <p className="text-[11px] text-text-secondary leading-relaxed">
                        Profitability isn't just Revenue minus Expenses. Your <strong>Effective Hourly Rate</strong> is the true measure of whether a project was worth your time.
                    </p>
                </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-8 rounded-[40px] border border-border flex flex-col items-center text-center gap-2 shadow-soft">
                        <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Net Profit</p>
                        <p className="text-3xl font-black text-text-primary">${profit.toLocaleString()}</p>
                    </div>
                    <div className="bg-white p-8 rounded-[40px] border border-border flex flex-col items-center text-center gap-2 shadow-soft">
                        <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Profit Margin</p>
                        <p className={`text-3xl font-black ${margin > 40 ? 'text-green-500' : 'text-text-primary'}`}>{Math.round(margin)}%</p>
                    </div>
                    <div className="bg-white p-8 rounded-[40px] border border-border flex flex-col items-center text-center gap-2 shadow-soft">
                        <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Eff. Hourly Rate</p>
                        <p className="text-3xl font-black text-primary">${Math.round(effectiveRate)}</p>
                    </div>
                </div>

                <div className="bg-slate-900 h-64 rounded-[40px] flex flex-col items-center justify-center p-12 text-center relative overflow-hidden">
                    <BarChart className="text-white/5 absolute -right-8 -bottom-8" size={200} />
                    <div className="space-y-2 relative z-10">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Project Status</p>
                        <h4 className="text-5xl font-black text-white italic">
                            {effectiveRate > 100 ? 'High Value' : effectiveRate > 50 ? 'Healthy' : 'Low Margin'}
                        </h4>
                    </div>
                </div>

                <button
                    onClick={() => navigator.clipboard.writeText(`Revenue: $${revenue}\nExpenses: $${expenses}\nProfit: $${profit}\nMargin: ${margin}%\nRate: $${effectiveRate}/hr`)}
                    className="w-full flex items-center justify-center gap-2 py-4 border-2 border-border border-dashed rounded-2xl text-[10px] font-black uppercase tracking-widest text-text-secondary hover:border-primary hover:text-primary transition-all"
                >
                    <Copy size={16} /> Copy Analysis
                </button>
            </div>
        </div>
    );
}
