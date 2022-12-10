import { FC, useEffect } from "react"
import { Box, ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core"
import { SpotlightProvider } from "@mantine/spotlight"
import { NotificationsProvider } from "@mantine/notifications"
import { useLocation, useNavigate, useRoutes } from "react-router-dom"
import { IconSearch } from "@tabler/icons"

import type { User } from "~/contexts/UserContext"
import SubmissionsProvider from "~/contexts/SubmissionsContext"
import getSpotlightActions from "~/utils/getSpotlightActions"
import getRoutes from "~/routes"
import useUser from "~/hooks/useUser"
import useLogout from "~/hooks/useLogout"
import theme from "~/styles/theme"
import "~/styles/custom.css"
import { useLocalStorage } from "@mantine/hooks"

const Entry: FC<{ isLoggedIn: boolean; user: User | null }> = ({ isLoggedIn, user }) => {
  const handleLogout = useLogout()
  const navigate = useNavigate()
  const role: string = user ? user.role : "GUEST"
  const matchedPage = useRoutes(getRoutes(isLoggedIn, role))

  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  })

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"))

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme, ...theme }}>
        <NotificationsProvider position="top-center" transitionDuration={250}>
          <SpotlightProvider
            actions={getSpotlightActions(navigate, handleLogout, user)}
            searchIcon={<IconSearch size={18} />}
            searchPlaceholder="Search..."
            shortcut="mod + k"
            nothingFoundMessage="Nothing found..."
          >
            <Box
              sx={(theme) => ({
                background: colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
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
    </ColorSchemeProvider>
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
