import { IconCheck, IconX } from "@tabler/icons"
import { showNotification } from "@mantine/notifications"
import { Text } from "@mantine/core"
import theme from "~/styles/theme"

export default function showToast(type: "success" | "error", message: string) {
  showNotification({
    icon: type === "success" ? <IconCheck color="white" size={18} /> : <IconX color="white" size={18} />,
    color: type === "success" ? "green" : "red",
    message: (
      <Text
        sx={(theme) => ({ fontWeight: 500, color: theme.colorScheme === "dark" ? theme.white : theme.colors.dark[9] })}
      >
        {message}
      </Text>
    ),
    sx: (theme) => ({
      background: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
      boxShadow: theme.colorScheme === "dark" ? "inset 1px 1px 4px 1px rgb(166 182 255 / 8%)" : theme.shadows.xs,
    }),
    closeButtonProps: {
      sx: {
        color: theme?.colors?.dark?.[2],
      },
    },
  })
}
