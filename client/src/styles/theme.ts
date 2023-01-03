import { ButtonStylesParams, MantineTheme, MantineThemeOverride } from "@mantine/core"

const theme: MantineThemeOverride = {
  defaultRadius: "md",
  primaryColor: "blue",
  primaryShade: 5,
  fontFamily: "Inter, sans-serif",
  headings: {
    fontFamily: "Inter, sans-serif",
  },
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
      "#0d0f1e",
    ],
  },
  components: {
    Title: {
      styles: (theme: MantineTheme) => ({
        root: {
          color: theme.colorScheme === "dark" ? theme.white : theme.colors.dark[9],
        },
      }),
    },
    Paper: {
      styles: (theme: MantineTheme, params: ButtonStylesParams) => ({
        root: {
          boxShadow:
            theme.colorScheme === "dark"
              ? "0px 4px 8px -4px rgb(0 0 0 / 25%), inset 0px -1px 1px rgb(0 0 0 / 4%), inset 0px 2px 0px rgb(255 255 255 / 6%)"
              : theme.shadows.xs,
          background:
            theme.colorScheme === "dark"
              ? "linear-gradient(to right bottom, #1e212e 1.34%, #1c1e2b 98.64%)"
              : theme.white,
        },
      }),
    },
  },
}

export default theme
