import { Navigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useEffect } from "react"
import Login from "@/pages/auth/Login"
import Register from "@/pages/auth/Register"
import DashboardHome from "@/pages/dashboard/Home"
import AccountSettings from "@/pages/settings/AccountSettings"
import ProfileSettings from "@/pages/settings/ProfileSettings"
import Profile from "@/pages/profile"
import TrackingSheet from "@/pages/dashboard/Tracking"
import TrackingEntry from "@/pages/dashboard/TrackingEntry"
import LeaderboardPage from "./pages/leaderboard"

const AccessDenied = () => {
  useEffect(() => {
    toast.error("Access denied", {
      className: "toast",
    })
  }, [])
  return <Navigate to="/login" />
}

const routes = (isLoggedIn) => [
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
    element: isLoggedIn ? <DashboardHome /> : <AccessDenied />,
  },
  {
    path: "/submissions",
    element: isLoggedIn ? <TrackingSheet /> : <AccessDenied />,
  },
  // {
  //   path: "/submissions/new",
  //   element: isLoggedIn ? <TrackingEntry /> : <AccessDenied />,
  // },
  {
    path: "/settings",
    element: isLoggedIn ? (
      <Navigate to="/settings/profile" />
    ) : (
      <AccessDenied />
    ),
  },
  {
    path: "/settings/profile",
    element: <ProfileSettings />,
  },
  {
    path: "/settings/account",
    element: <AccountSettings />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/leaderboard",
    element: <LeaderboardPage />,
  },
]

export default routes
