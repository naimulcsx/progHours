import Logo from "./Logo"
import { Link } from "react-router-dom"
import DropdownMenu from "./DropdownMenu"

const Navbar = ({ bgWhite }) => {
  const name = localStorage.getItem("name")
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-3 ${
        bgWhite ? "bg-white" : "bg-white"
      }`}
    >
      <Link to="/dashboard">
        <Logo className="text-gray-900" />
      </Link>
      <nav>
        <ul className="flex items-center justify-end space-x-2">
          <li className="flex items-center">
            <Link to="/profile" className="flex items-center space-x-2">
              <img
                src={`https://robohash.org/${name}?bgset=bg2&size=48x48`}
                alt={name}
                className="rounded-full w-7 h-7"
              />
              <span className="font-medium text-gray-900 ">{name}</span>
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
