/**
 * Greatest Common Divisor
 */
export const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

/**
 * Simplified Aspect Ratio
 */
export const calculateAspectRatio = (width, height) => {
    const dividend = gcd(width, height);
    return {
        ratio: `${width / dividend}:${height / dividend}`,
        w: width / dividend,
        h: height / dividend
    };
};

/**
 * Clamp a number between min and max
 */
export const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

/**
 * Round to specified decimal places
 */
export const roundTo = (num, decimals = 2) => {
    const t = Math.pow(10, decimals);
    return Math.round((num + Number.EPSILON) * t) / t;
};
