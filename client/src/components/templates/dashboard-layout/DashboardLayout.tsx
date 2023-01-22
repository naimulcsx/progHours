import { AppShell, AppShellProps } from "@mantine/core"
import { MobileNav, Navbar, Sidebar } from "~/components/organisms"

export default function DashboardLayout({ children }: AppShellProps) {
  return (
    <>
      <AppShell
        header={<Navbar />}
        sx={(theme) => ({
          // replace with theme function
          "@media (max-width: 755px)": {
            paddingBottom: 56,
          },
        })}
        navbar={<Sidebar />}
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[0],
          },
        })}
      >
        {children}
      </AppShell>
      <MobileNav />
    </>
  )
}
