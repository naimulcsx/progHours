import {
  ActionIcon,
  Anchor,
  Box,
  Button,
  Group,
  Header,
  Text,
  useMantineColorScheme,
} from "@mantine/core"
import { IconMoonStars, IconSun } from "@tabler/icons"
import { AppLogo } from "~/components/atoms"
import { Link } from "react-router-dom"
import { NavbarUserMenu, SpotlightButton } from "~/components/molecules"
import { useNavbarStyles } from "./Navbar.styles"
import useUser from "~/hooks/useUser"

export default function Navbar() {
  const { user } = useUser()
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const { classes } = useNavbarStyles()
  return (
    <Header height={50} px="md" className={classes.wrapper}>
      <Anchor
        component={Link}
        to="/dashboard"
        sx={{
          ":hover": {
            textDecoration: "none",
          },
        }}
      >
        <AppLogo />
      </Anchor>
      <Group spacing={0}>
        {/* color scheme toggler */}
        <ActionIcon
          variant="outline"
          color={colorScheme === "dark" ? "yellow" : "blue"}
          onClick={() => toggleColorScheme()}
          title="Toggle color scheme"
          mr="lg"
        >
          {colorScheme === "dark" ? <IconSun size={18} /> : <IconMoonStars size={18} />}
        </ActionIcon>
        {/* spotlight button */}
        <Group spacing={0}>
          <Box mr={user ? "xs" : "lg"}>
            <SpotlightButton />
          </Box>
          {user && <NavbarUserMenu user={user} />}
        </Group>
        {/* login and register buttons for non loggedin users */}
        {!user && (
          <Group spacing="xs">
            <Anchor component={Link} to="/login">
              Login
            </Anchor>
            <Anchor component={Link} to="/register">
              Register
            </Anchor>
          </Group>
        )}
      </Group>
    </Header>
  )
}
