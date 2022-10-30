import { FC } from "react"
import { User } from "@/contexts/UserContext"
import { Box, MantineProvider } from "@mantine/core"
import { NotificationsProvider } from "@mantine/notifications"
import { ReactQueryDevtools } from "react-query/devtools"
import { SpotlightAction, SpotlightProvider } from "@mantine/spotlight"

// routes
import routes from "@/routes"

// hooks
import { NavigateFunction, useNavigate, useRoutes } from "react-router-dom"
import useUser from "@/hooks/useUser"
import useLogout from "@/hooks/useLogout"

// styles
import theme from "@/styles/theme"
import "@/styles/custom.css"
import {
  IconChartBar,
  IconDashboard,
  IconLogout,
  IconSearch,
} from "@tabler/icons"
import { SubmissionsProvider } from "./contexts/SubmissionsContext"

const App = () => {
  const { user } = useUser()
  // request is loading
  if (user === undefined) return <></>

  // user is null when no user is logged in
  const isLoggedIn = user !== null
  return <Entry isLoggedIn={isLoggedIn} user={user} />
}

const Entry: FC<{ isLoggedIn: boolean; user: User | null }> = ({
  isLoggedIn,
  user,
}) => {
  const handleLogout = useLogout()
  const navigate = useNavigate()
  const role: string = user ? user.role : "GUEST"
  const matchedPage = useRoutes(routes(isLoggedIn, role))
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <NotificationsProvider position="top-center" transitionDuration={250}>
        <SpotlightProvider
          actions={getActions(navigate, handleLogout, user)}
          searchIcon={<IconSearch size={18} />}
          searchPlaceholder="Search..."
          shortcut="mod + shift + p"
          nothingFoundMessage="Nothing found..."
        >
          <Box
            sx={(theme) => ({
              background: theme.colors.gray[0],
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

const getActions = (
  navigate: NavigateFunction,
  handleLogout: Function,
  user: User | null
): SpotlightAction[] => {
  // user not logged in
  if (!user) {
    return [
      {
        title: "Register",
        description: "Visit the dashboard page",
        onTrigger: () => navigate("/dasboard"),
        icon: <IconDashboard size={18} />,
      },
      {
        title: "Login",
        description: "Visit the dashboard page",
        onTrigger: () => navigate("/login"),
        icon: <IconDashboard size={18} />,
      },
    ]
  }
  // if user is logged in
  return [
    {
      title: "Dashboard",
      description: "Visit the dashboard page",
      onTrigger: () => navigate("/dashboard"),
      icon: <IconDashboard size={18} />,
    },
    {
      title: "Your Profile",
      description: "Visit your profile",
      onTrigger: () => user && navigate(`/@${user.username}`),
      icon: <IconDashboard size={18} />,
    },
    {
      title: "Leaderboard",
      description: "Visit the leaderboard page",
      onTrigger: () => navigate("/leaderboard"),
      icon: <IconChartBar size={18} />,
    },
    {
      title: "Logout",
      description: "Logout from progHours",
      onTrigger: () => handleLogout(),
      icon: <IconLogout size={18} />,
    },
  ]
}

export default App
