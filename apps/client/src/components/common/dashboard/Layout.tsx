import { AppShell, AppShellProps, Box, Text } from "@mantine/core";
import Sidebar from "./Sidebar";

export function DashboardLayout({ children }: AppShellProps) {
  return (
    <AppShell navbar={<Sidebar />}>
      <Box
        mb="md"
        sx={(theme) => ({
          margin: -16,
          background: theme.colors[theme.primaryColor][6]
        })}
      >
        <Text px="lg" py="xs" sx={{ color: "white", fontWeight: 500 }}>
          <span aria-label="party popper emoji" role="img">
            🎉
          </span>{" "}
          progHours v1.0.0 is released. See What's New!{" "}
        </Text>
      </Box>
      {children}
    </AppShell>
  );
}
