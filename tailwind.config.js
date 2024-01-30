/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Grape: ["GrapeNuts", "sans-serif"],
      },
      rounded: {
        'full-tr-bl': '20% 40% 60% 10% / 70% 70% 10% 30%',
      },
    },
  },
  plugins: [],
};
