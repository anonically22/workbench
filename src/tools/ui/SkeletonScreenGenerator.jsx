import { useState, useMemo } from 'react';
import { Copy, RefreshCw } from 'lucide-react';

export default function SkeletonScreenGenerator() {
    const [theme, setTheme] = useState('light'); // light, dark
    const [animation, setAnimation] = useState('pulse'); // pulse, wave, none
    const [borderRadius, setBorderRadius] = useState(4); // px
    
    // Layout builder state
    const [rows, setRows] = useState(3);
    const [hasAvatar, setHasAvatar] = useState(true);
    const [avatarSize, setAvatarSize] = useState(48); // px
    const [avatarShape, setAvatarShape] = useState('circle'); // circle, rounded, square
    const [imageHeight, setImageHeight] = useState(150);
    const [hasImage, setHasImage] = useState(false);

    const [copied, setCopied] = useState(false);

    const getThemeColors = () => {
        return theme === 'light' 
            ? { bg: '#ffffff', base: '#e2e8f0', highlight: '#f8fafc', border: '#e2e8f0' }
            : { bg: '#0f172a', base: '#1e293b', highlight: '#334155', border: '#1e293b' };
    };

    const colors = getThemeColors();

    const generateHtml = () => {
        let items = '';
        
        if (hasImage) {
            items += `  <div class="skeleton-image"></div>\n`;
        }

        if (hasAvatar || rows > 0) {
            items += `  <div class="skeleton-content">\n`;
            
            if (hasAvatar) {
                items += `    <div class="skeleton-avatar"></div>\n`;
            }
            
            if (rows > 0) {
                items += `    <div class="skeleton-text-group">\n`;
                for (let i = 0; i < rows; i++) {
                    const width = i === rows - 1 ? '70%' : '100%';
                    items += `      <div class="skeleton-text" style="width: ${width};"></div>\n`;
                }
                items += `    </div>\n`;
            }
            items += `  </div>\n`;
        }

        return `<div class="skeleton-card">\n${items}</div>`;
    };

    const generateCss = () => {
        let css = `.skeleton-card {
  background-color: ${colors.bg};
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius * 1.5}px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 400px;
  width: 100%;
}

.skeleton-content {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.skeleton-text-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 6px;
}

.skeleton-image, .skeleton-avatar, .skeleton-text {
  background-color: ${colors.base};
}`;

        if (hasImage) {
            css += `\n\n.skeleton-image {
  width: 100%;
  height: ${imageHeight}px;
  border-radius: ${borderRadius}px;
}`;
        }

        if (hasAvatar) {
            const r = avatarShape === 'circle' ? '50%' : avatarShape === 'rounded' ? `${borderRadius}px` : '0px';
            css += `\n\n.skeleton-avatar {
  width: ${avatarSize}px;
  height: ${avatarSize}px;
  border-radius: ${r};
  flex-shrink: 0;
}`;
        }

        if (rows > 0) {
            css += `\n\n.skeleton-text {
  height: 12px;
  border-radius: ${borderRadius}px;
}`;
        }

        // Animations
        if (animation === 'pulse') {
            css += `\n\n.skeleton-image, .skeleton-avatar, .skeleton-text {
  animation: skeleton-pulse 1.5s ease-in-out infinite;
}

@keyframes skeleton-pulse {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}`;
        } else if (animation === 'wave') {
            css += `\n\n.skeleton-image, .skeleton-avatar, .skeleton-text {
  position: relative;
  overflow: hidden;
  background-color: ${colors.base};
}

.skeleton-image::after, .skeleton-avatar::after, .skeleton-text::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateX(-100%);
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.2) 20%,
    rgba(255, 255, 255, 0.5) 60%,
    rgba(255, 255, 255, 0)
  );
  animation: skeleton-wave 2s infinite;
}

@keyframes skeleton-wave {
  100% { transform: translateX(100%); }
}`;
        }

        return css;
    };

    const handleCopyAll = () => {
        const out = `<!-- HTML -->\n${generateHtml()}\n\n/* CSS */\n${generateCss()}`;
        navigator.clipboard.writeText(out);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-6">
                <div className="bg-slate-50 border-2 border-black p-6 space-y-6">
                    <h3 className="text-sm font-bold tracking-[0.2em] uppercase border-b-2 border-black pb-2 mb-4">Structure</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <label className="flex items-center gap-2 cursor-pointer font-bold text-sm">
                            <input type="checkbox" checked={hasImage} onChange={e => setHasImage(e.target.checked)} className="w-4 h-4 accent-black" />
                            Header Image
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer font-bold text-sm">
                            <input type="checkbox" checked={hasAvatar} onChange={e => setHasAvatar(e.target.checked)} className="w-4 h-4 accent-black" />
                            Avatar Block
                        </label>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2">Text Rows ({rows})</label>
                            <input type="range" min="0" max="10" value={rows} onChange={e => setRows(Number(e.target.value))} className="w-full accent-black" />
                        </div>
                        {hasAvatar && (
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest mb-2">Avatar Shape</label>
                                <select value={avatarShape} onChange={e => setAvatarShape(e.target.value)} className="w-full border-2 border-black p-1 font-bold">
                                    <option value="circle">Circle</option>
                                    <option value="rounded">Rounded</option>
                                    <option value="square">Square</option>
                                </select>
                            </div>
                        )}
                    </div>

                    <h3 className="text-sm font-bold tracking-[0.2em] uppercase border-b-2 border-black pb-2 mb-4 mt-8">Styling</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2">Animation</label>
                            <select value={animation} onChange={e => setAnimation(e.target.value)} className="w-full border-2 border-black p-1 font-bold">
                                <option value="pulse">Pulse</option>
                                <option value="wave">Wave</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2">Theme Context</label>
                            <select value={theme} onChange={e => setTheme(e.target.value)} className="w-full border-2 border-black p-1 font-bold">
                                <option value="light">Light UI</option>
                                <option value="dark">Dark UI</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest mb-2">Border Radius ({borderRadius}px)</label>
                        <input type="range" min="0" max="24" value={borderRadius} onChange={e => setBorderRadius(Number(e.target.value))} className="w-full accent-black" />
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-[450px] flex flex-col gap-6">
                <div className={`border-2 border-black h-[300px] flex justify-center items-center relative p-6 overflow-hidden ${theme === 'light' ? 'bg-slate-200' : 'bg-slate-800'}`}>
                    <span className={`absolute top-2 left-2 text-[10px] uppercase font-bold tracking-widest opacity-50 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Preview</span>
                    
                    {/* Native CSS Injection via dangerouslySetInnerHTML to preview identical output */}
                    <style dangerouslySetInnerHTML={{ __html: generateCss() }} />
                    <div dangerouslySetInnerHTML={{ __html: generateHtml() }} className="w-full flex justify-center translate-y-2 pointer-events-none" />
                </div>

                <div className="border-2 border-black bg-white flex flex-col h-full relative group max-h-[400px]">
                    <div className="bg-black text-white p-2 flex justify-between items-center text-xs font-bold tracking-[0.2em] uppercase">
                        <span>Code Output</span>
                        <button 
                            onClick={handleCopyAll}
                            className="flex items-center gap-1 hover:text-accent transition-colors"
                        >
                            {copied ? <RefreshCw size={14} className="animate-spin" /> : <Copy size={14} />}
                            {copied ? 'COPIED!' : 'COPY ALL'}
                        </button>
                    </div>
                    <div className="p-4 bg-slate-900 text-slate-300 font-mono text-xs overflow-y-auto whitespace-pre-wrap flex-grow">
{`<!-- HTML Output -->
${generateHtml()}

/* CSS Output */
${generateCss()}`}
                    </div>
                </div>
            </div>
        </div>
    );
}
