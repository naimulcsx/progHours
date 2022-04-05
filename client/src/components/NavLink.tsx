import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"

interface NavLinkProps {
  Icon: React.FC
  children: React.ReactNode
  to: string
}

const NavLink = ({ Icon, children, to }: NavLinkProps) => {
  const location = useLocation()
  return (
    <li>
      <Link
        to={to}
        className={`nav-item ${location.pathname.includes(to) ? "active" : ""}`}
      >
        <Icon />
        <span>{children}</span>
      </Link>
    </li>
  )
}

export default NavLink
