import React from "react"
import MobileNavLink from "@/components/MobileNavLink"
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
        <ul className="flex justify-between">
          <MobileNavLink Icon={DashboardIcon} to="/dashboard"></MobileNavLink>
          <MobileNavLink Icon={TrackingIcon} to="/submissions"></MobileNavLink>
          <MobileNavLink
            Icon={LeaderboardIcon}
            to="/leaderboard"
          ></MobileNavLink>
          <MobileNavLink Icon={SettingsIcon} to="/settings"></MobileNavLink>
        </ul>
      </nav>
    </div>
  )
}
