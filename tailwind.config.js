/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#080C10",
                foreground: "#F8FAFC",
                accent: {
                    DEFAULT: "#06B6D4",
                    light: "#22D3EE",
                    dark: "#0891B2",
                },
                secondary: "#475569",
            },
            fontFamily: {
                display: ["Space Grotesk", "sans-serif"],
                body: ["Inter", "sans-serif"],
                mono: ["Fira Code", "monospace"],
            },
            animation: {
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
        },
    },
    plugins: [],
}
