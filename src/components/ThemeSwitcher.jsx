import { useState, useEffect, useRef } from 'react';
import { Palette } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';

const THEMES = [
    { id: '',         label: 'Classic',   swatch: ['#F8FAFC', '#0d59f2', '#000000'] },
    { id: 'blue',     label: 'Blue',      swatch: ['#eff6ff', '#2563eb', '#1e3a5f'] },
    { id: 'colorlab', label: 'Color Lab', swatch: ['#faf5ff', '#8b5cf6', '#3b1f6e'] },
    { id: 'dark',     label: 'Dark',      swatch: ['#0f0f11', '#6366f1', '#e4e4e7'] },
    { id: 'candy',    label: 'Candy',     swatch: ['#fff5f7', '#e11d74', '#4a1942'] },
    { id: 'tropical', label: 'Tropical',  swatch: ['#f0fdfa', '#0d9488', '#134e4a'] },
    { id: 'sunset',   label: 'Sunset',    swatch: ['#fff7ed', '#ea580c', '#431407'] },
];

const STORAGE_KEY = 'workbench-theme';

function applyTheme(themeId) {
    if (themeId) {
        document.documentElement.dataset.theme = themeId;
    } else {
        delete document.documentElement.dataset.theme;
    }
}

export default function ThemeSwitcher() {
    const { enableThemes } = useSiteConfig();
    const [current, setCurrent] = useState(() => localStorage.getItem(STORAGE_KEY) || '');
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    // Apply theme on mount and change
    useEffect(() => {
        applyTheme(current);
    }, [current]);

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    // Restore stored theme on first mount (before config loads)
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) applyTheme(stored);
    }, []);

    if (!enableThemes) return null;

    const select = (id) => {
        setCurrent(id);
        localStorage.setItem(STORAGE_KEY, id);
        setOpen(false);
    };

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen(!open)}
                className="border-2 border-black bg-surface w-10 h-10 hover:bg-accent hover:text-white transition-colors brutalist-shadow-sm flex items-center justify-center"
                aria-label="Switch theme"
                title="Switch theme"
            >
                <Palette size={16} strokeWidth={2.5} />
            </button>

            {open && (
                <div className="absolute right-0 top-full mt-2 z-50 border-2 border-black bg-surface w-48 brutalist-shadow">
                    <div className="p-2 text-[10px] font-bold uppercase tracking-[0.2em] border-b-2 border-black px-3 opacity-60">
                        SELECT THEME
                    </div>
                    {THEMES.map((t) => (
                        <button
                            key={t.id}
                            onClick={() => select(t.id)}
                            className={`w-full px-3 py-2.5 flex items-center gap-3 text-left hover:bg-accent/10 transition-colors ${
                                current === t.id ? 'bg-accent/10 font-bold' : ''
                            }`}
                        >
                            {/* Swatch dots */}
                            <div className="flex gap-1">
                                {t.swatch.map((c, i) => (
                                    <div
                                        key={i}
                                        className="w-3 h-3 border border-black/20"
                                        style={{ backgroundColor: c }}
                                    />
                                ))}
                            </div>
                            <span className="text-xs font-bold uppercase tracking-widest">
                                {t.label}
                            </span>
                            {current === t.id && (
                                <span className="ml-auto text-accent text-sm">●</span>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
