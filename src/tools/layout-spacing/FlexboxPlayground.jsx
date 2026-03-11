import { useState } from 'react';
import { Copy, RefreshCw } from 'lucide-react';

export default function FlexboxPlayground() {
    const [flexDirection, setFlexDirection] = useState('row');
    const [justifyContent, setJustifyContent] = useState('flex-start');
    const [alignItems, setAlignItems] = useState('stretch');
    const [flexWrap, setFlexWrap] = useState('nowrap');
    const [alignContent, setAlignContent] = useState('stretch');
    const [gap, setGap] = useState(16);
    const [itemCount, setItemCount] = useState(5);

    const [copied, setCopied] = useState(false);

    const generateCss = () => {
        return `.flex-container {
  display: flex;
  flex-direction: ${flexDirection};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  flex-wrap: ${flexWrap};
  align-content: ${alignContent};
  gap: ${gap}px;
}`;
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generateCss());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-6">
                <div className="bg-slate-50 border-2 border-black p-6 space-y-6">
                    <h3 className="text-sm font-bold tracking-[0.2em] uppercase border-b-2 border-black pb-2 mb-4">Flex Container Properties</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2">flex-direction</label>
                            <select value={flexDirection} onChange={e => setFlexDirection(e.target.value)} className="w-full border-2 border-black p-2 font-mono text-sm">
                                <option value="row">row</option>
                                <option value="row-reverse">row-reverse</option>
                                <option value="column">column</option>
                                <option value="column-reverse">column-reverse</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2">justify-content</label>
                            <select value={justifyContent} onChange={e => setJustifyContent(e.target.value)} className="w-full border-2 border-black p-2 font-mono text-sm">
                                <option value="flex-start">flex-start</option>
                                <option value="flex-end">flex-end</option>
                                <option value="center">center</option>
                                <option value="space-between">space-between</option>
                                <option value="space-around">space-around</option>
                                <option value="space-evenly">space-evenly</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2">align-items</label>
                            <select value={alignItems} onChange={e => setAlignItems(e.target.value)} className="w-full border-2 border-black p-2 font-mono text-sm">
                                <option value="stretch">stretch</option>
                                <option value="flex-start">flex-start</option>
                                <option value="flex-end">flex-end</option>
                                <option value="center">center</option>
                                <option value="baseline">baseline</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2">flex-wrap</label>
                            <select value={flexWrap} onChange={e => setFlexWrap(e.target.value)} className="w-full border-2 border-black p-2 font-mono text-sm">
                                <option value="nowrap">nowrap</option>
                                <option value="wrap">wrap</option>
                                <option value="wrap-reverse">wrap-reverse</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2">align-content</label>
                            <select disabled={flexWrap === 'nowrap'} value={alignContent} onChange={e => setAlignContent(e.target.value)} className="w-full border-2 border-black p-2 font-mono text-sm disabled:opacity-50">
                                <option value="stretch">stretch</option>
                                <option value="flex-start">flex-start</option>
                                <option value="flex-end">flex-end</option>
                                <option value="center">center</option>
                                <option value="space-between">space-between</option>
                                <option value="space-around">space-around</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2">gap ({gap}px)</label>
                            <input type="range" min="0" max="64" step="4" value={gap} onChange={e => setGap(Number(e.target.value))} className="w-full accent-black mt-2" />
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50 border-2 border-black p-6">
                    <h3 className="text-sm font-bold tracking-[0.2em] uppercase border-b-2 border-black pb-2 mb-4">Playground Controls</h3>
                    
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest mb-2">Number of Items ({itemCount})</label>
                        <input type="range" min="1" max="20" value={itemCount} onChange={e => setItemCount(Number(e.target.value))} className="w-full accent-black mt-2" />
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-[500px] flex flex-col gap-6">
                <div className="border-4 border-slate-200 bg-white min-h-[400px] p-6 relative overflow-hidden flex flex-col">
                    <div className="absolute top-2 left-2 text-[10px] uppercase font-bold tracking-widest opacity-50 z-10">Preview Container</div>
                    
                    <div 
                        className="w-full h-full min-h-[350px] border-2 border-black border-dashed bg-slate-50 transition-all p-2 overflow-y-auto"
                        style={{
                            display: 'flex',
                            flexDirection,
                            justifyContent,
                            alignItems,
                            flexWrap,
                            alignContent,
                            gap: `${gap}px`
                        }}
                    >
                        {Array.from({ length: itemCount }).map((_, i) => (
                            <div 
                                key={i}
                                className="bg-accent/10 border-2 border-accent flex items-center justify-center font-mono font-bold text-accent min-w-[60px] min-h-[60px] p-4 text-xl brutalist-shadow-sm transition-all"
                            >
                                {i + 1}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border-2 border-black bg-white flex flex-col h-full relative group">
                    <div className="bg-black text-white p-2 flex justify-between items-center text-xs font-bold tracking-[0.2em] uppercase">
                        <span>CSS Output</span>
                        <button 
                            onClick={handleCopy}
                            className="flex items-center gap-1 hover:text-accent transition-colors"
                        >
                            {copied ? <RefreshCw size={14} className="animate-spin" /> : <Copy size={14} />}
                            {copied ? 'COPIED!' : 'COPY CSS'}
                        </button>
                    </div>
                    <div className="p-4 bg-slate-900 text-slate-300 font-mono text-sm overflow-x-auto whitespace-pre-wrap flex-grow">
                        {generateCss()}
                    </div>
                </div>
            </div>
        </div>
    );
}
