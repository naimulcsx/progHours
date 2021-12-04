import { useState } from "react"
import { BiChevronDown, BiChevronUp } from "react-icons/bi"

const DropdownMenu = () => {
  let [active, setActive] = useState(false)
  return (
    <div className="relative flex items-center">
      <button onClick={() => setActive(!active)}>
        {active ? (
          <BiChevronUp color="gray" size={24} />
        ) : (
          <BiChevronDown color="gray" size={24} />
        )}
      </button>
      {active && (
        <div className="absolute right-0 z-50 bg-white border border-gray-200 rounded-lg shadow-lg top-10">
          <ul className="text-gray-600 divide-y divide-gray-200">
            <li className="px-6 py-3">Profile</li>
            <li className="px-6 py-3">Settings</li>
            <li className="px-6 py-3">Logout</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default DropdownMenu
