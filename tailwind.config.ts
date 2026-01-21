import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'deep-space-blue': '#003049',
        'flag-red': '#d62828',
        'vivid-tangerine': '#f77f00',
        'sunflower-gold': '#fcbf49',
        'vanilla-custard': '#eae2b7',
      },
      fontFamily: {
        'outfit': ['Outfit', 'sans-serif'],
        'permanent-marker': ['Permanent Marker', 'cursive'],
        'rubik-glitch': ['Rubik Glitch', 'cursive'],
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // Disable Tailwind preflight to prevent conflicts with MUI
  },
}
export default config





