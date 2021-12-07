import Navbar from "./Navbar"
import { IoMdPerson, IoMdSettings } from "react-icons/io"
import NavLink from "./NavLink"

const SettingsLayout = ({ children }) => {
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
              <NavLink Icon={IoMdPerson} to="/settings/profile">
                Profile
              </NavLink>
              <NavLink Icon={IoMdSettings} to="/settings/account">
                Account Settings
              </NavLink>
            </ul>
          </nav>
        </div>
        <div className="col-span-5 p-12 bg-white rounded shadow">
          {children}
        </div>
      </div>
    </div>
  )
}

export default SettingsLayout
