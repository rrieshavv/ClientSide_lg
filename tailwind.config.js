/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        hrOrange: "#FF6C37",
        hrGray: "#6B6B6B"
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to bottom, #FFFAE7 50%, #FFE0AD 100%)',
      },
    },
  },
  plugins: [],
}