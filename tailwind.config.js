const colors = require('tailwindcss/colors')
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        orange: colors.orange,
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
