import { useState } from 'react';
import { RefreshCw, Copy, Shield, Settings } from 'lucide-react';

export default function PasswordGenerator() {
    const [length, setLength] = useState(16);
    const [uppercase, setUppercase] = useState(true);
    const [lowercase, setLowercase] = useState(true);
    const [numbers, setNumbers] = useState(true);
    const [symbols, setSymbols] = useState(true);
    const [password, setPassword] = useState('');

    const generatePassword = () => {
        let chars = '';
        if (uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
        if (numbers) chars += '0123456789';
        if (symbols) chars += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

        if (chars === '') {
            setPassword('Select at least one option');
            return;
        }

        let newPassword = '';
        const array = new Uint32Array(length);
        window.crypto.getRandomValues(array);
        for (let i = 0; i < length; i++) {
            newPassword += chars[array[i] % chars.length];
        }
        setPassword(newPassword);
    };

    const copyToClipboard = () => {
        if (password && password !== 'Select at least one option') {
            navigator.clipboard.writeText(password);
        }
    };

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-500">
            <div className="space-y-8">
                <div className="space-y-4 border-2 border-black p-6 bg-white brutalist-shadow">
                    <div className="flex items-center gap-3 border-b-2 border-black pb-4 mb-4">
                        <Settings size={24} strokeWidth={2.5} />
                        <h3 className="text-xl font-black uppercase">Configuration</h3>
                    </div>

                    <div>
                        <label className="block text-sm font-bold uppercase mb-2">Length: {length}</label>
                        <input
                            type="range" min="8" max="64" value={length}
                            onChange={(e) => setLength(e.target.value)}
                            className="w-full h-2 bg-black appearance-none cursor-pointer outline-none"
                        />
                    </div>

                    <div className="space-y-3 pt-4">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} className="w-5 h-5 accent-black border-2 border-black" />
                            <span className="font-bold uppercase text-sm">Uppercase (A-Z)</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" checked={lowercase} onChange={(e) => setLowercase(e.target.checked)} className="w-5 h-5 accent-black border-2 border-black" />
                            <span className="font-bold uppercase text-sm">Lowercase (a-z)</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" checked={numbers} onChange={(e) => setNumbers(e.target.checked)} className="w-5 h-5 accent-black border-2 border-black" />
                            <span className="font-bold uppercase text-sm">Numbers (0-9)</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" checked={symbols} onChange={(e) => setSymbols(e.target.checked)} className="w-5 h-5 accent-black border-2 border-black" />
                            <span className="font-bold uppercase text-sm">Symbols (&*#)</span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-slate-100 border-2 border-black p-8 brutalist-shadow flex flex-col items-center justify-center min-h-[250px] relative">
                    <div className="absolute top-4 left-4 flex gap-2">
                        <Shield className="text-black" size={24} strokeWidth={2.5} />
                    </div>
                    {password ? (
                        <div className="w-full overflow-hidden text-center break-all">
                            <p className="font-mono text-3xl font-black text-black">{password}</p>
                        </div>
                    ) : (
                        <p className="text-sm font-bold uppercase opacity-50">Click Generate to start</p>
                    )}
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={generatePassword}
                        className="flex-1 flex items-center justify-center gap-2 py-4 bg-black text-white font-black uppercase tracking-widest hover:bg-slate-800 transition-colors brutalist-shadow-sm active:translate-y-1 active:shadow-none"
                    >
                        <RefreshCw size={18} strokeWidth={2.5} />
                        Generate
                    </button>
                    <button
                        onClick={copyToClipboard}
                        className="flex-1 flex items-center justify-center gap-2 py-4 bg-white text-black border-2 border-black font-black uppercase tracking-widest hover:bg-slate-100 transition-colors brutalist-shadow-sm active:translate-y-1 active:shadow-none"
                    >
                        <Copy size={18} strokeWidth={2.5} />
                        Copy
                    </button>
                </div>
            </div>
        </div>
    );
}
