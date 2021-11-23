module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Manrope", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#5542F6",
      },
      boxShadow: {
        "input-none": "0 1px 0 #fff",
        "input-primary": "0 1px 0 #5542F6",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
