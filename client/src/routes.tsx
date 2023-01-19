import type { ReactNode } from "react"
import { Navigate, RouteObject } from "react-router-dom"

// page components
import Login from "~/pages/auth/Login"
import Register from "~/pages/auth/Register"
import DashboardPage from "~/pages/dashboard"
import SubmissionsPage from "~/pages/submissions"
import LeaderboardPage from "~/pages/Leaderboard"
import Profile from "~/pages/profile"
import Settings from "~/pages/Settings"
import GroupsPage from "~/pages/groups"
import GroupPage from "~/pages/groups/$slug"
import ActivitiesPage from "~/pages/Activities"
import UserManagement from "~/pages/admin/userManagement"
import NotFoundPage from "~/pages/404"
import StudyPage from "./pages/studylist"
import ParsersStatus from "./pages/admin/parsersStatus"
import GroupManagement from "./pages/admin/groupManagement"

// utility for defining routes
const defineRoute = (path: string, element: ReactNode) => ({ path, element })

const getRoutes = (isLoggedIn: boolean, role: string): RouteObject[] => [
  defineRoute("/", isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/leaderboard" />),
  defineRoute("/login", isLoggedIn ? <Navigate to="/" /> : <Login />),
  defineRoute("/register", isLoggedIn ? <Navigate to="/dashboard" /> : <Register />),
  defineRoute("/dashboard", isLoggedIn ? <DashboardPage /> : <Navigate to="/login" />),
  defineRoute("/submissions", isLoggedIn ? <SubmissionsPage /> : <Navigate to="/login" />),
  defineRoute("/study", isLoggedIn ? <StudyPage /> : <Navigate to="/login" />),
  defineRoute("/settings", isLoggedIn ? <Settings /> : <Navigate to="/login" />),
  defineRoute(
    "/admin/parsers-healthcheck",
    isLoggedIn && role === "ADMIN" ? <ParsersStatus /> : <Navigate to="/login" />
  ),
  defineRoute("/:username", <Profile />),
  defineRoute("/leaderboard", <LeaderboardPage />),
  defineRoute("/groups", isLoggedIn ? <GroupsPage /> : <Navigate to="/login" />),
  defineRoute("/activities", isLoggedIn ? <ActivitiesPage /> : <Navigate to="/login" />),
  defineRoute("/groups/:slug", isLoggedIn ? <GroupPage /> : <Navigate to="/login" />),
  defineRoute("/admin/users", isLoggedIn && role === "ADMIN" ? <UserManagement /> : <Navigate to="/login" />),
  defineRoute("/admin/groups", isLoggedIn && role === "ADMIN" ? <GroupManagement /> : <Navigate to="/login" />),
  defineRoute("*", <NotFoundPage />),
]

export default getRoutes
