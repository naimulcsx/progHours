import { ChevronDownIcon } from "@heroicons/react/solid"
import { FunctionComponent, useState } from "react"
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"

type HeroIconProps = (props: React.ComponentProps<"svg">) => JSX.Element

interface NavLinkProps {
  Icon: HeroIconProps
  _key: string
  items: [string, string][]
}

const NavDropdown: FunctionComponent<NavLinkProps> = ({
  Icon,
  children,
  _key,
  items,
}) => {
  const location = useLocation()
  const [open, setOpen] = useState(
    () => !!Number(localStorage.getItem(_key)) || false
  )
  const toggleDropdown = () => {
    setOpen((prev) => {
      if (!prev) {
        localStorage.setItem(_key, "1")
        return true
      }
      localStorage.setItem(_key, "0")
      return false
    })
  }
  return (
    <li>
      <button
        type="button"
        className="w-full group flex items-center px-3 p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-primary/[0.075] dark:hover:bg-gray-700"
        aria-controls="dropdown"
        data-collapse-toggle="dropdown"
        onClick={toggleDropdown}
      >
        <Icon className="flex-shrink-0 w-6 h-6 transition duration-75 group-hover:text-primary dark:text-gray-400 dark:group-hover:text-white" />
        <span
          className="flex-1 ml-3 text-left whitespace-nowrap group-hover:text-primary"
          sidebar-toggle-item=""
        >
          {children}
        </span>
        <ChevronDownIcon
          className={`w-6 h-6 group-hover:text-primary transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <ul id="dropdown" className="py-2 space-y-2">
          {items.map(([title, href], i) => {
            return (
              <li key={i}>
                <Link to={href}>
                  <span
                    className={`flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-primary/[0.075] dark:text-white dark:hover:bg-gray-700 ${
                      location.pathname.includes(href) ? "text-primary" : ""
                    }`}
                  >
                    {title}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </li>
  )
}

export default NavDropdown
