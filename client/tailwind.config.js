const colors = require("tailwindcss/colors")

module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  colors: { ...colors },
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      game: ["'Sigmar One'", "sans-serif"],
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
        primary: "#1d4ed8",
        primaryDark: "#2E2C34",
        secondaryDark: "#84818A",
        lightGrey: "#f2edf7",
        light: "#f9f7fa",
        sky: "#00A5FF",
        orange: "#FF5C00",
        lightGreen: "#AAF3B2",
        dark: "#0a0347",
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
