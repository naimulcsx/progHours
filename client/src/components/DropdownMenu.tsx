// import { Menu, Transition } from "@headlessui/react"
import { Link, useNavigate, useRoutes } from "react-router-dom"
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react"

/**
 * Import hooks
 */
import useLogout from "@/hooks/useLogout"

/**
 * Import icons
 */
import {
  CogIcon,
  UserIcon,
  LogoutIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/outline"
import { useContext } from "react"
import { GlobalContext } from "@/GlobalStateProvider"

function DropdownMenu() {
  const handleLogout = useLogout()
  const navigate = useNavigate()
  const { user } = useContext(GlobalContext)
  return (
    <Menu>
      <MenuButton>
        <ChevronDownIcon width={20} />
      </MenuButton>
      <MenuList position="relative" top={2} shadow="base">
        <MenuItem
          icon={<UserIcon width={16} />}
          onClick={() => navigate(`/users/${user?.username}`)}
        >
          Profile
        </MenuItem>
        <MenuItem
          icon={<CogIcon width={16} />}
          onClick={() => navigate("/settings")}
        >
          Settings
        </MenuItem>
        <MenuItem icon={<LogoutIcon width={16} />} onClick={handleLogout}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default DropdownMenu
