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
      backgroundColor: {
        'disabled': '#cccccc', // Replace with the color you want for the disabled state
      },
      textColor: {
        'disabled': '#ffffff', // Replace with the color you want for the text in the disabled state
      },
      // boxShadow: {
      //   'bottom-right': '10px  10px  8px rgba(0,  0,  0,  0.25)',
      //   'left-bottom': '-10px  10px  8px rgba(0,  0,  0,  0.25)',
      //   // ... other custom box shadows
      // },
    },
  },
  plugins: [],
};
