import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react"

const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
}

export const theme = extendTheme(
  {
    fonts: {
      heading: `'Inter', sans-serif`,
      body: `'Inter', sans-serif`,
    },
    initialColorMode: "light",
    useSystemColorMode: false,
    breakpoints,
    colors: {
      blue: {
        "50": "#EDF1FD",
        "100": "#CED8F7",
        "200": "#ABBCF2",
        "300": "#87A1EC",
        "400": "#6485E7",
        "500": "#4169E1",
        "600": "#204ACA",
        "700": "#18399A",
        "800": "#112769",
        "900": "#091539",
      },
      gray: {
        "750": "#202837",
      },
    },
    shadows: { outline: "" },
    components: {
      Checkbox: {
        baseStyle: {
          label: {
            touchAction: "none",
          },
        },
      },
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
