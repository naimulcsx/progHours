import { AppShell, AppShellProps, Box, useMantineTheme } from "@mantine/core";
import Sidebar from "./Sidebar";

export function DashboardLayout({ children }: AppShellProps) {
  const theme = useMantineTheme();

  return (
    <AppShell
      styles={{
        body: {}
      }}
      navbar={<Sidebar />}
    >
      <Box
        sx={{
          [theme.fn.largerThan("md")]: {
            padding: 8
          }
        }}
      >
        {children}
      </Box>
    </AppShell>
  );
}
