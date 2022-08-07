import { useEffect } from "react"
import { Navigate, RouteObject } from "react-router-dom"

/**
 * Auth pages
 */
import Login from "@/pages/auth/Login"
import Register from "@/pages/auth/Register"

/**
 * Dashboard pages
 */
import DashboardHome from "@/pages/dashboard/Home"
import TrackingSheet from "@/pages/dashboard/Tracking"
import LeaderboardPage from "@/pages/Leaderboard"

/**
 * Profile page
 */
import Profile from "@/pages/profile"

/**
 * Settings page
 */
import Settings from "@/pages/Settings"
import StudyPage from "@/pages/Study"
import PublicLeaderboard from "@/pages/PublicLeaderboard"
import GroupsPage from "./pages/groups/Groups"
import GroupPage from "./pages/groups/Single"

const routes = (isLoggedIn: boolean): RouteObject[] => [
  {
    path: "/",
    element: isLoggedIn ? (
      <Navigate to="/dashboard" />
    ) : (
      <Navigate to="/leaderboard" />
    ),
  },
  {
    path: "/login",
    element: isLoggedIn ? <Navigate to="/dashboard" /> : <Login />,
  },
  {
    path: "/register",
    element: isLoggedIn ? <Navigate to="/dashboard" /> : <Register />,
  },
  {
    path: "/dashboard",
    element: isLoggedIn ? <DashboardHome /> : <Navigate to="/login" />,
  },
  {
    path: "/submissions",
    element: isLoggedIn ? <TrackingSheet /> : <Navigate to="/login" />,
  },
  {
    path: "/study",
    element: isLoggedIn ? <StudyPage /> : <Navigate to="/login" />,
  },
  {
    path: "/settings",
    element: isLoggedIn ? <Settings /> : <Navigate to="/login" />,
  },
  {
    path: "/users/:username",
    element: <Profile />,
  },
  {
    path: "/leaderboard",
    element: isLoggedIn ? <LeaderboardPage /> : <PublicLeaderboard />,
  },
  {
    path: "/groups",
    element: isLoggedIn ? <GroupsPage /> : <Navigate to="/login" />,
  },
  {
    path: "/groups/:hashtag",
    element: isLoggedIn ? <GroupPage /> : <Navigate to="/login" />,
  },
]

export default routes
