import chroma from 'chroma-js';

/**
 * Converts HEX to RGB
 */
export const hexToRgb = (hex) => chroma(hex).rgb();

/**
 * Converts RGB to HEX
 */
export const rgbToHex = (r, g, b) => chroma(r, g, b).hex();

/**
 * Calculates WCAG contrast ratio between two colours
 */
export const getContrastRatio = (fg, bg) => chroma.contrast(fg, bg);

/**
 * Checks if a colour pair passes WCAG AA or AAA
 */
export const checkWCAG = (fg, bg) => {
    const ratio = getContrastRatio(fg, bg);
    return {
        ratio,
        aaNormal: ratio >= 4.5,
        aaLarge: ratio >= 3.0,
        aaaNormal: ratio >= 7.0,
        aaaLarge: ratio >= 4.5
    };
};

/**
 * Generates a shade scale (50-950) for a base colour
 */
export const generateShades = (baseColor) => {
    const scale = chroma.scale(['white', baseColor, 'black']).domain([0, 0.5, 1]).mode('lch').colors(12);
    // Map to Tailwind-like stops
    return {
        50: scale[1],
        100: scale[2],
        200: scale[3],
        300: scale[4],
        400: scale[5],
        500: scale[6],
        600: scale[7],
        700: scale[8],
        800: scale[9],
        900: scale[10],
        950: scale[11]
    };
};
