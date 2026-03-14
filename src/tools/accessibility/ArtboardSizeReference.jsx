import React, { useState } from 'react';
import { Search, Monitor, Smartphone, Tablet, Watch } from 'lucide-react';

const devices = [
    // Apple Phones
    { name: 'iPhone 15 Pro Max', width: 430, height: 932, type: 'phone', vendor: 'Apple', density: '@3x' },
    { name: 'iPhone 15 Pro', width: 393, height: 852, type: 'phone', vendor: 'Apple', density: '@3x' },
    { name: 'iPhone 14 Plus', width: 428, height: 926, type: 'phone', vendor: 'Apple', density: '@3x' },
    { name: 'iPhone SE (3rd Gen)', width: 375, height: 667, type: 'phone', vendor: 'Apple', density: '@2x' },
    
    // Android Phones
    { name: 'Galaxy S23 Ultra', width: 412, height: 915, type: 'phone', vendor: 'Samsung', density: '@4x' },
    { name: 'Galaxy S23', width: 360, height: 780, type: 'phone', vendor: 'Samsung', density: '@3x' },
    { name: 'Pixel 8 Pro', width: 412, height: 892, type: 'phone', vendor: 'Google', density: '@3x' },
    { name: 'Pixel 8', width: 412, height: 915, type: 'phone', vendor: 'Google', density: '@3x' },

    // Tablets
    { name: 'iPad Pro 12.9"', width: 1024, height: 1366, type: 'tablet', vendor: 'Apple', density: '@2x' },
    { name: 'iPad Air (5th Gen)', width: 820, height: 1180, type: 'tablet', vendor: 'Apple', density: '@2x' },
    { name: 'iPad mini (6th Gen)', width: 744, height: 1133, type: 'tablet', vendor: 'Apple', density: '@2x' },
    { name: 'Galaxy Tab S9 Ultra', width: 1116, height: 1848, type: 'tablet', vendor: 'Samsung', density: '@2x' },
    
    // Desktop/Laptops
    { name: 'MacBook Pro 16"', width: 1728, height: 1117, type: 'desktop', vendor: 'Apple', density: '@2x' },
    { name: 'MacBook Air M2', width: 1280, height: 832, type: 'desktop', vendor: 'Apple', density: '@2x' },
    { name: 'Desktop 1080p', width: 1920, height: 1080, type: 'desktop', vendor: 'Generic', density: '@1x' },
    { name: 'Desktop 1440p', width: 2560, height: 1440, type: 'desktop', vendor: 'Generic', density: '@1x' },
    { name: 'Desktop 4K', width: 3840, height: 2160, type: 'desktop', vendor: 'Generic', density: '@2x' },

    // Wearables
    { name: 'Apple Watch Ultra', width: 205, height: 251, type: 'watch', vendor: 'Apple', density: '@2x' },
    { name: 'Apple Watch Series 9 (45mm)', width: 198, height: 242, type: 'watch', vendor: 'Apple', density: '@2x' },
];

export default function ArtboardSizeReference() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');

    const filteredDevices = devices.filter(d => {
        const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase()) || d.vendor.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = activeFilter === 'all' || d.type === activeFilter;
        return matchesSearch && matchesType;
    });

    const getIcon = (type) => {
        switch (type) {
            case 'phone': return <Smartphone size={16} />;
            case 'tablet': return <Tablet size={16} />;
            case 'desktop': return <Monitor size={16} />;
            case 'watch': return <Watch size={16} />;
            default: return <Smartphone size={16} />;
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Header Controls */}
            <div className="bg-white border-4 border-black p-6 brutalist-shadow flex flex-col md:flex-row gap-6">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input 
                        type="text" 
                        placeholder="Search devices or vendors..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 border-2 border-black font-bold uppercase tracking-widest text-sm focus:outline-none focus:bg-slate-50 transition-colors"
                    />
                </div>
                
                <div className="flex bg-slate-100 border-2 border-black p-1 shrink-0 overflow-x-auto">
                    {['all', 'phone', 'tablet', 'desktop', 'watch'].map(filter => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-4 py-3 text-xs font-black uppercase tracking-widest transition-colors ${activeFilter === filter ? 'bg-black text-white' : 'text-slate-500 hover:text-black'}`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            {/* List */}
            <div className="bg-white border-4 border-black border-b-0 brutalist-shadow">
                <div className="grid grid-cols-12 gap-4 p-4 border-b-4 border-black bg-slate-100 text-xs font-black uppercase tracking-widest text-slate-500">
                    <div className="col-span-1 hidden md:block"></div>
                    <div className="col-span-6 md:col-span-5">Device Name</div>
                    <div className="col-span-3 text-center">Dimensions (pt/dp)</div>
                    <div className="col-span-3 text-center hidden md:block">Pixel Density</div>
                </div>

                {filteredDevices.map((device, index) => (
                    <div 
                        key={index} 
                        className="grid grid-cols-12 gap-4 p-4 items-center border-b-2 border-slate-200 hover:bg-slate-50 transition-colors group"
                    >
                        <div className="col-span-1 hidden md:flex justify-center text-slate-400 group-hover:text-black transition-colors">
                            {getIcon(device.type)}
                        </div>
                        <div className="col-span-6 md:col-span-5">
                            <h4 className="font-bold text-base md:text-lg">{device.name}</h4>
                            <p className="text-xs font-bold uppercase tracking-widest opacity-40">{device.vendor}</p>
                        </div>
                        <div className="col-span-3 text-center">
                            <span className="font-mono font-bold text-sm bg-accent/10 text-accent px-2 py-1 select-all">
                                {device.width} × {device.height}
                            </span>
                        </div>
                        <div className="col-span-3 text-center hidden md:flex items-center justify-center">
                            <span className="text-xs font-black uppercase tracking-widest bg-slate-200 px-3 py-1 ml-2">
                                {device.density}
                            </span>
                        </div>
                    </div>
                ))}

                {filteredDevices.length === 0 && (
                    <div className="p-12 text-center text-slate-400 font-bold uppercase tracking-widest border-b-4 border-black">
                        No devices found matching your criteria.
                    </div>
                )}
            </div>
            
            <div className="h-4 bg-black w-full" />
        </div>
    );
}
