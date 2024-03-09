import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'pink': 'var(--pink)',
        'blue': 'var(--blue)',
        'purple': 'var(--purple)',
        'grey': 'var(--grey)',
        'dark_text': 'var(--dark_text)',
        'light_text': 'var(--light_text)',
        'faint_text': 'var(--faint_text)'
      },
    },
  },
  plugins: [],
};
export default config;
