/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        blue:" #000000",
        neonGreen:"#39FF14",
        dirtWhite:"#FFF7F7",
        lightGreen:"#B7C9B1",
        mustard:"#ffc017"
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
}

