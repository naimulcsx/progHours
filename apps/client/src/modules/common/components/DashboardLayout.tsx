import { AppShell, AppShellProps, Box } from "@mantine/core";

import { useSidebar } from "../contexts/SidebarContext";
import { BottomBar } from "./BottomBar";
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
      p={16}
    >
      <Sidebar />
      <BottomBar />
      <AppShell.Main>
        <Box>{children}</Box>
      </AppShell.Main>
    </AppShell>
  );
}
