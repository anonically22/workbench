import { useState } from 'react';
import { Globe, Copy, RefreshCw, Layers, Info, TrendingUp } from 'lucide-react';

const CITIES = [
    { name: 'NYC', index: 100, desc: 'Global benchmark (100)' },
    { name: 'London', index: 85, desc: '-15% cheaper than NYC' },
    { name: 'Bangkok', index: 45, desc: 'Great value for digital nomads' },
    { name: 'Berlin', index: 70, desc: 'Creative hub with mid-range costs' },
    { name: 'San Francisco', index: 110, desc: '+10% more expensive than NYC' }
];

export default function CostOfLiving() {
    const [salary, setSalary] = useState(100000);
    const [baseCity, setBaseCity] = useState(CITIES[0]);

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-sidebar p-8 rounded-[40px] border border-border space-y-6 shadow-sm">
                    <div>
                        <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-4 px-1">Your Current Salary ($)</label>
                        <input
                            type="number"
                            value={salary}
                            onChange={(e) => setSalary(parseFloat(e.target.value))}
                            className="w-full p-4 bg-background border border-border rounded-xl font-black text-xl outline-none focus:border-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-4 px-1">Based in</label>
                        <div className="flex flex-col gap-2">
                            {CITIES.map(c => (
                                <button
                                    key={c.name}
                                    onClick={() => setBaseCity(c)}
                                    className={`p-4 rounded-xl border text-left transition-all ${baseCity.name === c.name ? 'bg-primary border-primary text-white shadow-md' : 'bg-white border-border text-text-primary hover:bg-sidebar'}`}
                                >
                                    <span className="text-sm font-bold">{c.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
                <h3 className="text-sm font-bold text-text-primary px-1">Purchasing Power Parity</h3>
                <div className="grid grid-cols-1 gap-4">
                    {CITIES.map(city => {
                        const required = (salary / baseCity.index) * city.index;
                        return (
                            <div key={city.name} className="bg-white p-8 rounded-[40px] border border-border flex items-center justify-between group hover:border-primary transition-all shadow-soft">
                                <div className="space-y-1">
                                    <h4 className="text-xl font-bold text-text-primary">{city.name}</h4>
                                    <p className="text-[10px] font-medium text-text-secondary uppercase tracking-widest leading-relaxed">{city.desc}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest mb-1">Equal Standards at</p>
                                    <p className="text-3xl font-black text-primary">${Math.round(required).toLocaleString()}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="p-8 bg-sidebar rounded-[40px] border border-border border-dashed flex items-center gap-6">
                    <Globe className="text-primary shrink-0" size={32} />
                    <div className="space-y-1">
                        <p className="text-xs font-bold text-text-primary uppercase tracking-widest">Global Nomadism</p>
                        <p className="text-[11px] text-text-secondary leading-relaxed font-medium">
                            This index helps you decide where your design income will go furthest. Calculations are based on generic city indexes relative to New York City (100).
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
