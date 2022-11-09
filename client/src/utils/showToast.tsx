import { IconCheck, IconX } from "@tabler/icons"
import { showNotification } from "@mantine/notifications"
import { Text } from "@mantine/core"
import theme from "~/styles/theme"

export default function showToast(type: "success" | "error", message: string) {
  showNotification({
    icon: type === "success" ? <IconCheck color="white" size={18} /> : <IconX color="white" size={18} />,
    color: type === "success" ? "green" : "red",
    message: <Text sx={{ fontWeight: 500, color: "white" }}>{message}</Text>,
    sx: {
      // borderBottom: "2px solid",
      // borderBottomColor: type === "success" ? "#07b00c" : "#e74c3c",
      background: theme?.colors?.dark?.[5],
      boxShadow: "inset 1px 1px 4px 1px rgb(166 182 255 / 8%)",
    },
    closeButtonProps: {
      sx: {
        color: theme?.colors?.dark?.[2],
      },
    },
  })
}
