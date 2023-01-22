import type { ReactNode } from "react"
import { Navigate, RouteObject } from "react-router-dom"

// page components
import {
  ActivitiesPage,
  DashboardPage,
  GroupsPage,
  GroupDetailsPage,
  LeaderboardPage,
  SettingsPage,
  StudyListPage,
  SubmissionsPage,
  NotFoundPage,
  LoginPage,
  RegisterPage,
  UserManagementPage,
  GroupManagementPage,
  ParsersStatusPage,
  UserProfilePage,
} from "~/components/pages"

// utility for defining routes
const defineRoute = (path: string, element: ReactNode) => ({ path, element })

const getRoutes = (isLoggedIn: boolean, role: string): RouteObject[] => [
  defineRoute("/", isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/leaderboard" />),
  defineRoute("/login", isLoggedIn ? <Navigate to="/" /> : <LoginPage />),
  defineRoute("/register", isLoggedIn ? <Navigate to="/dashboard" /> : <RegisterPage />),
  defineRoute("/dashboard", isLoggedIn ? <DashboardPage /> : <Navigate to="/login" />),
  defineRoute("/submissions", isLoggedIn ? <SubmissionsPage /> : <Navigate to="/login" />),
  defineRoute("/study", isLoggedIn ? <StudyListPage /> : <Navigate to="/login" />),
  defineRoute("/settings", isLoggedIn ? <SettingsPage /> : <Navigate to="/login" />),
  defineRoute("/:username", <UserProfilePage />),
  defineRoute("/leaderboard", <LeaderboardPage />),
  defineRoute("/groups", isLoggedIn ? <GroupsPage /> : <Navigate to="/login" />),
  defineRoute("/activities", isLoggedIn ? <ActivitiesPage /> : <Navigate to="/login" />),
  defineRoute("/groups/:slug", isLoggedIn ? <GroupDetailsPage /> : <Navigate to="/login" />),
  // admin routes
  defineRoute(
    "/admin/users",
    isLoggedIn && role === "ADMIN" ? <UserManagementPage /> : <Navigate to="/login" />
  ),
  defineRoute(
    "/admin/groups",
    isLoggedIn && role === "ADMIN" ? <GroupManagementPage /> : <Navigate to="/login" />
  ),
  defineRoute(
    "/admin/parsers-status",
    isLoggedIn && role === "ADMIN" ? <ParsersStatusPage /> : <Navigate to="/login" />
  ),
  // 404 routes
  defineRoute("*", <NotFoundPage />),
]

export default getRoutes
