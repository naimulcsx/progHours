import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"

const MobileNavLink = ({ Icon, children, to }) => {
  const location = useLocation()
  return (
    <li>
      <Link
        to={to}
        className={`flex justify-center items-center nav-item ${
          location.pathname.includes(to) ? "active" : ""
        }`}
      >
        <Icon />
      </Link>
    </li>
  )
}

export default MobileNavLink
