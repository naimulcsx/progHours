import { IconCheck, IconX } from "@tabler/icons"
import { showNotification } from "@mantine/notifications"
import { Text } from "@mantine/core"

export default function showToast(type: "success" | "error", message: string) {
  showNotification({
    icon:
      type === "success" ? (
        <IconCheck color="white" size={18} />
      ) : (
        <IconX color="white" size={18} />
      ),
    color: type === "success" ? "green" : "red",
    message: <Text sx={{ fontWeight: 500 }}>{message}</Text>,
    sx: {
      borderBottom: "2px solid",
      borderBottomColor: type === "success" ? "#07b00c" : "#e74c3c",
    },
    closeButtonProps: {
      sx: {
        color: type === "success" ? "#07b00c" : "#e74c3c",
      },
    },
  })
}
