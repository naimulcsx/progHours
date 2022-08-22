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
import ActivitiesPage from "./pages/Activities"
import UserManagement from "./pages/admin/userManagement"
import ProblemManagement from "./pages/admin/problemManagement"
import EditProblemTable from "./components/admin/problems/EditProblemTable"

const routes = (isLoggedIn: boolean, role: string): RouteObject[] => [
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
    path: "/admin/users",
    element:
      isLoggedIn && role === "ADMIN" ? (
        <UserManagement />
      ) : (
        <Navigate to="/login" />
      ),
  },
  {
    path: "/admin/problems",
    element:
      isLoggedIn && role === "ADMIN" ? (
        <ProblemManagement />
      ) : (
        <Navigate to="/login" />
      ),
  },
  {
    path: "/admin/problems/:pid",
    element:
      isLoggedIn && role === "ADMIN" ? (
        <EditProblemTable />
      ) : (
        <Navigate to="/login" />
      ),
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
    path: "/activities",
    element: isLoggedIn ? <ActivitiesPage /> : <Navigate to="/login" />,
  },
  {
    path: "/groups/:hashtag",
    element: isLoggedIn ? <GroupPage /> : <Navigate to="/login" />,
  },
]

export default routes
