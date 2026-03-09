/**
 * Transforms string to slug-case
 */
export const toSlug = (text) =>
    text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-');

/**
 * Transforms string to Title Case
 */
export const toTitleCase = (text) =>
    text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

/**
 * Transforms string to camelCase
 */
export const toCamelCase = (text) =>
    text
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
            index === 0 ? word.toLowerCase() : word.toUpperCase()
        )
        .replace(/\s+/g, '');

/**
 * Simple word count
 */
export const getWordCount = (text) => {
    if (!text) return 0;
    return text.trim().split(/\s+/).filter(Boolean).length;
};
