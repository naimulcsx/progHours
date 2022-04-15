import { useContext } from "react"
import { Link } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import * as Avatar from "@radix-ui/react-avatar"

/**
 * Import components
 */
import Logo from "./Logo"
import DropdownMenu from "./DropdownMenu"
import { GlobalContext } from "@/GlobalStateProvider"

const Navbar = ({ className }: { className?: string }) => {
  const { user } = useContext(GlobalContext)
  return (
    <header
      className={twMerge(
        "fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-5 md:px-6 py-3 bg-white lg:bg-transparent",
        className
      )}
    >
      <Link to="/dashboard">
        <Logo className="text-gray-900" />
      </Link>
      <nav>
        <ul className="flex items-center justify-end space-x-2">
          <li className="flex items-center">
            <Link
              to={`/users/${user?.username}`}
              className="flex items-center space-x-2"
            >
              {/* <img
                src={`https://robohash.org/${user?.name}?bgset=bg2&size=48x48`}
                alt={user?.name}
                className="rounded-full w-7 h-7"
              /> */}
              {/* <Avatar color="red" name="Wim Mostmans" /> */}
              {/* <Avatar name="Foo Bar" /> */}
              <Avatar.Root>
                <Avatar.Image
                  src={`https://robohash.org/${user?.name}?bgset=bg2&size=28x28`}
                  className="rounded-full"
                />
              </Avatar.Root>
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
