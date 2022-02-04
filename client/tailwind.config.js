module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
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
        lightGrey: "#EBEAED",
        light: "#FBFAFC",
        sky: "#00A5FF",
        orange: "#FF5C00",
        green: "#0F7432",
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
