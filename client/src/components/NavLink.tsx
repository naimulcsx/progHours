import { FunctionComponent } from "react"
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"

type HeroIconProps = (props: React.ComponentProps<"svg">) => JSX.Element

interface NavLinkProps {
  Icon: HeroIconProps
  to: string
}

const NavLink: FunctionComponent<NavLinkProps> = ({ Icon, children, to }) => {
  const location = useLocation()
  return (
    <li>
      <Link
        to={to}
        className={`group flex items-center px-3 p-2 text-base font-normal rounded-lg dark:text-white hover:bg-primary/[0.075] dark:hover:bg-gray-700 ${
          location.pathname.includes(to)
            ? "text-primary bg-primary/[0.075]"
            : "text-gray-600"
        }`}
      >
        {Icon && (
          <Icon className="flex-shrink-0 w-6 h-6 transition duration-75 group-hover:text-primary dark:text-gray-400 dark:group-hover:text-white" />
        )}
        <span className="ml-3 group-hover:text-primary">{children}</span>
      </Link>
    </li>
  )
}

export default NavLink
