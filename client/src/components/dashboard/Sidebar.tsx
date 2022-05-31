import { useContext } from "react"
import { Link } from "react-router-dom"
/**
 * Import Components
 */
import NavLink from "@/components/NavLink"
import Logo from "@/components/Logo"
import { GlobalContext } from "@/GlobalStateProvider"
import Avatar from "@/components/Avatar"

/**
 * Import helpers
 */
import useLogout from "@/hooks/useLogout"

/**
 * Import icons
 */
import {
  ClipboardListIcon,
  ViewGridIcon,
  ChartBarIcon,
  CogIcon,
  LogoutIcon,
  DocumentTextIcon,
} from "@heroicons/react/solid"
import NavDropdown from "../NavDropdown"
import Spinner from "../Spinner"

const Sidebar = () => {
  /**
   * Get user information from global state
   */
  const globalContext = useContext(GlobalContext)
  const user = globalContext.user
  const handleLogout = useLogout()
  return (
    <aside className="w-64 shrink-0" aria-label="Sidebar">
      <div className="flex flex-col justify-between min-h-screen px-4 pt-24 pb-4 overflow-y-auto bg-white border-r border-gray-200 rounded dark:bg-gray-800">
        <ul className="space-y-2">
          <NavLink Icon={ViewGridIcon} to="/dashboard">
            Dashboard
          </NavLink>
          <NavDropdown
            Icon={ClipboardListIcon}
            _key="__xd4nbc"
            items={[
              ["Submissions", "/submissions"],
              ["Study List", "/study"],
            ]}
          >
            Practice
          </NavDropdown>
          <NavLink Icon={DocumentTextIcon} to="/resources">
            Resources
          </NavLink>
          <NavLink Icon={ChartBarIcon} to="/leaderboard">
            Leaderboard
          </NavLink>
          <NavLink Icon={CogIcon} to="/settings">
            Settings
          </NavLink>
        </ul>
        {user ? (
          <div className="flex items-start px-2 space-x-4">
            <Avatar name={user.name} />
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
        ) : (
          <Spinner />
        )}
      </div>
    </aside>
  )
}

export default Sidebar
