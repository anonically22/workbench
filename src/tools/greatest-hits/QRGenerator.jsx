import { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Download, Copy, RefreshCw } from 'lucide-react';

export default function QRGenerator() {
    const [text, setText] = useState('https://workbench.tool');
    const [size, setSize] = useState(256);
    const [fgColor, setFgColor] = useState('#000000');
    const [bgColor, setBgColor] = useState('#ffffff');
    const [errorLevel, setErrorLevel] = useState('M');
    const [qrUrl, setQrUrl] = useState('');
    const canvasRef = useRef(null);

    useEffect(() => {
        generateQR();
    }, [text, size, fgColor, bgColor, errorLevel]);

    const generateQR = async () => {
        try {
            const url = await QRCode.toDataURL(text, {
                width: size,
                margin: 2,
                color: {
                    dark: fgColor,
                    light: bgColor,
                },
                errorCorrectionLevel: errorLevel,
            });
            setQrUrl(url);
        } catch (err) {
            console.error(err);
        }
    };

    const downloadQR = () => {
        const link = document.createElement('a');
        link.download = 'workbench-qr.png';
        link.href = qrUrl;
        link.click();
    };

    const copyToClipboard = async () => {
        try {
            const response = await fetch(qrUrl);
            const blob = await response.blob();
            await navigator.clipboard.write([
                new ClipboardItem({
                    [blob.type]: blob
                })
            ]);
            alert('Copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold mb-2">Content (URL or Text)</label>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full p-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none transition-all"
                        placeholder="Enter URL or text..."
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold mb-2">Foreground</label>
                        <div className="flex gap-2">
                            <input
                                type="color"
                                value={fgColor}
                                onChange={(e) => setFgColor(e.target.value)}
                                className="w-12 h-10 rounded border border-border cursor-pointer overflow-hidden"
                            />
                            <input
                                type="text"
                                value={fgColor}
                                onChange={(e) => setFgColor(e.target.value)}
                                className="flex-1 px-3 rounded-lg border border-border text-sm"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Background</label>
                        <div className="flex gap-2">
                            <input
                                type="color"
                                value={bgColor}
                                onChange={(e) => setBgColor(e.target.value)}
                                className="w-12 h-10 rounded border border-border cursor-pointer overflow-hidden"
                            />
                            <input
                                type="text"
                                value={bgColor}
                                onChange={(e) => setBgColor(e.target.value)}
                                className="flex-1 px-3 rounded-lg border border-border text-sm"
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">Size: {size}px</label>
                    <input
                        type="range"
                        min="128"
                        max="1024"
                        step="16"
                        value={size}
                        onChange={(e) => setSize(parseInt(e.target.value))}
                        className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">Error Correction</label>
                    <div className="flex gap-2">
                        {['L', 'M', 'Q', 'H'].map((level) => (
                            <button
                                key={level}
                                onClick={() => setErrorLevel(level)}
                                className={`flex-1 py-2 rounded-lg border transition-all ${errorLevel === level
                                        ? 'bg-primary text-white border-primary shadow-sm'
                                        : 'bg-surface text-text-secondary border-border hover:bg-sidebar'
                                    }`}
                            >
                                {level === 'L' ? 'Low' : level === 'M' ? 'Med' : level === 'Q' ? 'High' : 'Ultra'}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center p-8 bg-sidebar rounded-xl border border-dashed border-border group">
                <div className="relative bg-white p-4 rounded-lg shadow-soft group-hover:scale-[1.02] transition-transform duration-300">
                    {qrUrl ? (
                        <img src={qrUrl} alt="QR Code" className="max-w-full h-auto" />
                    ) : (
                        <div className="w-64 h-64 flex items-center justify-center">
                            <RefreshCw className="animate-spin text-primary" size={32} />
                        </div>
                    )}
                </div>

                <div className="mt-8 flex gap-3 w-full max-w-xs">
                    <button
                        onClick={downloadQR}
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-primary text-white rounded-lg font-bold hover:shadow-lg active:scale-95 transition-all"
                    >
                        <Download size={18} />
                        PNG
                    </button>
                    <button
                        onClick={copyToClipboard}
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-surface text-text-primary border border-border rounded-lg font-bold hover:bg-white active:scale-95 transition-all"
                    >
                        <Copy size={18} />
                        Copy
                    </button>
                </div>
            </div>
        </div>
    );
}
