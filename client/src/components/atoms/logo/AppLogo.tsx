import AppIcon from "./AppIcon"
import { Box, Group, Text, Title, useMantineTheme } from "@mantine/core"

export default function AppLogo() {
  const theme = useMantineTheme()
  return (
    <Group
      spacing="sm"
      sx={{
        alignItems: "center",
        color: theme.colors[theme.primaryColor][5],
      }}
    >
      <AppIcon width={28} height={28} />
      <Box
        sx={{
          color: theme.colorScheme === "dark" ? theme.white : theme.colors.blue[5],
        }}
      >
        <Title
          order={4}
          sx={{
            color: theme.colorScheme === "dark" ? theme.white : theme.colors.blue[5],
          }}
        >
          progHours
        </Title>
        <Text sx={{ fontSize: "10px" }}>v0.3.0</Text>
      </Box>
    </Group>
  )
}
