import { useContext } from "react"
import { Link } from "react-router-dom"

/**
 * Import components
 */
import Logo from "./Logo"
import DropdownMenu from "./DropdownMenu"
import { GlobalContext } from "@/GlobalStateProvider"

const Navbar = () => {
  const { user } = useContext(GlobalContext)
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 md:px-6 py-4 bg-white lg:bg-transparent`}
    >
      <Link to="/dashboard">
        <Logo className="text-gray-900" />
      </Link>
      <nav>
        <ul className="flex items-center justify-end space-x-2">
          <li className="flex items-center">
            <Link to="/profile" className="flex items-center space-x-2">
              <img
                src={`https://robohash.org/${user?.name}?bgset=bg2&size=48x48`}
                alt={user?.name}
                className="rounded-full w-7 h-7"
              />
              <span className="hidden font-medium text-gray-900 md:block">
                {user?.name}
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
