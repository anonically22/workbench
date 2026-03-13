import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const DEFAULTS = {
    homepageMode: 'classic',
    enableThemes: true,
    featuredTools: [],
};

const STORAGE_KEY = 'workbench-site-config';

const SiteConfigContext = createContext({ ...DEFAULTS, updateConfig: () => {} });

export function SiteConfigProvider({ children }) {
    const [config, setConfig] = useState(DEFAULTS);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // 1. Check localStorage first (management panel overrides)
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setConfig({ ...DEFAULTS, ...parsed });
                setLoaded(true);
                return;
            } catch {
                // corrupted, fall through to JSON file
            }
        }

        // 2. Fall back to site-config.json
        fetch('/site-config.json')
            .then((res) => {
                if (!res.ok) throw new Error(`Config fetch failed: ${res.status}`);
                return res.json();
            })
            .then((data) => {
                setConfig({ ...DEFAULTS, ...data });
            })
            .catch((err) => {
                console.warn('[SiteConfig] Could not load site-config.json, using defaults.', err);
            })
            .finally(() => setLoaded(true));
    }, []);

    const updateConfig = useCallback((patch) => {
        setConfig((prev) => {
            const next = { ...prev, ...patch };
            // Persist to localStorage so management panel changes survive reloads
            const { _loaded, updateConfig: _, ...toStore } = next;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
            return next;
        });
    }, []);

    // Reset to defaults from site-config.json (clears localStorage override)
    const resetConfig = useCallback(() => {
        localStorage.removeItem(STORAGE_KEY);
        fetch('/site-config.json')
            .then((res) => res.json())
            .then((data) => setConfig({ ...DEFAULTS, ...data }))
            .catch(() => setConfig(DEFAULTS));
    }, []);

    return (
        <SiteConfigContext.Provider value={{ ...config, _loaded: loaded, updateConfig, resetConfig }}>
            {children}
        </SiteConfigContext.Provider>
    );
}

export function useSiteConfig() {
    return useContext(SiteConfigContext);
}
