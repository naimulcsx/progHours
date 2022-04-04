import { Menu, Transition } from "@headlessui/react"
import { Link } from "react-router-dom"

/**
 * Import hooks
 */
import useLogout from "@/hooks/useLogout"

/**
 * Import icons
 */
import {
  CogIcon,
  UserIcon,
  LogoutIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/outline"

function DropdownMenu() {
  const handleClick = useLogout()
  return (
    <Menu>
      {({ open }) => (
        <>
          <Menu.Button>
            {!open ? (
              <ChevronDownIcon className="text-gray-900 w-4" />
            ) : (
              <ChevronUpIcon className="text-gray-900 w-4" />
            )}
          </Menu.Button>
          <Transition
            show={open}
            className="relative"
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 w-56 p-2 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-lg shadow-lg top-6 ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    className={`${
                      active
                        ? "bg-primary bg-opacity-10 text-primary"
                        : "text-gray-900"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm font-medium`}
                    to="/profile"
                  >
                    <UserIcon className="w-4 mr-2" />
                    Profile
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    className={`${
                      active
                        ? "bg-primary bg-opacity-10 text-primary"
                        : "text-gray-900"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm font-medium`}
                    to="/settings"
                  >
                    <CogIcon className="w-4 mr-2" />
                    Settings
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active
                        ? "bg-primary bg-opacity-10 text-primary"
                        : "text-gray-900"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm font-medium`}
                    onClick={handleClick}
                  >
                    <LogoutIcon className="w-4 mr-2" />
                    Logout
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}

export default DropdownMenu
