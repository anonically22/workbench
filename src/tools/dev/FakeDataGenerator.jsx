import { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';
import { Copy, RefreshCw } from 'lucide-react';

export default function FakeDataGenerator() {
    const [count, setCount] = useState(5);
    const [data, setData] = useState([]);
    const [format, setFormat] = useState('json'); // json, csv
    const [copied, setCopied] = useState(false);

    const [fields, setFields] = useState({
        id: true,
        name: true,
        email: true,
        phone: true,
        company: true,
        address: false,
        avatar: false
    });

    const generateData = () => {
        const newData = Array.from({ length: count }).map(() => {
            const entry = {};
            if (fields.id) entry.id = faker.string.uuid();
            if (fields.name) entry.name = faker.person.fullName();
            if (fields.email) entry.email = faker.internet.email();
            if (fields.phone) entry.phone = faker.phone.number();
            if (fields.company) entry.company = faker.company.name();
            if (fields.address) entry.address = `${faker.location.streetAddress()}, ${faker.location.city()} ${faker.location.zipCode()}`;
            if (fields.avatar) entry.avatar = faker.image.avatar();
            return entry;
        });
        setData(newData);
    };

    useEffect(() => {
        generateData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count, fields]);

    const getOutputString = () => {
        if (format === 'json') {
            return JSON.stringify(data, null, 2);
        } else if (format === 'csv') {
            if (data.length === 0) return '';
            const headers = Object.keys(data[0]).join(',');
            const rows = data.map(obj => Object.values(obj).map(v => `"${v}"`).join(',')).join('\n');
            return `${headers}\n${rows}`;
        }
        return '';
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(getOutputString());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const toggleField = (key) => setFields(prev => ({ ...prev, [key]: !prev[key] }));

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-6">
                <div className="bg-slate-50 border-2 border-black p-6 space-y-6">
                    <h3 className="text-sm font-bold tracking-[0.2em] uppercase border-b-2 border-black pb-2 mb-4">Data Schema</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                        {Object.entries(fields).map(([key, value]) => (
                            <label key={key} className="flex items-center gap-2 cursor-pointer font-bold text-sm bg-white p-2 border border-slate-200 hover:border-black transition-colors">
                                <input 
                                    type="checkbox" 
                                    checked={value} 
                                    onChange={() => toggleField(key)} 
                                    className="w-4 h-4 accent-black" 
                                />
                                <span className="capitalize">{key}</span>
                            </label>
                        ))}
                    </div>

                    <div className="border-t-2 border-slate-200 pt-6">
                        <label className="block text-xs font-bold uppercase tracking-widest mb-2">Rows to Generate ({count})</label>
                        <input type="range" min="1" max="100" value={count} onChange={e => setCount(Number(e.target.value))} className="w-full accent-black mb-4" />
                        
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer font-bold text-sm">
                                <input type="radio" name="format" value="json" checked={format === 'json'} onChange={() => setFormat('json')} className="w-4 h-4 accent-black" />
                                JSON
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer font-bold text-sm">
                                <input type="radio" name="format" value="csv" checked={format === 'csv'} onChange={() => setFormat('csv')} className="w-4 h-4 accent-black" />
                                CSV
                            </label>
                        </div>
                    </div>

                    <button 
                        onClick={generateData}
                        className="w-full bg-accent text-white p-4 font-bold uppercase tracking-[0.2em] border-2 border-black brutalist-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform active:translate-x-0 active:translate-y-0 active:shadow-none"
                    >
                        Regenerate Data
                    </button>
                    
                    <p className="text-xs text-slate-500 font-medium">Data is procedurally generated locally using faker.js. No requests are sent to any server.</p>
                </div>
            </div>

            <div className="w-full lg:w-[600px] flex flex-col gap-6">
                 <div className="border-2 border-black bg-white flex flex-col h-full relative max-h-[700px]">
                    <div className="bg-black text-white p-2 flex justify-between items-center text-xs font-bold tracking-[0.2em] uppercase">
                        <span>Output Preview</span>
                        <button 
                            onClick={handleCopy}
                            className="flex items-center gap-1 hover:text-accent transition-colors"
                        >
                            {copied ? <RefreshCw size={14} className="animate-spin" /> : <Copy size={14} />}
                            {copied ? 'COPIED!' : 'COPY DATA'}
                        </button>
                    </div>
                    <div className="p-4 bg-slate-900 text-slate-300 font-mono text-sm overflow-auto whitespace-pre-wrap flex-grow relative">
                        {getOutputString()}
                    </div>
                </div>
            </div>
        </div>
    );
}
