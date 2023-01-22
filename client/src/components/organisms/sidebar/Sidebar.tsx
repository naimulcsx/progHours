import { Navbar, NavLink, Stack, useMantineTheme } from "@mantine/core"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { SidebarSegmentedControl } from "~/components/molecules"
import { userLinks } from "./userLinks"
import { adminLinks } from "./adminLinks"
import { useNavItemStyles } from "./NavItem.styles"
import useUser from "~/hooks/useUser"

export default function Sidebar() {
  const { user } = useUser()
  const { pathname } = useLocation()
  const { classes } = useNavItemStyles()
  const theme = useMantineTheme()

  // remember previous state
  const [role, setRole] = useState<string>(() => localStorage.getItem("__sc") || "user")
  useEffect(() => {
    localStorage.setItem("__sc", role)
  }, [role])

  return (
    <Navbar
      width={{ base: 0, lg: 230 }}
      p="xs"
      sx={{
        fontWeight: 500,
        background: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      }}
      hidden
      hiddenBreakpoint="lg"
    >
      <Navbar.Section grow mt="xs">
        {/* segmented control */}
        {user?.role === "ADMIN" && <SidebarSegmentedControl role={role} setRole={setRole} />}

        {/* navigation links for users */}
        {role === "user" && (
          <Stack spacing="xs">
            {userLinks.map((link, index) => {
              return (
                <NavLink
                  key={index}
                  component={Link}
                  to={link.to}
                  label={link.label}
                  active={pathname === link.to}
                  icon={<link.Icon />}
                  className={classes.navItem}
                />
              )
            })}
          </Stack>
        )}

        {/* navigation links for admins */}
        {role === "admin" && (
          <Stack spacing="xs">
            {adminLinks.map((link, index) => {
              return (
                <NavLink
                  key={index}
                  component={Link}
                  to={link.to}
                  label={link.label}
                  active={pathname === link.to}
                  icon={<link.Icon />}
                  className={classes.navItem}
                />
              )
            })}
          </Stack>
        )}
      </Navbar.Section>
    </Navbar>
  )
}
