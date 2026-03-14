import { useState, useRef, useEffect } from 'react';

// Color blindness simulation matrices (Brettel/Vienot models)
const CVD_MATRICES = {
    protanopia: [0.152286, 1.052583, -0.204868, 0.114503, 0.786281, 0.099216, -0.003882, -0.048116, 1.051998],
    deuteranopia: [0.367322, 0.860646, -0.227968, 0.280085, 0.672501, 0.047413, -0.011820, 0.042940, 0.968881],
    tritanopia: [1.255528, -0.076749, -0.178779, -0.078411, 0.930809, 0.147602, 0.004733, 0.691367, 0.303900],
    achromatopsia: [0.299, 0.587, 0.114, 0.299, 0.587, 0.114, 0.299, 0.587, 0.114],
};

const CVD_LABELS = {
    protanopia: { name: 'Protanopia', desc: 'Red-blind (~1% of males)' },
    deuteranopia: { name: 'Deuteranopia', desc: 'Green-blind (~1% of males)' },
    tritanopia: { name: 'Tritanopia', desc: 'Blue-blind (very rare)' },
    achromatopsia: { name: 'Achromatopsia', desc: 'Total color blindness (extremely rare)' },
};

function applyMatrix(imageData, matrix) {
    const data = new Uint8ClampedArray(imageData.data);
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2];
        data[i]     = matrix[0] * r + matrix[1] * g + matrix[2] * b;
        data[i + 1] = matrix[3] * r + matrix[4] * g + matrix[5] * b;
        data[i + 2] = matrix[6] * r + matrix[7] * g + matrix[8] * b;
    }
    return new ImageData(data, imageData.width, imageData.height);
}

export default function ColorBlindnessSimulator() {
    const [img, setImg] = useState(null);
    const [mode, setMode] = useState('protanopia');
    const canvasOrigRef = useRef(null);
    const canvasSimRef = useRef(null);
    const [origData, setOrigData] = useState(null);

    const handleFile = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            const image = new Image();
            image.onload = () => setImg(image);
            image.src = ev.target.result;
        };
        reader.readAsDataURL(file);
    };

    useEffect(() => {
        if (!img) return;
        const origCanvas = canvasOrigRef.current;
        const w = Math.min(img.width, 600);
        const h = (img.height / img.width) * w;
        origCanvas.width = w;
        origCanvas.height = h;
        const ctx = origCanvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        setOrigData(ctx.getImageData(0, 0, w, h));
    }, [img]);

    useEffect(() => {
        if (!origData) return;
        const simCanvas = canvasSimRef.current;
        simCanvas.width = origData.width;
        simCanvas.height = origData.height;
        const ctx = simCanvas.getContext('2d');
        const simulated = applyMatrix(origData, CVD_MATRICES[mode]);
        ctx.putImageData(simulated, 0, 0);
    }, [origData, mode]);

    return (
        <div className="space-y-6">
            {/* Upload */}
            <div className="border-2 border-black p-6 bg-white">
                <label className="block text-xs font-black uppercase tracking-widest mb-3">Upload Image</label>
                <input type="file" accept="image/*" onChange={handleFile}
                    className="text-xs font-bold" />
            </div>

            {/* CVD Mode Selector */}
            <div className="flex flex-wrap gap-2">
                {Object.entries(CVD_LABELS).map(([key, { name }]) => (
                    <button key={key} onClick={() => setMode(key)}
                        className={`px-4 py-2 border-2 text-xs font-black uppercase tracking-widest transition-colors ${
                            mode === key ? 'bg-black text-white border-black' : 'border-slate-300 hover:border-black'
                        }`}>{name}</button>
                ))}
            </div>

            {/* Info */}
            {mode && (
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    {CVD_LABELS[mode].desc}
                </p>
            )}

            {/* Side-by-side */}
            {img ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border-2 border-black bg-white p-3">
                        <p className="text-[10px] font-black uppercase tracking-widest mb-2 text-slate-400">Original</p>
                        <canvas ref={canvasOrigRef} className="w-full h-auto" />
                    </div>
                    <div className="border-2 border-black bg-white p-3">
                        <p className="text-[10px] font-black uppercase tracking-widest mb-2 text-slate-400">Simulated — {CVD_LABELS[mode].name}</p>
                        <canvas ref={canvasSimRef} className="w-full h-auto" />
                    </div>
                </div>
            ) : (
                <div className="border-2 border-dashed border-slate-300 py-20 text-center">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Upload an image to simulate</p>
                </div>
            )}
        </div>
    );
}
