/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#DA819F",
        "primary-light": "#F2D0D9",
        "primary-pale": "#F8E8ED",
        "primary-dark": "#B8668A",
        "on-primary": "#ffffff",
        "secondary": "#DA819F",
        "secondary-container": "#F2D0D9",
        "on-secondary-container": "#8B4A63",
        "on-secondary": "#ffffff",
        "tertiary": "#DA819F",
        "tertiary-container": "#F8E8ED",
        "on-tertiary-container": "#8B4A63",
        "surface": "#ffffff",
        "surface-container": "#F8E8ED",
        "surface-container-low": "#FCF7F9",
        "surface-container-high": "#F2D0D9",
        "surface-container-highest": "#EBC4D3",
        "surface-container-lowest": "#ffffff",
        "surface-bright": "#ffffff",
        "surface-dim": "#F8E8ED",
        "surface-variant": "#F2D0D9",
        "on-surface": "#2D2D2D",
        "on-surface-variant": "#5A5A5A",
        "background": "#ffffff",
        "on-background": "#2D2D2D",
        "outline": "#DA819F",
        "outline-variant": "#F2D0D9",
        "error": "#ba1a1a",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a",
        "inverse-surface": "#2D2D2D",
        "inverse-on-surface": "#ffffff",
        "inverse-primary": "#F2D0D9"
      },
      fontFamily: {
        "headline": ["Noto Serif", "serif"],
        "body": ["Manrope", "sans-serif"],
        "label": ["Manrope", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
    },
  },
  plugins: [],
}
