import { useContext } from "react"
import { Link } from "react-router-dom"
import { twMerge } from "tailwind-merge"

/**
 * Import components
 */
import Logo from "./Logo"
import DropdownMenu from "./DropdownMenu"
import { GlobalContext } from "@/GlobalStateProvider"
import Avatar from "./Avatar"
import { MenuAlt1Icon } from "@heroicons/react/solid"

const Navbar = ({ className }: { className?: string }) => {
  const globalContext = useContext(GlobalContext)
  const user = globalContext.user!
  return (
    <header
      className={twMerge(
        "fixed h-14 bg-white border-b top-0 left-0 right-0 z-[1] flex items-center justify-between px-5 md:px-6 py-3",
        className
      )}
    >
      <div className="flex items-center space-x-6">
        <MenuAlt1Icon className="w-6 h-6" />
        <Link to="/dashboard">
          <Logo className="text-gray-900" />
        </Link>
      </div>
      <nav>
        <ul className="flex items-center justify-end space-x-2">
          <li className="flex items-center">
            <Link
              to={`/users/${user.username}`}
              className="flex items-center space-x-2"
            >
              <Avatar name={user.name} size="sm" />
              <span className="hidden font-medium text-gray-900 md:block">
                {user.name}
              </span>
            </Link>
          </li>
          <li className="flex items-center">
            <DropdownMenu />
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
