/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'idatria-mauve': 'hsla(8, 17%, 37%, 1)',        // #6D524E
        'idatria-taupe': 'hsla(15, 28%, 57%, 1)',       // #B18273
        'idatria-rosy': 'hsla(16, 36%, 68%, 1)',        // #CBA091
        'idatria-blush': 'hsla(328, 61%, 94%, 1)',      // #F9E6F0
        'idatria-fuchsia': 'hsla(323, 50%, 53%, 1)',    // #C34C95
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'ui-serif', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};