import { createStyles } from "@mantine/core"

export const useMobileNavStyles = createStyles((theme) => ({
  wrapper: {
    display: "none",
    justifyContent: "center",
    position: "fixed",
    flexWrap: "nowrap",
    gap: 2,
    bottom: 0,
    left: 0,
    right: 0,
    background: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    borderTop: "1px solid",
    borderColor: theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3],
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      display: "flex",
    },
  },
  navLink: {
    width: "auto",
    display: "flex",
    borderRadius: theme.radius.md,
    "&[data-active='true']": {
      background: theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.blue[0],
    },
  },
}))
