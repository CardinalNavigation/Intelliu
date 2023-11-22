/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      //custom css starts here
      colors: {
        // checkout tailwinds's default colors:
        // https://tailwindcss.com/docs/customizing-colors 
        'green1': "#22b573",
        'green1dark': '#1b9960',
      }
    },
    fontFamily: {
      'sans': ['Helvetica', 'Arial', 'sans-serif'],
    }
  },
  plugins: [],
}


// https://tailwindcss.com/docs/utility-first 