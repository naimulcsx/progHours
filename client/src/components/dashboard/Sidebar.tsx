import NavLink from "@/components/NavLink"
import useLogout from "@/hooks/useLogout"

import {
  DashboardIcon,
  LeaderboardIcon,
  TrackingIcon,
  SettingsIcon,
  LogoutIcon,
} from "@/components/Icons"

const Sidebar = () => {
  const user = localStorage.getItem("name")
  const handleLogout = useLogout()
  return (
    <div className="hidden max-w-[250px] w-full flex-shrink-0 h-[100vh] py-6  z-20 top-0 left-0 bottom-0 bg-white md:block">
      {/* sidebar links */}
      <div className="flex flex-col justify-between h-full px-4">
        <div className="mt-16">
          {/* <div className="px-4 mb-12">
            <Link to="/dashboard">
              <Logo className="text-dark" />
            </Link>
          </div> */}
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
        </div>
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
  )
}

export default Sidebar
