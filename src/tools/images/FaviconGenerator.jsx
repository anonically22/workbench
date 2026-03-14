import { useState, useRef } from 'react';
import { Upload, Download, Smartphone, Globe, Layers } from 'lucide-react';
import JSZip from 'jszip';

const SIZES = [
    { name: 'favicon-16x16', size: 16, type: 'png' },
    { name: 'favicon-32x32', size: 32, type: 'png' },
    { name: 'apple-touch-icon', size: 180, type: 'png' },
    { name: 'android-chrome-192x192', size: 192, type: 'png' },
    { name: 'android-chrome-512x512', size: 512, type: 'png' }
];

export default function FaviconGenerator() {
    const [image, setImage] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);

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

    const generateZip = async () => {
        if (!image) return;
        setIsGenerating(true);
        const zip = new JSZip();
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        for (const s of SIZES) {
            canvas.width = s.size;
            canvas.height = s.size;
            ctx.clearRect(0, 0, s.size, s.size);
            ctx.drawImage(image, 0, 0, s.size, s.size);

            const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
            zip.file(`${s.name}.png`, blob);
        }

        // Add a basic site.webmanifest
        const manifest = {
            name: "My App",
            short_name: "App",
            icons: [
                { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
                { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" }
            ],
            theme_color: "#ffffff",
            background_color: "#ffffff",
            display: "standalone"
        };
        zip.file('site.webmanifest', JSON.stringify(manifest, null, 2));

        const content = await zip.generateAsync({ type: 'blob' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(content);
        link.download = 'favicon-package.zip';
        link.click();
        setIsGenerating(false);
    };

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
                <div className="bg-sidebar p-8 rounded-3xl border border-border flex flex-col items-center text-center">
                    <label className="w-full flex flex-col items-center justify-center h-48 border-2 border-dashed border-border rounded-2xl hover:bg-white transition-all cursor-pointer group mb-6">
                        <Upload className="text-text-secondary group-hover:text-primary mb-2" size={32} />
                        <span className="text-sm font-bold text-text-primary">Upload Source Image</span>
                        <span className="text-xs text-text-secondary mt-1">Recommended 512x512 PNG/SVG</span>
                        <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
                    </label>

                    <div className="space-y-2">
                        <h3 className="text-xl font-bold text-text-primary">Favicon Generator</h3>
                        <p className="text-sm text-text-secondary">
                            Export all standard favicon and manifest icons for web, iOS, and Android.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-surface border border-border rounded-xl flex items-center gap-3">
                        <Globe className="text-primary" size={20} />
                        <span className="text-xs font-bold text-text-secondary">Standard Favor</span>
                    </div>
                    <div className="p-4 bg-surface border border-border rounded-xl flex items-center gap-3">
                        <Smartphone className="text-primary" size={20} />
                        <span className="text-xs font-bold text-text-secondary">Web App Ready</span>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <h3 className="text-sm font-bold text-text-primary px-1">Package Preview</h3>
                <div className="bg-sidebar rounded-2xl border border-border p-6 space-y-4">
                    {SIZES.map(s => (
                        <div key={s.name} className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm border border-border border-dashed">
                            <div className="flex items-center gap-4">
                                <div
                                    className="bg-sidebar rounded flex items-center justify-center overflow-hidden border border-border"
                                    style={{ width: 40, height: 40 }}
                                >
                                    {image ? (
                                        <img src={image.src} className="w-full h-full object-contain" alt={s.name} />
                                    ) : (
                                        <div className="w-2 h-2 rounded-full bg-border" />
                                    )}
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-text-primary">{s.name}.png</p>
                                    <p className="text-[10px] text-text-secondary tracking-widest">{s.size}x{s.size}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    disabled={!image || isGenerating}
                    onClick={generateZip}
                    className="w-full flex items-center justify-center gap-3 py-4 bg-primary text-white rounded-2xl font-bold hover:shadow-xl transition-all disabled:opacity-50 active:scale-95"
                >
                    {isGenerating ? 'Generating...' : <><Download size={20} /> Download Icon Pack (ZIP)</>}
                </button>
            </div>
        </div>
    );
}
