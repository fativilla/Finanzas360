/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        athYellow: "#1EA56A",
        athYellowDark: "#0A2C5A",
        athGrayLight: "#F3F4F6",
        athGray: "#9CA3AF",
      },
    },
  },
  plugins: [],
}
