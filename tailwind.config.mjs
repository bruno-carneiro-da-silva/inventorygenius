/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#F3F4FF",
          DEFAULT: "#c1bbeb",
          dark: "#4d44b5",
          darker: "#303972"
        },
        contrastText: "#ffffff",
      },
    },
  },
  plugins: [],
};
