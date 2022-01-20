module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      serif: ['Kanit']
    },
    extend: {
      colors: {
        'cdark': '#004c8b',
        'clight': '#58a5ef',
        'cprimary': '#0277bc'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
