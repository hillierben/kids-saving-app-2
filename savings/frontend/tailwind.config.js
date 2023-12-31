/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}"
  ],
  theme: {
    extend: {
      fontFamily: {
        "rowdy-color": ['Rowdies', 'cursive'],
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
  ],
}

