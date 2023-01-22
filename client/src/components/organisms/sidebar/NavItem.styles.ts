import { createStyles } from "@mantine/core"

export const useNavItemStyles = createStyles((theme) => ({
  navItem: {
    background: "transparent",
    borderRadius: theme.radius.md,
    paddingLeft: 4,
    paddingRight: 4,
    "&[data-active='true']": {
      "&:hover": {
        background: theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2],
      },
      color: theme.colorScheme === "dark" ? theme.white : theme.colors.dark[8],
      background: theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[1],
      boxShadow:
        theme.colorScheme === "dark"
          ? "inset 0px -2px 1px rgb(0 0 0 / 40%), inset 0px 1px 1px rgb(255 255 255 / 11%)"
          : "none",
    },
    "& span": {
      fontWeight: 500,
    },
  },
}))
