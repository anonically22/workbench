import { useState, useRef, useEffect } from 'react';
import { Upload, Download, Split, Layers } from 'lucide-react';
import JSZip from 'jszip';

export default function SeamlessScroll() {
    const [image, setImage] = useState(null);
    const [columns, setColumns] = useState(3);
    const [ratio, setRatio] = useState('1:1'); // 1:1, 4:5, 9:16
    const [tiles, setTiles] = useState([]);
    const canvasRef = useRef(null);

    const RATIOS = {
        '1:1': 1,
        '4:5': 0.8,
        '9:16': 0.5625
    };

    useEffect(() => {
        if (image) {
            generateTiles();
        }
    }, [image, columns, ratio]);

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => setImage(img);
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const generateTiles = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // We want each tile to be high-res (e.g. 1080px width)
        const tileW = 1080;
        const tileH = 1080 / RATIOS[ratio];

        const totalW = tileW * columns;
        const totalH = tileH;

        canvas.width = totalW;
        canvas.height = totalH;

        // Scale image to fill total area covers height
        const imgRatio = image.width / image.height;
        const targetRatio = totalW / totalH;

        let drawW, drawH;
        if (imgRatio > targetRatio) {
            drawH = totalH;
            drawW = totalH * imgRatio;
        } else {
            drawW = totalW;
            drawH = totalW / imgRatio;
        }

        const x = (totalW - drawW) / 2;
        const y = (totalH - drawH) / 2;

        ctx.drawImage(image, x, y, drawW, drawH);

        const newTiles = [];
        for (let i = 0; i < columns; i++) {
            const tileCanvas = document.createElement('canvas');
            tileCanvas.width = tileW;
            tileCanvas.height = tileH;
            const tileCtx = tileCanvas.getContext('2d');
            tileCtx.drawImage(canvas, i * tileW, 0, tileW, tileH, 0, 0, tileW, tileH);
            newTiles.push(tileCanvas.toDataURL('image/jpeg', 0.9));
        }
        setTiles(newTiles);
    };

    const downloadAll = async () => {
        const zip = new JSZip();
        tiles.forEach((dataUrl, i) => {
            const base64Data = dataUrl.split(',')[1];
            zip.file(`tile-${i + 1}.jpg`, base64Data, { base64: true });
        });

        const content = await zip.generateAsync({ type: 'blob' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(content);
        link.download = 'nixby-seamless-scroll.zip';
        link.click();
    };

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold mb-2">1. Upload Panoramic Image</label>
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-xl hover:bg-sidebar transition-all cursor-pointer group">
                        <Upload className="text-text-secondary group-hover:text-primary mb-2" />
                        <span className="text-xs font-medium text-text-secondary">Best with 3:1 or wider images</span>
                        <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
                    </label>
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">2. Tile Count (Carousel Slides)</label>
                    <div className="grid grid-cols-5 gap-2">
                        {[2, 3, 4, 5, 6].map(c => (
                            <button
                                key={c}
                                onClick={() => setColumns(c)}
                                className={`py-2 rounded-lg text-sm font-bold border transition-all ${columns === c ? 'bg-primary text-white border-primary' : 'bg-surface text-text-secondary border-border hover:bg-sidebar'
                                    }`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">3. Aspect Ratio per Tile</label>
                    <div className="grid grid-cols-3 gap-2">
                        {Object.keys(RATIOS).map(r => (
                            <button
                                key={r}
                                onClick={() => setRatio(r)}
                                className={`py-2 rounded-lg text-xs font-bold border transition-all ${ratio === r ? 'bg-primary text-white border-primary' : 'bg-surface text-text-secondary border-border hover:bg-sidebar'
                                    }`}
                            >
                                {r}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="lg:col-span-2 flex flex-col gap-6">
                <div className="bg-sidebar rounded-xl border-2 border-dashed border-border p-4 overflow-x-auto">
                    <div className="flex gap-2 min-w-max">
                        {image ? (
                            tiles.map((tile, i) => (
                                <div key={i} className="relative group shrink-0">
                                    <img src={tile} alt={`Tile ${i + 1}`} className="h-[300px] w-auto border border-border rounded-lg shadow-sm" />
                                    <div className="absolute top-2 left-2 bg-black/50 text-white text-[10px] px-2 py-1 rounded-md backdrop-blur-sm">
                                        Slide {i + 1}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="w-full h-[300px] flex flex-col items-center justify-center text-text-secondary opacity-30 gap-4">
                                <Split size={48} />
                                <p className="font-medium">Upload a wide image to generate tiles</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex gap-4 text-xs text-text-secondary items-center">
                        <div className="flex items-center gap-1 font-semibold text-primary">
                            <Layers size={14} />
                            {columns} JPEG Tiles
                        </div>
                        <span>Perfect for Instagram carousels</span>
                    </div>
                    <button
                        disabled={!image}
                        onClick={downloadAll}
                        className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-bold hover:shadow-lg disabled:opacity-50 transition-all active:scale-95"
                    >
                        <Download size={18} />
                        Download All (ZIP)
                    </button>
                </div>
            </div>
        </div>
    );
}
