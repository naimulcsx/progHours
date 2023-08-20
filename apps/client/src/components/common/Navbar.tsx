import {
  Anchor,
  Button,
  Container,
  Flex,
  Group,
  Header,
  Menu,
  Switch,
  useMantineColorScheme,
  useMantineTheme
} from "@mantine/core";
import {
  IconChevronDown,
  IconMoonStars,
  IconSun,
  IconUser
} from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { AppLogo } from "~/assets/AppLogo";
import { useUser } from "~/hooks/useUser";
import { Avatar } from "./Avatar";
import { IconSettings } from "~/assets/icons";
import { IconLogout } from "~/assets/icons/IconLogout";
import { useLogout } from "~/hooks/useLogout";
// import { NavbarUserMenu, SpotlightButton } from "~/components/molecules";

export function Navbar() {
  const { user } = useUser();
  const { handleLogout } = useLogout();
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  return (
    <Header
      height={64}
      px="md"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background:
          theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.white
      }}
    >
      <Container size="lg">
        <Flex
          h={64}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Anchor
            component={Link}
            to="/dashboard"
            sx={{
              ":hover": {
                textDecoration: "none"
              }
            }}
          >
            <AppLogo size="md" />
          </Anchor>
          <Group spacing="xs">
            {/* color scheme toggler  */}
            <Switch
              checked={colorScheme === "dark"}
              color="yellow"
              onChange={() => toggleColorScheme()}
              size="lg"
              onLabel={<IconSun color={theme.white} size={16} stroke={1.5} />}
              offLabel={
                <IconMoonStars
                  color={theme.colors.gray[6]}
                  size={16}
                  stroke={1.5}
                />
              }
            />
            {/* spotlight button */}
            {/* <Group spacing={0}>
          <Box mr={user ? "xs" : "lg"}><SpotlightButton /></Box>
          {user && <NavbarUserMenu user={user} />}
        </Group> */}

            {/* Sign In / Sign Up buttons */}
            {user ? (
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <Button
                    variant="default"
                    leftIcon={<Avatar fullName={"Naimul Haque"} size="sm" />}
                    px="sm"
                  >
                    Naimul Haque
                    <IconChevronDown size={16} />
                  </Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    icon={<IconUser size={16} />}
                    onClick={() => navigate(`/${"N".toUpperCase()}`)}
                  >
                    Profile
                  </Menu.Item>
                  <Menu.Item
                    icon={<IconSettings width={16} height={16} />}
                    onClick={() => navigate("/settings")}
                  >
                    Settings
                  </Menu.Item>
                  <Menu.Item
                    icon={<IconLogout width={16} height={16} />}
                    onClick={handleLogout}
                  >
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ) : (
              <Group spacing="xs">
                <Button variant="light" component={Link} to="/auth/sign-in">
                  Sign In
                </Button>
                <Button component={Link} to="/auth/sign-up">
                  Sign Up
                </Button>
              </Group>
            )}
          </Group>
        </Flex>
      </Container>
    </Header>
  );
}
