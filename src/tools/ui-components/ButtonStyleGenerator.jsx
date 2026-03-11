import { useState, useEffect } from 'react';
import { Copy, RefreshCw } from 'lucide-react';

export default function ButtonStyleGenerator() {
    const [text, setText] = useState('Click Me');
    const [paddingX, setPaddingX] = useState(24);
    const [paddingY, setPaddingY] = useState(12);
    const [fontSize, setFontSize] = useState(16);
    const [borderRadius, setBorderRadius] = useState(0);
    const [borderWidth, setBorderWidth] = useState(2);
    const [borderColor, setBorderColor] = useState('#000000');
    const [bgColor, setBgColor] = useState('#ffffff');
    const [textColor, setTextColor] = useState('#000000');
    const [shadowX, setShadowX] = useState(4);
    const [shadowY, setShadowY] = useState(4);
    const [shadowBlur, setShadowBlur] = useState(0);
    const [shadowColor, setShadowColor] = useState('#000000');
    const [transition] = useState('0.2s ease'); // eslint-disable-line no-unused-vars

    const [copied, setCopied] = useState(false);

    const cssOutput = `.custom-button {
  padding: ${paddingY}px ${paddingX}px;
  font-size: ${fontSize}px;
  border-radius: ${borderRadius}px;
  border: ${borderWidth}px solid ${borderColor};
  background-color: ${bgColor};
  color: ${textColor};
  box-shadow: ${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowColor};
  transition: all ${transition};
  cursor: pointer;
  font-weight: bold;
}

.custom-button:hover {
  transform: translate(-2px, -2px);
  box-shadow: ${shadowX + 2}px ${shadowY + 2}px ${shadowBlur}px ${shadowColor};
}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(cssOutput);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-6">
                <div className="bg-slate-50 border-2 border-black p-6 space-y-6">
                    <h3 className="text-sm font-bold tracking-[0.2em] uppercase border-b-2 border-black pb-2 mb-4">Button Settings</h3>
                    
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest mb-2">Text</label>
                        <input type="text" value={text} onChange={e => setText(e.target.value)} className="w-full border-2 border-black p-2 font-mono" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2">Padding X ({paddingX}px)</label>
                            <input type="range" min="0" max="64" value={paddingX} onChange={e => setPaddingX(Number(e.target.value))} className="w-full accent-black" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2">Padding Y ({paddingY}px)</label>
                            <input type="range" min="0" max="64" value={paddingY} onChange={e => setPaddingY(Number(e.target.value))} className="w-full accent-black" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2">Font Size ({fontSize}px)</label>
                            <input type="range" min="10" max="48" value={fontSize} onChange={e => setFontSize(Number(e.target.value))} className="w-full accent-black" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2">Border Radius ({borderRadius}px)</label>
                            <input type="range" min="0" max="40" value={borderRadius} onChange={e => setBorderRadius(Number(e.target.value))} className="w-full accent-black" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest mb-2">Border Width ({borderWidth}px)</label>
                        <input type="range" min="0" max="10" value={borderWidth} onChange={e => setBorderWidth(Number(e.target.value))} className="w-full accent-black" />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2">Bg Color</label>
                            <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-full h-10 border-2 border-black cursor-pointer" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2">Text Color</label>
                            <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} className="w-full h-10 border-2 border-black cursor-pointer" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2">Border</label>
                            <input type="color" value={borderColor} onChange={e => setBorderColor(e.target.value)} className="w-full h-10 border-2 border-black cursor-pointer" />
                        </div>
                    </div>

                    <div className="border-t-2 border-slate-200 pt-4 mt-4">
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-4">Shadow Settings</h4>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest mb-2">Offset X ({shadowX}px)</label>
                                <input type="range" min="-20" max="20" value={shadowX} onChange={e => setShadowX(Number(e.target.value))} className="w-full accent-black" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest mb-2">Offset Y ({shadowY}px)</label>
                                <input type="range" min="-20" max="20" value={shadowY} onChange={e => setShadowY(Number(e.target.value))} className="w-full accent-black" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest mb-2">Blur ({shadowBlur}px)</label>
                                <input type="range" min="0" max="30" value={shadowBlur} onChange={e => setShadowBlur(Number(e.target.value))} className="w-full accent-black" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest mb-2">Shadow Color</label>
                                <input type="color" value={shadowColor} onChange={e => setShadowColor(e.target.value)} className="w-full h-10 border-2 border-black cursor-pointer" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-[400px] flex flex-col gap-6">
                <div className="border-2 border-black bg-slate-100 h-[300px] flex items-center justify-center relative p-8">
                    <span className="absolute top-2 left-2 text-[10px] uppercase font-bold tracking-widest opacity-50">Preview</span>
                    
                    <button 
                        style={{
                            padding: `${paddingY}px ${paddingX}px`,
                            fontSize: `${fontSize}px`,
                            borderRadius: `${borderRadius}px`,
                            border: `${borderWidth}px solid ${borderColor}`,
                            backgroundColor: bgColor,
                            color: textColor,
                            boxShadow: `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowColor}`,
                            transition: `all ${transition}`,
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translate(-2px, -2px)';
                            e.currentTarget.style.boxShadow = `${shadowX + 2}px ${shadowY + 2}px ${shadowBlur}px ${shadowColor}`;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translate(0, 0)';
                            e.currentTarget.style.boxShadow = `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowColor}`;
                        }}
                    >
                        {text}
                    </button>
                    
                </div>

                <div className="border-2 border-black bg-white flex flex-col h-full relative group">
                    <div className="bg-black text-white p-2 flex justify-between items-center text-xs font-bold tracking-[0.2em] uppercase">
                        <span>CSS Output</span>
                        <button 
                            onClick={handleCopy}
                            className="flex items-center gap-1 hover:text-accent transition-colors"
                        >
                            {copied ? <RefreshCw size={14} className="animate-spin" /> : <Copy size={14} />}
                            {copied ? 'COPIED!' : 'COPY'}
                        </button>
                    </div>
                    <div className="p-4 bg-slate-900 text-slate-300 font-mono text-sm overflow-x-auto whitespace-pre-wrap flex-grow">
                        {cssOutput}
                    </div>
                </div>
            </div>
        </div>
    );
}
