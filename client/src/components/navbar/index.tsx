import { ActionIcon, Anchor, Box, Button, Group, Header, Text, useMantineColorScheme } from "@mantine/core"
import { Link } from "react-router-dom"
import Logo from "~/components/Logo"
import useUser from "~/hooks/useUser"
import UserMenu from "./UserMenu"
import { IconMoonStars, IconSearch, IconSun } from "@tabler/icons"
import { openSpotlight } from "@mantine/spotlight"

const Navbar = () => {
  const { user } = useUser()
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const dark = colorScheme === "dark"
  return (
    <Header
      height={50}
      px="md"
      sx={(theme) => ({
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      })}
    >
      <Anchor
        component={Link}
        to="/dashboard"
        sx={{
          ":hover": {
            textDecoration: "none",
          },
        }}
      >
        <Logo />
      </Anchor>
      <Group>
        <ActionIcon
          variant="outline"
          color={dark ? "yellow" : "blue"}
          onClick={() => toggleColorScheme()}
          title="Toggle color scheme"
        >
          {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
        </ActionIcon>
        {user ? (
          <Group>
            <Button
              leftIcon={<IconSearch size={14} />}
              variant="outline"
              color="gray"
              onClick={() => openSpotlight()}
              sx={(theme) => ({
                borderColor: theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3],
                [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
                  display: "none",
                },
              })}
            >
              <Text mr="xl">Search...</Text>
              <Text ml="xl">⌘ + ⇧ + P</Text>
            </Button>
            <UserMenu user={user} />
          </Group>
        ) : (
          <Group>
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

export default Navbar
