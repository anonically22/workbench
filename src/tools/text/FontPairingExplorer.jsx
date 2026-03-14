import { useState } from 'react';

const GOOGLE_FONTS = [
    'Inter', 'Roboto', 'Poppins', 'Montserrat', 'Playfair Display',
    'Lora', 'Open Sans', 'Raleway', 'Merriweather', 'Oswald',
    'Source Sans 3', 'Nunito', 'DM Sans', 'DM Serif Display', 'Outfit',
    'Space Grotesk', 'Space Mono', 'JetBrains Mono', 'Fira Code',
    'IBM Plex Sans', 'IBM Plex Serif', 'IBM Plex Mono',
    'Bitter', 'Crimson Text', 'Libre Baskerville', 'Cormorant Garamond',
    'Archivo', 'Work Sans', 'Barlow', 'Manrope',
];

const SUGGESTED_PAIRS = [
    { heading: 'Playfair Display', body: 'Inter' },
    { heading: 'DM Serif Display', body: 'DM Sans' },
    { heading: 'Space Grotesk', body: 'Inter' },
    { heading: 'Montserrat', body: 'Merriweather' },
    { heading: 'Oswald', body: 'Lora' },
    { heading: 'Cormorant Garamond', body: 'Outfit' },
    { heading: 'Archivo', body: 'Libre Baskerville' },
    { heading: 'Manrope', body: 'Bitter' },
];

const SAMPLE_TEXT = {
    heading: 'The quick brown fox jumps over the lazy dog',
    body: 'Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed. The arrangement of type involves selecting typefaces, point sizes, line heights, letter-spacing, and word-spacing.',
};

// Load Google Font dynamically
function loadFont(name) {
    const id = `gf-${name.replace(/\s+/g, '-')}`;
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(name)}:wght@400;700&display=swap`;
    document.head.appendChild(link);
}

export default function FontPairingExplorer() {
    const [heading, setHeading] = useState('Playfair Display');
    const [body, setBody] = useState('Inter');
    const [headingSize, setHeadingSize] = useState(40);
    const [bodySize, setBodySize] = useState(16);

    // Pre-load selected fonts
    loadFont(heading);
    loadFont(body);

    const applyPair = (pair) => {
        setHeading(pair.heading);
        setBody(pair.body);
        loadFont(pair.heading);
        loadFont(pair.body);
    };

    const cssSnippet = `/* Heading */\nfont-family: '${heading}', sans-serif;\nfont-size: ${headingSize}px;\n\n/* Body */\nfont-family: '${body}', sans-serif;\nfont-size: ${bodySize}px;`;

    return (
        <div className="space-y-6">
            {/* Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-2 border-black p-5 bg-white space-y-4">
                    <label className="block text-xs font-black uppercase tracking-widest">Heading Font</label>
                    <select value={heading} onChange={e => { setHeading(e.target.value); loadFont(e.target.value); }}
                        className="w-full border-2 border-black px-3 py-2 text-sm font-bold focus:outline-none focus:border-accent">
                        {GOOGLE_FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                    <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Size: {headingSize}px</label>
                        <input type="range" min={20} max={72} value={headingSize} onChange={e => setHeadingSize(+e.target.value)}
                            className="w-full" />
                    </div>
                </div>
                <div className="border-2 border-black p-5 bg-white space-y-4">
                    <label className="block text-xs font-black uppercase tracking-widest">Body Font</label>
                    <select value={body} onChange={e => { setBody(e.target.value); loadFont(e.target.value); }}
                        className="w-full border-2 border-black px-3 py-2 text-sm font-bold focus:outline-none focus:border-accent">
                        {GOOGLE_FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                    <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Size: {bodySize}px</label>
                        <input type="range" min={12} max={28} value={bodySize} onChange={e => setBodySize(+e.target.value)}
                            className="w-full" />
                    </div>
                </div>
            </div>

            {/* Suggested Pairs */}
            <div>
                <p className="text-xs font-black uppercase tracking-widest mb-3">Suggested Pairings</p>
                <div className="flex flex-wrap gap-2">
                    {SUGGESTED_PAIRS.map((p, i) => (
                        <button key={i} onClick={() => applyPair(p)}
                            className={`px-3 py-1.5 border-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${
                                heading === p.heading && body === p.body
                                    ? 'bg-black text-white border-black'
                                    : 'border-slate-300 hover:border-black'
                            }`}>{p.heading} + {p.body}</button>
                    ))}
                </div>
            </div>

            {/* Preview */}
            <div className="border-2 border-black bg-white p-8 space-y-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Live Preview</p>
                <h2 style={{ fontFamily: `'${heading}', sans-serif`, fontSize: `${headingSize}px`, lineHeight: 1.2, fontWeight: 700 }}>
                    {SAMPLE_TEXT.heading}
                </h2>
                <p style={{ fontFamily: `'${body}', sans-serif`, fontSize: `${bodySize}px`, lineHeight: 1.7 }}>
                    {SAMPLE_TEXT.body}
                </p>
            </div>

            {/* CSS Output */}
            <div className="border-2 border-black bg-white p-5">
                <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-black uppercase tracking-widest">CSS</p>
                    <button onClick={() => navigator.clipboard.writeText(cssSnippet)}
                        className="text-[10px] font-bold uppercase tracking-widest text-accent hover:underline">Copy</button>
                </div>
                <pre className="text-xs font-mono bg-slate-50 border border-slate-200 p-4 overflow-x-auto whitespace-pre">{cssSnippet}</pre>
            </div>
        </div>
    );
}
