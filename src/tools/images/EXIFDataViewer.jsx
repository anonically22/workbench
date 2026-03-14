import { useState } from 'react';
import exifr from 'exifr';
import { Upload, Info, Image as ImageIcon, MapPin, Camera, Clock } from 'lucide-react';

export default function EXIFDataViewer() {
    const [data, setData] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setIsProcessing(true);
            setPreview(URL.createObjectURL(file));
            try {
                const metadata = await exifr.parse(file, {
                    tiff: true,
                    exif: true,
                    gps: true,
                    ifd0: true,
                    xmp: true
                });
                setData(metadata);
            } catch (err) {
                console.error(err);
            }
            setIsProcessing(false);
        }
    };

    const MetaItem = ({ icon: Icon, label, value }) => (
        <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-border shadow-sm">
            <div className="p-3 bg-sidebar rounded-xl text-primary shrink-0">
                <Icon size={20} />
            </div>
            <div className="flex-1">
                <p className="text-[8px] font-black uppercase text-text-secondary tracking-widest mb-1">{label}</p>
                <p className="text-sm font-bold text-text-primary truncate">{value || 'N/A'}</p>
            </div>
        </div>
    );

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-3xl hover:bg-sidebar transition-all cursor-pointer group">
                    <Upload className="text-text-secondary group-hover:text-primary mb-2" size={32} />
                    <span className="text-sm font-bold text-text-primary">Upload Photo for EXIF</span>
                    <span className="text-xs text-text-secondary mt-1">Works best with original JPEG/HEIC</span>
                    <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
                </label>

                <div className="bg-sidebar h-64 rounded-3xl border border-border overflow-hidden flex items-center justify-center p-4">
                    {preview ? (
                        <img src={preview} className="max-w-full max-h-full object-contain rounded-lg shadow-soft" alt="Preview" />
                    ) : (
                        <ImageIcon className="text-border" size={48} />
                    )}
                </div>

                <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 flex gap-3">
                    <Info size={18} className="text-primary mt-0.5 shrink-0" />
                    <p className="text-[11px] text-text-secondary leading-relaxed">
                        EXIF data contains camera settings, location, and hardware info. Social platforms often strip this data, but original files preserve it.
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-sm font-bold text-text-primary px-1 flex items-center justify-between">
                    Metadata Table
                    {isProcessing && <span className="text-[10px] animate-pulse text-primary font-black uppercase">Parsing...</span>}
                </h3>

                {data ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <MetaItem icon={Camera} label="Make / Model" value={data.Make ? `${data.Make} ${data.Model}` : 'Manual Entry'} />
                        <MetaItem icon={Clock} label="Date Taken" value={data.DateTimeOriginal ? new Date(data.DateTimeOriginal).toLocaleString() : 'No timestamp'} />
                        <MetaItem icon={Info} label="Exposure" value={data.ExposureTime ? `1/${Math.round(1 / data.ExposureTime)}s at f/${data.FNumber}` : 'Auto'} />
                        <MetaItem icon={Info} label="ISO Speed" value={data.ISO ? `ISO ${data.ISO}` : 'Unknown'} />
                        <MetaItem icon={Info} label="Focal Length" value={data.FocalLength ? `${data.FocalLength}mm` : 'Prime'} />
                        <MetaItem icon={MapPin} label="GPS Coords" value={data.latitude ? `${data.latitude.toFixed(4)}, ${data.longitude.toFixed(4)}` : 'None'} />

                        <div className="md:col-span-2 p-6 bg-surface border border-border rounded-2xl overflow-x-auto max-h-48">
                            <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest mb-3">Raw JSON Explorer</p>
                            <pre className="font-mono text-[10px] opacity-70 leading-normal">
                                {JSON.stringify(data, null, 2)}
                            </pre>
                        </div>
                    </div>
                ) : (
                    <div className="bg-sidebar rounded-2xl border border-border p-12 text-center space-y-3 opacity-30">
                        <Info size={32} className="mx-auto" />
                        <p className="text-xs font-bold">No EXIF data loaded yet</p>
                    </div>
                )}
            </div>
        </div>
    );
}
