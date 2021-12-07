import Logo from "./Logo"
import { Link } from "react-router-dom"
import Avatar from "react-avatar"
import DropdownMenu from "./DropdownMenu"

const Navbar = () => {
  const name = localStorage.getItem("name")
  return (
    <header className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-4">
      <Link to="/dashboard">
        <Logo />
      </Link>
      <nav>
        <ul className="flex items-center space-x-5">
          <li className="flex items-center">
            <Link to="/profile">
              <Avatar name={name} size={36} color="#5542F6" round />
            </Link>
            <DropdownMenu></DropdownMenu>
          </li>
        </ul>
      </nav>
    </header>
  )
}
export default Navbar
