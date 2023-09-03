import { AppShell, AppShellProps } from "@mantine/core";
import { Header } from "./Header";
import { useDisclosure } from "@mantine/hooks";
import { Sidebar } from "./Sidebar";

export function DashboardLayout({ children }: AppShellProps) {
  const [opened, { toggle }] = useDisclosure(true);
  return (
    <AppShell
      header={{ height: 56 }}
      navbar={{
        width: 280,
        breakpoint: "sm",
        collapsed: { mobile: !opened }
      }}
    >
      <Header fullWidth isDashboard sidebar={{ opened, toggle }} />
      <Sidebar />
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
