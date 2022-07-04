import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react"

const breakpoints = {
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
  "2xl": "1536px",
}

export const theme = extendTheme(
  {
    breakpoints,
    colors: {
      blue: {
        "50": "#EDF1FD",
        "100": "#D8E1FC",
        "200": "#AEC1F8",
        "300": "#83A1F4",
        "400": "#5981F1",
        "500": "#2F61ED",
        "600": "#1245D2",
        "700": "#0E349E",
        "800": "#09236A",
        "900": "#051237",
      },
    },
    components: {
      Link: {
        baseStyle: {
          color: "blue.500",
        },
      },
      Container: {
        baseStyle: {
          maxW: Object.values(breakpoints),
        },
      },
    },
  },
  withDefaultColorScheme({ colorScheme: "blue" })
)
