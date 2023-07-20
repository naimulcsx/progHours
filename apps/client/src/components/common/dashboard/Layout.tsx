import { AppShell, AppShellProps } from "@mantine/core";
import Sidebar from "./Sidebar";

export function DashboardLayout({ children }: AppShellProps) {
  return <AppShell navbar={<Sidebar />}>{children}</AppShell>;
}
