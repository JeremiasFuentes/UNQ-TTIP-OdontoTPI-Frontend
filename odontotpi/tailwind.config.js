/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/components/paciente.js"],
  theme: {
    extend: {},
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
