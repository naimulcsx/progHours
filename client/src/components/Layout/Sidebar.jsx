import { Person, Settings } from "../base/Icon"
import { NavLink } from "react-router-dom"

const sidebarList = [
  {
    icon: <Person width={32} height={32} />,
    text: "Edit Profile",
    link: "/settings/edit-profile",
  },
  {
    icon: <Settings width={32} height={32} />,
    text: "Account Settings",
    link: "/settings/account",
  },
]

export default function Sidebar() {
  return (
    <div className="">
      <h3 className="text-mainDark">Settings</h3>
      <p className="p2">Update and manage your account</p>

      <div className="mt-8">
        {sidebarList.map((side) => (
          <NavLink
            to={side.link}
            className={`cursor-pointer flex items-center space-x-5 p-5 rounded-md`}
          >
            <p className="">{side.icon}</p>
            <p className="p3">{side.text}</p>
          </NavLink>
        ))}
      </div>
    </div>
  )
}
