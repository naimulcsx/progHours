import { createStyles } from "@mantine/core"

export const useNavbarStyles = createStyles((theme) => ({
  wrapper: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },
}))
