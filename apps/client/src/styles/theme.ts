import {
  AnchorProps,
  ButtonProps,
  MantineTheme,
  MantineThemeOverride,
  TextProps,
  TitleProps
} from "@mantine/core";

const getTitleDefaultProps = (theme: MantineTheme): TitleProps => ({
  color: theme.colors.dark[9]
});

const getTextDefaultProps = (theme: MantineTheme): TextProps => ({
  color: theme.colors.dark[7]
});

const getButtonDefaultProps = (theme: MantineTheme): ButtonProps => ({
  sx: {
    fontWeight: 500,
    background: theme.colors.blue[5],
    "&:hover": {
      background: theme.colors.blue[6]
    }
  }
});

const getAnchorDefaultProps = (theme: MantineTheme): AnchorProps => ({
  color: theme.colors.blue[5],
  sx: {
    fontWeight: 500
  }
});

const theme: MantineThemeOverride = {
  defaultRadius: "md",
  fontFamily: "Inter, sans-serif",
  components: {
    Text: { defaultProps: getTextDefaultProps },
    Title: { defaultProps: getTitleDefaultProps },
    Button: { defaultProps: getButtonDefaultProps },
    Anchor: { defaultProps: getAnchorDefaultProps }
  },
  colors: {
    blue: [
      "#f1f4fd",
      "#dfe7fa",
      "#c5d5f8",
      "#9ebbf2",
      "#7097ea",
      "#4169e1", // [5] button bg
      "#3957d7", // [6] button hover bg
      "#3044c5",
      "#2d39a0",
      "#29347f"
    ],
    dark: [
      "#C1C7D6",
      "#A8B1C6",
      "#909BB6",
      "#3C455D",
      "#282E3E",
      "#212634",
      "#242936", // [6] navbar bg
      "#191b27", // [7] paper bg
      "#14171F", // [8] body bg
      "#0d0f1e"
    ]
  }
};

export default theme;
