import { IconDotsVertical } from "@tabler/icons"
import { Group, NavLink, Menu } from "@mantine/core"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useMobileNavStyles } from "./MobileNav.styles"
import { navLinks } from "./navLinks"
import { menuLinks } from "./menuLinks"

export default function MobileNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { classes } = useMobileNavStyles()
  return (
    <Group py="6px" className={classes.wrapper}>
      {navLinks.map((navItem, index) => {
        return (
          <NavLink
            key={index}
            className={classes.navLink}
            component={Link}
            to={navItem.to}
            icon={<navItem.Icon />}
            active={pathname === navItem.to}
            p="xs"
          />
        )
      })}
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <NavLink
            icon={<IconDotsVertical style={{ marginLeft: 12 }} size={24} stroke={1.5} />}
            className={classes.navLink}
          />
        </Menu.Target>
        <Menu.Dropdown sx={{ zIndex: 100 }}>
          {menuLinks.map((linkItem, index) => (
            <Menu.Item key={index} icon={<linkItem.Icon />} onClick={() => navigate(linkItem.to)}>
              {linkItem.label}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </Group>
  )
}
