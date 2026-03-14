import { useState } from 'react';

export default function UnitConverter() {
    const [inputValue, setInputValue] = useState('16');
    const [fromUnit, setFromUnit] = useState('px');
    const [toUnit, setToUnit] = useState('rem');
    const [baseSize, setBaseSize] = useState('16');

    const units = ['px', 'rem', 'em', 'vw', 'vh'];

    const convert = () => {
        const val = parseFloat(inputValue);
        const base = parseFloat(baseSize);

        if (isNaN(val) || isNaN(base)) return 'Invalid Input';

        let pxVal = val;
        // Convert to px first
        if (fromUnit === 'rem' || fromUnit === 'em') pxVal = val * base;
        else if (fromUnit === 'vw') pxVal = val * (window.innerWidth / 100);
        else if (fromUnit === 'vh') pxVal = val * (window.innerHeight / 100);

        // Convert from px to target
        let result = pxVal;
        if (toUnit === 'rem' || toUnit === 'em') result = pxVal / base;
        else if (toUnit === 'vw') result = (pxVal / window.innerWidth) * 100;
        else if (toUnit === 'vh') result = (pxVal / window.innerHeight) * 100;

        return Number.isInteger(result) ? result.toString() : result.toFixed(4);
    };

    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-500">
            <div className="space-y-6">
                <div className="p-6 border-2 border-black bg-white brutalist-shadow space-y-4">
                    <label className="block text-sm font-black uppercase">Root Base Size (px)</label>
                    <input
                        type="number"
                        value={baseSize}
                        onChange={(e) => setBaseSize(e.target.value)}
                        className="w-full p-4 border-2 border-black font-mono font-bold focus:outline-none focus:ring-4 focus:ring-accent/20"
                    />
                </div>

                <div className="p-6 border-2 border-black bg-white brutalist-shadow space-y-4">
                    <label className="block text-sm font-black uppercase">Value to Convert</label>
                    <div className="flex gap-4">
                        <input
                            type="number"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="flex-1 p-4 border-2 border-black font-mono font-bold focus:outline-none focus:ring-4 focus:ring-accent/20"
                        />
                        <select
                            value={fromUnit}
                            onChange={(e) => setFromUnit(e.target.value)}
                            className="w-32 p-4 border-2 border-black font-black uppercase bg-slate-100 cursor-pointer outline-none"
                        >
                            {units.map(u => <option key={u} value={u}>{u}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            <div className="space-y-6 flex flex-col justify-center">
                <div className="bg-slate-100 border-2 border-black p-8 brutalist-shadow flex flex-col items-center justify-center min-h-[250px]">
                    <p className="text-sm font-black uppercase tracking-widest opacity-50 mb-4">Converted Result</p>
                    <div className="flex items-end gap-2">
                        <span className="text-6xl font-black">{convert()}</span>
                        <select
                            value={toUnit}
                            onChange={(e) => setToUnit(e.target.value)}
                            className="text-2xl font-black uppercase bg-transparent border-b-4 border-black border-dashed cursor-pointer outline-none pb-1"
                        >
                            {units.map(u => <option key={u} value={u}>{u}</option>)}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}
