import { Navigate } from "react-router-dom"

import Login from "pages/auth/Login"
import Register from "pages/auth/Register"
import DashboardHome from "pages/dashboard/Home"
import { toast } from "react-toastify"
import { useEffect } from "react"
import AccountSettings from "pages/settings/AccountSettings"
import ProfileSettings from "pages/settings/ProfileSettings"
import Profile from "pages/profile"
import TrackingSheet from "pages/dashboard/Tracking"

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
]

export default routes
