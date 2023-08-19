import { AppShell, AppShellProps } from "@mantine/core";
import Sidebar from "./Sidebar";

export function DashboardLayout({ children }: AppShellProps) {
  // const theme = useMantineTheme();
  return (
    <AppShell navbar={<Sidebar />}>
      {/* <Box
        mb="md"
        sx={{
          margin: -16,
          background: theme.colors.violet[2]
        }}
      >
        <Text
          px="lg"
          py="xs"
          sx={{
            color: theme.fn.darken(theme.colors.violet[9], 0.5),
            fontWeight: 500
          }}
        >
          <span aria-label="party popper emoji" role="img">
            🎉
          </span>{" "}
          progHours v1.0.0 is released. See What's New!{" "}
        </Text>
      </Box> */}
      {children}
    </AppShell>
  );
}
