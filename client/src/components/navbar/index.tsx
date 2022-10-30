import { Anchor, Box, Button, Group, Header, Text } from "@mantine/core"
import { Link } from "react-router-dom"
import Logo from "@/components/Logo"
import useUser from "@/hooks/useUser"
import UserMenu from "./UserMenu"
import { IconSearch } from "@tabler/icons"
import { openSpotlight } from "@mantine/spotlight"

const Navbar = () => {
  const { user } = useUser()
  return (
    <Header
      height={50}
      px="lg"
      sx={(theme) => ({
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
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
      <Box>
        {user ? (
          <Group>
            <Button
              leftIcon={<IconSearch size={14} />}
              variant="outline"
              color="gray"
              onClick={() => openSpotlight()}
              sx={(theme) => ({
                borderColor: theme.colors.gray[2],
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
      </Box>
    </Header>
  )
}

export default Navbar
