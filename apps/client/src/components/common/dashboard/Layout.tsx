import { AppShell, AppShellProps, Box } from "@mantine/core";
import Sidebar from "./Sidebar";

export function DashboardLayout({ children }: AppShellProps) {
  return (
    <AppShell
      styles={{
        body: {}
      }}
      navbar={<Sidebar />}
    >
      <Box p={8}>{children}</Box>
    </AppShell>
  );
}
