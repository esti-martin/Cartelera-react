/** @type {import('tailwindcss').Config} */
export default {
 darkMode: "class", // usa clases en lugar de detectar preferencia del sistema
 content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // muy importante si usás React
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
