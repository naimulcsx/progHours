import { IconChevronDown, IconMoonStars, IconSun } from "@tabler/icons-react";
import { Link } from "react-router-dom";

import {
  Anchor,
  AppShellHeader,
  Button,
  Container,
  Flex,
  Group,
  Menu,
  Switch,
  useMantineColorScheme
} from "@mantine/core";

import { AppLogo } from "~/assets/AppLogo";
import { IconHome, IconSettings } from "~/assets/icons";
import { IconLogout } from "~/assets/icons/IconLogout";
import { useLogout } from "~/modules/auth/hooks/useLogout";
import { useUser } from "~/modules/auth/hooks/useUser";

export function Header() {
  const { user } = useUser();
  const { handleLogout } = useLogout();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <AppShellHeader style={{ display: "flex", alignItems: "center" }}>
      <Container w="100%" size="xl">
        <Flex justify="space-between" align="center">
          <Group>
            <Anchor component={Link} to="/" underline="never">
              <AppLogo size="sm" />
            </Anchor>
            <Flex ml="lg" gap="md">
              <Anchor component={Link} to="/" size="sm" underline="never">
                Home
              </Anchor>
              <Anchor
                component={Link}
                to="/leaderboard"
                size="sm"
                underline="never"
              >
                Leaderboard
              </Anchor>
              <Anchor
                href="https://github.com/naimulcsx/progHours"
                target="_blank"
                size="sm"
                underline="never"
              >
                Github
              </Anchor>
            </Flex>
          </Group>
          <Group>
            <Switch
              checked={colorScheme === "dark"}
              color="yellow"
              onChange={() => toggleColorScheme()}
              size="lg"
              onLabel={<IconSun size={16} stroke={1.5} />}
              offLabel={<IconMoonStars size={16} stroke={1.5} />}
            />
            {!user ? (
              <>
                <Button
                  component={Link}
                  to="/auth/sign-in"
                  variant="msu-secondary"
                >
                  Sign In
                </Button>
                <Button component={Link} to="/auth/sign-up">
                  Sign Up
                </Button>
              </>
            ) : (
              <Menu width={200}>
                <Menu.Target>
                  <Button
                    variant="msu-secondary"
                    rightSection={<IconChevronDown size={16} />}
                  >
                    {user.fullName}
                  </Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    leftSection={<IconHome width={18} height={18} />}
                    component={Link}
                    to="/overview"
                  >
                    Dashboard
                  </Menu.Item>
                  <Menu.Item
                    leftSection={<IconSettings width={18} height={18} />}
                    component={Link}
                    to="/settings/appearance"
                  >
                    Settings
                  </Menu.Item>
                  <Menu.Item
                    leftSection={<IconLogout width={18} height={18} />}
                    onClick={handleLogout}
                  >
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
          </Group>
        </Flex>
      </Container>
    </AppShellHeader>
  );
}
