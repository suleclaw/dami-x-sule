/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0a',
        surface: '#111111',
        text: '#e8e4dd',
        'text-dim': '#787167',
        accent: '#f0a500',
        'accent-glow': '#f0a50033',
        border: '#1e1e1e',
      },
      fontFamily: {
        mono: ['"Space Mono"', 'monospace'],
        serif: ['"Lora"', 'serif'],
        code: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
