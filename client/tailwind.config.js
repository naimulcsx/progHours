module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Manrope", "sans-serif"],
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        primary: "#5542F6",
        primaryDark: "#2E2C34",
        secondaryDark: "#84818A",
        borderColor: "#EBEAED",
        light: "#F8F7FA",
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
