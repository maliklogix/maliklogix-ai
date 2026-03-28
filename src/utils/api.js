export const api = (path) => {
    const BASE = import.meta.env.VITE_API_URL || '';
    return `${BASE}${path}`;
};
