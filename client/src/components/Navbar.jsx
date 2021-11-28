import Logo from "./Logo"
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white">
      <Link to="/dashboard">
        <Logo />
      </Link>
      <nav>
        <ul className="flex space-x-4">
          <li>Add</li>
          <li>Notificiation</li>
          <li>Profile</li>
        </ul>
      </nav>
    </header>
  )
}
export default Navbar
