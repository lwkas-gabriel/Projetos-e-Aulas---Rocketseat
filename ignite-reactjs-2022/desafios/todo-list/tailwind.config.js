/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors:{
        gray:{
          200: "#D9D9D9",
          300: "#808080",
          400: "#333333",
          500: "#262626",
          600: "#1A1A1A",
          700: "#0D0D0D"
        },
      },
      fontFamily: {
        sans: ['inter',],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
