import { Form, Link } from "@remix-run/react";
import {
  IconChevronDown,
  IconDeviceDesktop,
  IconMoonStars,
  IconSun
} from "@tabler/icons-react";
import cookies from "js-cookie";

import { useRef } from "react";

import {
  ActionIcon,
  Anchor,
  AppShellHeader,
  Button,
  Container,
  Flex,
  Group,
  Menu,
  useMantineColorScheme
} from "@mantine/core";

import {
  IconHome,
  IconLogout,
  IconSettings,
  useLogoutRemix,
  useUser
} from "@proghours/ui";

import { AppLogo } from "../../../assets/AppLogo";

export function Header() {
  const { user } = useUser();
  const { colorScheme } = useMantineColorScheme();
  const dummyFormRef = useRef<HTMLFormElement>(null);

  const { handleLogout } = useLogoutRemix(dummyFormRef);

  return (
    <AppShellHeader style={{ display: "flex", alignItems: "center" }}>
      {/* dummy form to refresh loaders without full page refresh */}
      <Form method="post" ref={dummyFormRef} />

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
            <Menu width={120}>
              <Menu.Target>
                <ActionIcon size="lg" style={{ border: 0 }}>
                  {colorScheme === "dark" && (
                    <IconMoonStars color="#fcc419" size={16} />
                  )}
                  {colorScheme === "light" && <IconSun size={16} />}
                  {colorScheme === "auto" && <IconDeviceDesktop size={16} />}
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  leftSection={<IconSun size={16} />}
                  onClick={() => {
                    cookies.set("colorScheme", "light");
                    document.location.reload();
                  }}
                >
                  Light
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconMoonStars size={16} />}
                  onClick={() => {
                    cookies.set("colorScheme", "dark");
                    document.location.reload();
                  }}
                >
                  Dark
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>

            {!user ? (
              <>
                <Button
                  component={Link}
                  to="/auth/sign-in"
                  variant="proghours-ui-secondary"
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
                    variant="proghours-ui-secondary"
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
