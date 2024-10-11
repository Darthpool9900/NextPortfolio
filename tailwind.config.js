/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        blue_bg: "#0D0D12",
        text_blue: "#34C6CF",
      },
    },
    screens: {
      'mobile': { 'max': '360px' }, // Breakpoint agora usa max-width
      'tablet': { 'max': '640px' }, // Breakpoint
      'really_small': { 'max': '320px' }, // Breakpoint
    },
    dropShadow: {
      'blue-Shadow': '0 0px 25px rgba(52, 198, 207, 0.55)',
    },
  },
  plugins: [],
};
