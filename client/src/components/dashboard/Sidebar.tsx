import NavLink from "@/components/NavLink"
import useLogout from "@/hooks/useLogout"

import {
  DashboardIcon,
  LeaderboardIcon,
  TrackingIcon,
  SettingsIcon,
} from "@/components/Icons"
import { useContext } from "react"
import { GlobalContext } from "@/GlobalStateProvider"
import Logo from "../Logo"

import {
  ClipboardListIcon,
  ViewGridIcon,
  ChartBarIcon,
  CogIcon,
  LogoutIcon,
} from "@heroicons/react/outline"
import { Link } from "react-router-dom"

const Sidebar = () => {
  const { user } = useContext(GlobalContext)
  const handleLogout = useLogout()
  return (
    <div className="hidden max-w-[250px] w-full flex-shrink-0 h-[100vh] py-6  z-50 top-0 left-0 bottom-0 bg-white xl:block">
      {/* sidebar links */}
      <div className="flex flex-col justify-between h-full px-6">
        <div className="">
          <div className="mb-12">
            <Link to="/dashboard">
              <Logo className="text-dark" />
            </Link>
          </div>
          <nav>
            <ul className="space-y-1">
              <NavLink Icon={ViewGridIcon} to="/dashboard">
                Dashboard
              </NavLink>
              <NavLink Icon={ClipboardListIcon} to="/submissions">
                Tracking Sheet
              </NavLink>
              <NavLink Icon={ChartBarIcon} to="/leaderboard">
                Leaderboard
              </NavLink>
              <NavLink Icon={CogIcon} to="/settings">
                Settings
              </NavLink>
            </ul>
          </nav>
        </div>
        <div className="flex items-start space-x-4">
          <img
            src={`https://robohash.org/${user.name}?bgset=bg2&size=40x40`}
            alt={user.name}
            className="rounded-lg"
          />
          <div className="relative bottom-1">
            <h6 className="text-lg font-medium">{user.name}</h6>
            <button
              className="flex items-center space-x-1 text-sm text-red-500"
              onClick={handleLogout}
            >
              <LogoutIcon className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
