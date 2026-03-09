import { useState } from 'react';
import { ShieldCheck, Copy, RefreshCw, Calculator, Info, AlertTriangle } from 'lucide-react';

export default function TaxEstimator() {
    const [revenue, setRevenue] = useState(80000);
    const [expenses, setExpenses] = useState(15000);
    const [taxRate, setTaxRate] = useState(25);

    const taxable = Math.max(0, revenue - expenses);
    const estimatedTax = (taxable * taxRate) / 100;
    const netIncome = revenue - expenses - estimatedTax;

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-sidebar p-8 rounded-[40px] border border-border space-y-8 shadow-sm">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-2 px-1">Gross Annual Revenue ($)</label>
                            <input type="number" value={revenue} onChange={(e) => setRevenue(parseFloat(e.target.value))} className="w-full p-4 bg-background border border-border rounded-xl font-bold text-sm outline-none focus:border-primary" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-2 px-1">Deductible Expenses ($)</label>
                            <input type="number" value={expenses} onChange={(e) => setExpenses(parseFloat(e.target.value))} className="w-full p-4 bg-background border border-border rounded-xl font-bold text-sm outline-none focus:border-primary" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-4 flex justify-between">Est. Tax Rate <span className="text-primary">{taxRate}%</span></label>
                            <input type="range" min="0" max="50" value={taxRate} onChange={(e) => setTaxRate(parseInt(e.target.value))} className="w-full accent-primary" />
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-amber-50 border border-amber-100 rounded-[40px] flex items-start gap-4">
                    <AlertTriangle size={24} className="text-amber-500 shrink-0" />
                    <div className="space-y-1">
                        <p className="text-xs font-bold text-amber-700">Financial Warning</p>
                        <p className="text-[11px] text-amber-700/70 leading-relaxed">
                            This is a simplified estimate for planning purposes. Always consult a certified accountant for local tax compliance.
                        </p>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-8 rounded-[40px] border border-border flex flex-col items-center text-center gap-1 shadow-soft">
                        <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest mb-1">Estimated Tax Owed</p>
                        <p className="text-4xl font-black text-rose-500">${Math.round(estimatedTax).toLocaleString()}</p>
                        <p className="text-[10px] font-bold text-text-secondary/40">Keep this in a separate account</p>
                    </div>
                    <div className="bg-white p-8 rounded-[40px] border border-border flex flex-col items-center text-center gap-1 shadow-soft">
                        <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest mb-1">True Net Income</p>
                        <p className="text-4xl font-black text-green-500">${Math.round(netIncome).toLocaleString()}</p>
                        <p className="text-[10px] font-bold text-text-secondary/40">Money you can actually spend</p>
                    </div>
                </div>

                <div className="bg-sidebar rounded-[40px] border border-border p-12 flex flex-col items-center justify-center gap-8 shadow-inner">
                    <div className="w-full space-y-4">
                        <div className="flex justify-between items-center text-sm font-bold border-b border-border pb-4">
                            <span className="text-text-secondary uppercase text-[10px] tracking-widest">Gross Profit</span>
                            <span className="text-text-primary">$ {taxable.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm font-bold border-b border-border pb-4 text-rose-500">
                            <span className="uppercase text-[10px] tracking-widest">Tax Provision ({taxRate}%)</span>
                            <span>- $ {Math.round(estimatedTax).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-xl font-black pt-4">
                            <span className="text-text-primary uppercase text-[10px] tracking-widest">Final Disposable Income</span>
                            <span className="text-primary">$ {Math.round(netIncome).toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => navigator.clipboard.writeText(`Gross: $${revenue}\nTaxable: $${taxable}\nEstimated Tax: $${estimatedTax}\nNet: $${netIncome}`)}
                    className="w-full py-4 bg-white border border-border rounded-2xl font-bold text-xs uppercase tracking-widest text-primary hover:shadow-lg transition-all"
                >
                    <Copy size={16} /> Copy Tax Breakdown
                </button>
            </div>
        </div>
    );
}
