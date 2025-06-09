/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        antracit: "#121212",
        "kiraly-lila": "#6b21a8",
        fekete: "#000000",
        feher: "#ffffff",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        "pulse-fast": "pulse 1s infinite",
      },
    },
  },
  plugins: [],
};
