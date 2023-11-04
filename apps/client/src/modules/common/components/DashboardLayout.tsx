import { AppShell, AppShellProps, Box } from "@mantine/core";

import { useSidebar } from "../contexts/SidebarContext";
import { Sidebar } from "./Sidebar";

export function DashboardLayout({ children }: AppShellProps) {
  const { collapsed } = useSidebar();
  return (
    <AppShell
      navbar={{
        width: collapsed ? 80 : 260,
        breakpoint: "sm",
        collapsed: { mobile: true }
      }}
    >
      <Sidebar />
      <AppShell.Main>
        <Box p="lg">{children}</Box>
      </AppShell.Main>
    </AppShell>
  );
}
