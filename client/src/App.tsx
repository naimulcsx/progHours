import { FC } from "react"
import { Box, MantineProvider } from "@mantine/core"
import { SpotlightProvider } from "@mantine/spotlight"
import { NotificationsProvider } from "@mantine/notifications"
import { useNavigate, useRoutes } from "react-router-dom"
import { IconSearch } from "@tabler/icons"
import { ReactQueryDevtools } from "react-query/devtools"

import type { User } from "~/contexts/UserContext"
import SubmissionsProvider from "~/contexts/SubmissionsContext"
import getSpotlightActions from "~/utils/getSpotlightActions"
import getRoutes from "~/routes"
import useUser from "~/hooks/useUser"
import useLogout from "~/hooks/useLogout"
import theme from "~/styles/theme"
import "~/styles/custom.css"

const Entry: FC<{ isLoggedIn: boolean; user: User | null }> = ({ isLoggedIn, user }) => {
  const handleLogout = useLogout()
  const navigate = useNavigate()
  const role: string = user ? user.role : "GUEST"
  const matchedPage = useRoutes(getRoutes(isLoggedIn, role))
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <NotificationsProvider position="top-center" transitionDuration={250}>
        <SpotlightProvider
          actions={getSpotlightActions(navigate, handleLogout, user)}
          searchIcon={<IconSearch size={18} />}
          searchPlaceholder="Search..."
          shortcut="mod + shift + p"
          nothingFoundMessage="Nothing found..."
        >
          <Box
            sx={(theme) => ({
              background: theme.colors.dark[8],
              minHeight: "100vh",
              overflow: "hidden",
            })}
          >
            {isLoggedIn ? (
              <SubmissionsProvider>
                <main>{matchedPage}</main>
              </SubmissionsProvider>
            ) : (
              <main>{matchedPage}</main>
            )}
          </Box>
        </SpotlightProvider>
        {/* <ReactQueryDevtools position="bottom-right" /> */}
      </NotificationsProvider>
    </MantineProvider>
  )
}

export default function App() {
  const { user } = useUser()
  // request is loading
  if (user === undefined) return <></>

  // user is null when no user is logged in
  const isLoggedIn = user !== null
  return <Entry isLoggedIn={isLoggedIn} user={user} />
}
