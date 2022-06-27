import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react"
const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px)",
}
export const theme = extendTheme(
  {
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
    },
  },
  withDefaultColorScheme({ colorScheme: "blue" })
)
