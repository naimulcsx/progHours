import {
  IconChartBar,
  IconDashboard,
  IconLayout2,
  IconLogin,
  IconLogout,
  IconSearch,
  IconUser,
  IconUserPlus,
} from "@tabler/icons"
import { SpotlightAction } from "@mantine/spotlight"
import { NavigateFunction } from "react-router-dom"
import type { User } from "~/contexts/UserContext"

export default function getSpotlightActions(
  navigate: NavigateFunction,
  handleLogout: Function,
  user: User | null
): SpotlightAction[] {
  // not logged in
  if (!user) {
    return [
      {
        title: "Login",
        description: "Visit the dashboard page",
        onTrigger: () => navigate("/login"),
        icon: <IconLogin size={18} />,
      },
      {
        title: "Register",
        description: "Visit the dashboard page",
        onTrigger: () => navigate("/register"),
        icon: <IconUserPlus size={18} />,
      },
      {
        title: "Leaderboard",
        description: "Visit the leaderboard page",
        onTrigger: () => navigate("/leaderboard"),
        icon: <IconChartBar size={18} />,
      },
    ]
  }
  // logged in
  return [
    {
      title: "Dashboard",
      description: "Visit the dashboard page",
      onTrigger: () => navigate("/dashboard"),
      icon: <IconLayout2 size={18} />,
    },
    {
      title: "Your Profile",
      description: "Visit your profile",
      onTrigger: () => user && navigate(`/${user.username}`),
      icon: <IconUser size={18} />,
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
