import { Navigate } from "react-router-dom"

import Login from "pages/auth/Login"
import Register from "pages/auth/Register"
import DashboardHome from "pages/dashboard/Home"
import { toast } from "react-toastify"
import { useEffect } from "react"
import AccountSettings from "pages/settings/AccountSettings"

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
    path: "/settings",
    element: isLoggedIn ? <AccountSettings /> : <AccessDenied />,
  },
]

export default routes
