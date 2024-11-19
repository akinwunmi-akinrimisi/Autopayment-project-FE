/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        btn_bg: "#EA3982",
        text: "#333333CC",
        navlink: "#FFD8E4",

        bg: "#F6F9FF",

        primary: {
          base: "#0D4A9F",
          dark: "#143869",
          light: "#1F4983",
        }
      }
    },
  },
  plugins: [],
}

