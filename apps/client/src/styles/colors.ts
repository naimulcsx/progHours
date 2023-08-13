import { MantineTheme } from "@mantine/core";

export const getBorderColor = (theme: MantineTheme) => {
  return theme.colorScheme === "dark"
    ? theme.colors.dark[4]
    : theme.colors.gray[2];
};
