import { AppShell, AppShellProps, Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Sidebar } from "./Sidebar";

export function DashboardLayout({ children }: AppShellProps) {
  const [opened] = useDisclosure(true);
  return (
    <AppShell
      navbar={{
        width: 260,
        breakpoint: "sm",
        collapsed: { mobile: !opened }
      }}
    >
      {/* <Header fullWidth isDashboard sidebar={{ opened, toggle }} /> */}
      <Sidebar />
      <AppShell.Main>
        <Box p="lg">{children}</Box>
      </AppShell.Main>
    </AppShell>
  );
}
