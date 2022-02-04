import NavLink from "./NavLink"
import Navbar from "./Navbar"
import useLogout from "@/hooks/useLogout"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import axios from "axios"

import {
  DashboardIcon,
  LeaderboardIcon,
  TrackingIcon,
  SettingsIcon,
  LogoutIcon,
} from "./Icons"

import clearAuthData from "@/utils/clearAuthData"

const DashboardSidebar = () => {
  const navigate = useNavigate()
  const user = localStorage.getItem("name")

  useEffect(() => {
    async function checkUser() {
      try {
        await axios.get("/api/auth/user")
      } catch (error) {
        await clearAuthData()
        navigate("/login")
        toast.error("Access denied", { className: "toast" })
      }
    }
    checkUser()
  }, [])

  const handleLogout = useLogout()
  return (
    <div className="max-w-[250px] w-full h-[100vh] py-6 fixed z-50 top-0 left-0 bottom-0 bg-white">
      {/* sidebar links */}
      <div className="flex flex-col justify-between h-full px-4 pt-16">
        <nav>
          <ul className="space-y-1">
            <NavLink Icon={DashboardIcon} to="/dashboard">
              Dashboard
            </NavLink>
            <NavLink Icon={TrackingIcon} to="/submissions">
              Tracking Sheet
            </NavLink>
            <NavLink Icon={LeaderboardIcon} to="/leaderboard">
              Leaderboard
            </NavLink>
            <NavLink Icon={SettingsIcon} to="/settings">
              Settings
            </NavLink>
          </ul>
        </nav>
        <div className="">
          <div className="flex items-start space-x-4">
            <img
              src={`https://robohash.org/${user}?bgset=bg2&size=48x48`}
              alt={user}
              className="rounded-lg"
            />
            <div>
              <h6 className="text-lg font-medium">{user}</h6>
              <button
                className="flex items-center mt-0.5 space-x-1 text-sm text-red-500"
                onClick={handleLogout}
              >
                <LogoutIcon size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Dashboardlayout = ({ children }) => {
  return (
    <div className="min-h-screen">
      {/* topbar */}
      <Navbar />
      <DashboardSidebar />
      {/* dashboard contents */}
      <div className="ml-[250px] bg-light min-h-screen px-8 pt-20">
        {children}
      </div>
    </div>
  )
}

export default Dashboardlayout
