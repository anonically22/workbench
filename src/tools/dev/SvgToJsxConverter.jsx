import { useState } from 'react';

function svgToJsx(svg) {
    if (!svg.trim()) return '';

    let jsx = svg;

    // Attribute transforms (kebab-case → camelCase for React)
    const attrMap = {
        'class': 'className',
        'for': 'htmlFor',
        'fill-rule': 'fillRule',
        'clip-rule': 'clipRule',
        'clip-path': 'clipPath',
        'fill-opacity': 'fillOpacity',
        'stroke-width': 'strokeWidth',
        'stroke-linecap': 'strokeLinecap',
        'stroke-linejoin': 'strokeLinejoin',
        'stroke-dasharray': 'strokeDasharray',
        'stroke-dashoffset': 'strokeDashoffset',
        'stroke-miterlimit': 'strokeMiterlimit',
        'stroke-opacity': 'strokeOpacity',
        'font-family': 'fontFamily',
        'font-size': 'fontSize',
        'font-weight': 'fontWeight',
        'font-style': 'fontStyle',
        'text-anchor': 'textAnchor',
        'text-decoration': 'textDecoration',
        'dominant-baseline': 'dominantBaseline',
        'alignment-baseline': 'alignmentBaseline',
        'baseline-shift': 'baselineShift',
        'stop-color': 'stopColor',
        'stop-opacity': 'stopOpacity',
        'flood-color': 'floodColor',
        'flood-opacity': 'floodOpacity',
        'color-interpolation': 'colorInterpolation',
        'color-interpolation-filters': 'colorInterpolationFilters',
        'xlink:href': 'xlinkHref',
        'xml:space': 'xmlSpace',
        'xmlns:xlink': '', // remove
        'xmlns': '', // keep only on root, but safe to leave
    };

    // Replace known attributes
    for (const [from, to] of Object.entries(attrMap)) {
        if (to === '') {
            // Remove the attribute entirely
            jsx = jsx.replace(new RegExp(`\\s${from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}="[^"]*"`, 'g'), '');
        } else {
            jsx = jsx.replace(new RegExp(`\\b${from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}=`, 'g'), `${to}=`);
        }
    }

    // Convert remaining kebab-case attributes to camelCase (data-* and aria-* excluded)
    jsx = jsx.replace(/\b([a-z]+)-([a-z])(?![a-z]*(?:data-|aria-))/g, (_, a, b) => `${a}${b.toUpperCase()}`);

    // Self-close tags without children
    jsx = jsx.replace(/<([\w]+)([^>]*?)><\/\1>/g, '<$1$2 />');

    // Convert inline style strings to objects (basic)
    jsx = jsx.replace(/style="([^"]*)"/g, (_, styles) => {
        const obj = styles.split(';').filter(Boolean).map(s => {
            const [k, v] = s.split(':').map(x => x.trim());
            const camelKey = k.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
            return `${camelKey}: '${v}'`;
        }).join(', ');
        return `style={{${obj}}}`;
    });

    return jsx;
}

export default function SvgToJsxConverter() {
    const [input, setInput] = useState('');
    const output = svgToJsx(input);

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* SVG Input */}
                <div className="border-2 border-black bg-white p-5">
                    <label className="block text-xs font-black uppercase tracking-widest mb-3">SVG Input</label>
                    <textarea
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder={'<svg viewBox="0 0 24 24" fill-rule="evenodd">\n  <path d="M12 2..." />\n</svg>'}
                        className="w-full h-64 font-mono text-xs border-2 border-slate-200 p-3 focus:outline-none focus:border-accent resize-none"
                    />
                </div>

                {/* JSX Output */}
                <div className="border-2 border-black bg-white p-5">
                    <div className="flex items-center justify-between mb-3">
                        <label className="text-xs font-black uppercase tracking-widest">JSX Output</label>
                        <button onClick={handleCopy} disabled={!output}
                            className="text-[10px] font-bold uppercase tracking-widest text-accent hover:underline disabled:text-slate-300">
                            Copy
                        </button>
                    </div>
                    <pre className="w-full h-64 font-mono text-xs bg-slate-50 border-2 border-slate-200 p-3 overflow-auto whitespace-pre">
                        {output || 'Paste SVG markup on the left...'}
                    </pre>
                </div>
            </div>

            {/* Conversion Reference */}
            <div className="border-2 border-black bg-white p-5">
                <p className="text-xs font-black uppercase tracking-widest mb-3">Attribute Conversions</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[10px] font-mono">
                    {[
                        ['fill-rule', 'fillRule'], ['clip-rule', 'clipRule'], ['stroke-width', 'strokeWidth'],
                        ['stroke-linecap', 'strokeLinecap'], ['class', 'className'], ['font-size', 'fontSize'],
                        ['text-anchor', 'textAnchor'], ['xlink:href', 'xlinkHref'],
                    ].map(([from, to]) => (
                        <div key={from} className="border border-slate-200 px-2 py-1">
                            <span className="text-red-500 line-through">{from}</span> → <span className="text-green-600">{to}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
