import NavLink from "@/components/NavLink"
import {
  DashboardIcon,
  LeaderboardIcon,
  TrackingIcon,
  SettingsIcon,
} from "@/components/Icons"

export default function MobileNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-60 bg-white py-2 md:hidden px-5">
      <nav>
        <ul className="grid grid-cols-4 gap-4">
          <NavLink Icon={DashboardIcon} to="/dashboard" />
          <NavLink Icon={TrackingIcon} to="/submissions" />
          <NavLink Icon={LeaderboardIcon} to="/leaderboard" />
          <NavLink Icon={SettingsIcon} to="/settings" />
        </ul>
      </nav>
    </div>
  )
}
