import { IoMdStats, IoMdSettings } from "react-icons/io"
import Navbar from "./Navbar"
import NavLink from "./NavLink"

import { MdLeaderboard, MdOutlineListAlt } from "react-icons/md"
import { ImStatsDots } from "react-icons/im"
import Logo from "./Logo"

const DashboardSidebar = () => {
  return (
    <div className="max-w-[280px] w-full h-[100vh] px-6 py-4 fixed z-20 top-0 left-0 bottom-0 bg-white">
      {/* logo   */}
      <Logo />

      {/* sidebar links */}
      <div className="pt-16">
        <nav>
          <ul className="space-y-1">
            <NavLink Icon={ImStatsDots} to="/dashboard/home">
              Dashboard
            </NavLink>
            <NavLink Icon={MdOutlineListAlt} to="/dashboard/tracking">
              Tracking Sheet
            </NavLink>
            <NavLink Icon={MdLeaderboard} to="/leaderboard">
              Leaderboard
            </NavLink>
            <NavLink Icon={IoMdSettings} to="/settings">
              Settings
            </NavLink>
          </ul>
        </nav>
      </div>
    </div>
  )
}

const Dashboardlayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-light">
      <DashboardSidebar />
      <div className="ml-[280px] px-6">{children}</div>
    </div>
  )
}

export default Dashboardlayout
