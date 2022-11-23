import { FC } from "react"
import NewSidebar from "~/components/sidebar/NewSidebar"
import { AppShell, AppShellProps } from "@mantine/core"
import Navbar from "../navbar"
import MobileNavigation from "~/components/sidebar/MobileNavigation"

export const DashboardLayout: FC<AppShellProps> = ({ children }) => {
  return (
    <>
      <AppShell
        header={<Navbar />}
        sx={(theme) => ({
          "@media (max-width: 755px)": {
            paddingBottom: 48,
          },
        })}
        navbar={<NewSidebar />}
        styles={(theme) => ({
          main: {
            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
          },
        })}
      >
        {children}
      </AppShell>
      <MobileNavigation />
    </>
  )
}
