import NavLink from "@/components/NavLink"
import {
  DashboardIcon,
  LeaderboardIcon,
  TrackingIcon,
  SettingsIcon,
} from "@/components/Icons"

export default function MobileNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-60 bg-white py-2 md:hidden ">
      <nav>
        <ul className="flex justify-between px-4">
          <NavLink Icon={DashboardIcon} to="/dashboard"></NavLink>
          <NavLink Icon={TrackingIcon} to="/submissions"></NavLink>
          <NavLink Icon={LeaderboardIcon} to="/leaderboard"></NavLink>
          <NavLink Icon={SettingsIcon} to="/settings"></NavLink>
        </ul>
      </nav>
    </div>
  )
}
