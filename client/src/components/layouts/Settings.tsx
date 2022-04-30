/**
 * Import Components
 */
import Navbar from "@/components/Navbar"
import NavLink from "@/components/NavLink"

/**
 * Import Icons
 */
import { CogIcon, UserIcon } from "@heroicons/react/outline"

export const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-light">
      <Navbar />
      <div className="grid items-start max-w-6xl grid-cols-7 gap-20 px-4 pt-40 pb-24 mx-auto">
        {/* sidebar */}
        <div className="col-span-2">
          <h2>Settings</h2>
          <p className="mt-2 text-gray-500">Update and manage your account</p>
          <nav className="mt-8">
            <ul className="space-y-2">
              <NavLink Icon={CogIcon} to="/settings/account">
                Account Settings
              </NavLink>
              <NavLink Icon={UserIcon} to="/settings/handles">
                Online Judge Handles
              </NavLink>
            </ul>
          </nav>
        </div>
        <div className="col-span-5 p-12 bg-white rounded-lg shadow">
          {children}
        </div>
      </div>
    </div>
  )
}
