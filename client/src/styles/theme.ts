import { MantineThemeOverride } from "@mantine/core"

const theme: MantineThemeOverride = {
  defaultRadius: "md",
  primaryColor: "blue",
  primaryShade: 5,
  colorScheme: "dark",
  fontFamily: "Inter, sans-serif",
  colors: {
    blue: [
      "#EDF1FD",
      "#CED8F7",
      "#ABBCF2",
      "#87A1EC",
      "#6485E7",
      "#4169E1",
      "#204ACA",
      "#18399A",
      "#112769",
      "#091539",
    ],
    dark: [
      "#C1C7D6",
      "#A8B1C6",
      "#909BB6",
      "#3C455D",
      "#282E3E",
      "#212634",
      "#242936", // 6 -> navbar bg
      "#191b27", // 7 -> paper bg
      "#14171F", // 8 -> body bg
      "#0D0F15",
    ],
  },
}

export default theme
