/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '400px', // Custom screen size for extra small devices
        'xl': '1180px', // Modify or add larger screens if needed
      },
      colors: {
        mygreen: "#01321F",
        mywhite: "#F9F9F9",
        myblack: "#080808",
        mybeige: "#FFD599",
        greeny: "#026F42",
      },
      fontFamily: {
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
