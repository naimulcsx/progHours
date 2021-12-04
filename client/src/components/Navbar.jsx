import Logo from "./Logo"
import { Link, NavLink } from "react-router-dom"
import Avatar from "react-avatar"
import DropdownMenu from "./DropdownMenu"

const Navbar = () => {
  const name = localStorage.getItem("name")
  return (
    <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-4 bg-white">
      <Link to="/dashboard">
        <Logo />
      </Link>
      <nav>
        <ul className="flex items-center space-x-5">
          {/* <li className="btn-primary">
            <AiOutlinePlus size={18} />
          </li>
          <li>
            <IoSearchOutline size={24} color="gray" />
          </li>
          <li>
            <IoNotifications size={24} color="gray" />
          </li> */}
          <li className="flex items-center">
            <NavLink to="/profile">
              <Avatar name={name} size={36} color="#5542F6" round />
            </NavLink>
            <DropdownMenu></DropdownMenu>
          </li>
        </ul>
      </nav>
    </header>
  )
}
export default Navbar
