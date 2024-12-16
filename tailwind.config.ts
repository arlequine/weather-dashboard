import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#06083d',
        foreground: '#ffffff',
        'button-bg': '#28a745',
        'button-hover-bg': '#218838',
        'card-bg': '#ffffff',
        'border-color': '#ced4da',
      },
    },
  },
  plugins: [],
} satisfies Config;
