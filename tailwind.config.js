/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        Work: ["Work", "sans-serif"],
      },
      backgroundImage: {
        image: "url(/src/assets/Images/background.jpg)",
      },
    },
  },
  plugins: [],
};
