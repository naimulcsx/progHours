import Logo from "./Logo"
import { Link, NavLink } from "react-router-dom"
import Avatar from "react-avatar"
import { AiOutlinePlus } from "react-icons/ai"
import { IoSearchOutline, IoNotifications } from "react-icons/io5"
import { TiArrowSortedDown } from "react-icons/ti"

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-4 bg-white">
      <Link to="/dashboard">
        <Logo />
      </Link>
      <nav>
        <ul className="flex space-x-5 items-center">
          <li className="btn-primary">
            <AiOutlinePlus size={18} />
          </li>
          <li>
            <IoSearchOutline size={24} color="gray" />
          </li>
          <li>
            <IoNotifications size={24} color="gray" />
          </li>
          <li className="flex items-center">
            <NavLink to="/profile">
              <Avatar name="Fahim Shahrier" size={36} color="#5542F6" round />
            </NavLink>
            <TiArrowSortedDown color="gray" size={24} />
          </li>
        </ul>
      </nav>
    </header>
  )
}
export default Navbar
