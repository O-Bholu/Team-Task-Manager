/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eefbf4",
          100: "#d5f6e3",
          500: "#1d9a5c",
          700: "#0f6b3d"
        }
      }
    },
  },
  plugins: [],
};
