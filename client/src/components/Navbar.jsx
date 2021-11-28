import Logo from "./Logo"
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-4 bg-white">
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
