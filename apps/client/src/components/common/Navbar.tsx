import {
  Anchor,
  Button,
  Group,
  Header,
  Switch,
  useMantineColorScheme,
  useMantineTheme
} from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { AppLogo } from "~/assets/AppLogo";
import { useUser } from "~/hooks/useUser";
// import { NavbarUserMenu, SpotlightButton } from "~/components/molecules";

export function Navbar() {
  const { user } = useUser();
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  return (
    <Header
      height={72}
      px="md"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background:
          theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white
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
        <AppLogo size="sm" />
      </Anchor>
      <Group spacing="xs">
        {/* color scheme toggler  */}
        <Switch
          checked={colorScheme === "dark"}
          color="yellow"
          onChange={() => toggleColorScheme()}
          size="md"
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
        {!user && (
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
    </Header>
  );
}
