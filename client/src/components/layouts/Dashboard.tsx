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
        padding="md"
        navbar={<NewSidebar />}
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        {children}
      </AppShell>
      <MobileNavigation />
    </>
  )
}
