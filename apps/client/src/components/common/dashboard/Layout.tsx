import { AppShell, AppShellProps } from "@mantine/core";
import Sidebar from "./Sidebar";

export function DashboardLayout({ children }: AppShellProps) {
  return (
    <AppShell navbar={<Sidebar />} sx={{ padding: 8 }}>
      {children}
    </AppShell>
  );
}
