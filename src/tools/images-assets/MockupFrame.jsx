import { useState } from 'react';
import { Upload, Download, Monitor, Smartphone, Layout, Palette } from 'lucide-react';

const FRAMES = [
    { id: 'browser', name: 'Browser (Safari)', icon: Layout },
    { id: 'iphone', name: 'iPhone 15 Pro', icon: Smartphone },
    { id: 'macbook', name: 'MacBook Air', icon: Monitor }
];

export default function MockupFrame() {
    const [image, setImage] = useState(null);
    const [frame, setFrame] = useState('browser');
    const [bgColor, setBgColor] = useState('#6366F1');
    const [shadow, setShadow] = useState(true);

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => setImage(event.target.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-6">
                <div>
                    <label className="block text-sm font-semibold mb-2 text-text-secondary">1. Upload Screenshot</label>
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-xl hover:bg-sidebar transition-all cursor-pointer group">
                        <Upload className="text-text-secondary group-hover:text-primary mb-2" />
                        <span className="text-[10px] font-medium text-text-secondary uppercase tracking-widest">Select Asset</span>
                        <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
                    </label>
                </div>

                <div className="space-y-3">
                    <label className="block text-sm font-semibold mb-2">2. Device Frame</label>
                    {FRAMES.map(f => (
                        <button
                            key={f.id}
                            onClick={() => setFrame(f.id)}
                            className={`w-full p-4 rounded-xl border flex items-center gap-3 transition-all ${frame === f.id ? 'bg-primary border-primary shadow-md text-white' : 'bg-surface border-border text-text-primary hover:bg-sidebar'
                                }`}
                        >
                            <f.icon size={18} />
                            <span className="text-xs font-bold">{f.name}</span>
                        </button>
                    ))}
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">3. Background</label>
                    <div className="flex gap-2">
                        <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer shrink-0" />
                        <div className="flex gap-1 flex-1">
                            {['#6366F1', '#10B981', '#F43F5E', '#F1F5F9', '#1E293B'].map(c => (
                                <button key={c} onClick={() => setBgColor(c)} className="flex-1 h-10 rounded-lg" style={{ backgroundColor: c }} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
                <div
                    className="h-[500px] rounded-3xl overflow-hidden flex items-center justify-center transition-colors duration-500 relative p-12"
                    style={{ backgroundColor: bgColor }}
                >
                    <div className="max-w-[80%] max-h-full">
                        {frame === 'browser' && (
                            <div className={`bg-white rounded-xl overflow-hidden flex flex-col ${shadow ? 'shadow-2xl' : ''}`}>
                                <div className="bg-slate-100 px-4 py-3 border-b flex items-center gap-2">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                    </div>
                                    <div className="flex-1 mx-4 bg-white rounded-md h-6 flex items-center px-4">
                                        <div className="w-2 h-2 rounded-full bg-slate-200" />
                                    </div>
                                </div>
                                <div className="bg-slate-50 min-h-[200px]">
                                    {image ? (
                                        <img src={image} className="w-full h-auto" alt="Mockup" />
                                    ) : (
                                        <div className="p-20 text-center opacity-10"><Monitor size={64} className="mx-auto" /></div>
                                    )}
                                </div>
                            </div>
                        )}

                        {frame === 'iphone' && (
                            <div className={`relative bg-slate-900 w-[240px] aspect-[1/2] rounded-[40px] border-[8px] border-slate-800 p-2 overflow-hidden ${shadow ? 'shadow-2xl' : ''}`}>
                                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-20" />
                                <div className="w-full h-full bg-slate-50 rounded-[30px] overflow-hidden">
                                    {image ? (
                                        <img src={image} className="w-full h-full object-cover" alt="Phone Mockup" />
                                    ) : (
                                        <div className="flex items-center justify-center h-full opacity-10"><Smartphone size={48} /></div>
                                    )}
                                </div>
                            </div>
                        )}

                        {frame === 'macbook' && (
                            <div className="flex flex-col items-center">
                                <div className={`bg-slate-900 p-3 rounded-2xl w-[400px] aspect-[16/10] border-4 border-slate-800 overflow-hidden ${shadow ? 'shadow-2xl' : ''}`}>
                                    <div className="w-full h-full bg-slate-50 rounded overflow-hidden">
                                        {image ? (
                                            <img src={image} className="w-full h-full object-cover" alt="Laptop Mockup" />
                                        ) : (
                                            <div className="flex items-center justify-center h-full opacity-10"><Monitor size={64} /></div>
                                        )}
                                    </div>
                                </div>
                                <div className="w-[440px] h-3 bg-slate-700 rounded-b-xl shadow-lg" />
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-between items-center bg-sidebar p-4 rounded-2xl border border-border mt-auto">
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={shadow} onChange={() => setShadow(!shadow)} className="accent-primary" />
                            <span className="text-xs font-bold text-text-primary">Apply 3D Shadow</span>
                        </label>
                    </div>
                    <button
                        disabled={!image}
                        onClick={() => alert('Download as high-res PNG coming in Phase 3!')}
                        className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:shadow-lg disabled:opacity-50 transition-all active:scale-95"
                    >
                        <Download size={18} />
                        Export Image
                    </button>
                </div>
            </div>
        </div>
    );
}
