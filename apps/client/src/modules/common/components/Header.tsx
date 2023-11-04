import {
  IconChevronDown,
  IconDeviceDesktop,
  IconMoonStars,
  IconSun
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

import {
  ActionIcon,
  Anchor,
  AppShellHeader,
  Burger,
  Button,
  Container,
  Drawer,
  Flex,
  Group,
  Menu,
  Stack,
  useMantineColorScheme
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { AppLogo } from "~/assets/AppLogo";
import { IconHome, IconSettings } from "~/assets/icons";
import { IconLogout } from "~/assets/icons/IconLogout";
import { useLogout } from "~/modules/auth/hooks/useLogout";
import { useUser } from "~/modules/auth/hooks/useUser";

export function Header() {
  const { user } = useUser();
  const { handleLogout } = useLogout();
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const [opened, { toggle, close }] = useDisclosure();

  return (
    <AppShellHeader style={{ display: "flex", alignItems: "center" }}>
      <Container w="100%" size="xl">
        <Flex justify="space-between" align="center">
          <Group>
            <Anchor component={Link} to="/" underline="never">
              <AppLogo size="sm" />
            </Anchor>
            <Flex ml="lg" gap="md" visibleFrom="sm">
              <Anchor
                fw={600}
                component={Link}
                to="/"
                size="sm"
                underline="never"
              >
                Home
              </Anchor>
              <Anchor
                fw={600}
                component={Link}
                to="/leaderboard"
                size="sm"
                underline="never"
              >
                Leaderboard
              </Anchor>
              <Anchor
                fw={600}
                href="https://github.com/naimulcsx/progHours"
                target="_blank"
                size="sm"
                underline="never"
              >
                Github
              </Anchor>
            </Flex>
          </Group>
          <Group visibleFrom="sm">
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
                  onClick={() => setColorScheme("light")}
                >
                  Light
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconMoonStars size={16} />}
                  onClick={() => setColorScheme("dark")}
                >
                  Dark
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconDeviceDesktop size={16} />}
                  onClick={() => setColorScheme("auto")}
                >
                  Auto
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
                    fw={600}
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
                    Log Out
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
          </Group>
          <Group hiddenFrom="sm">
            <Burger
              opened={opened}
              onClick={toggle}
              aria-label="Toggle navigation"
            />
            <Drawer
              size={280}
              opened={opened}
              onClose={close}
              title={<AppLogo size="sm" />}
              transitionProps={{ duration: 400 }}
              overlayProps={{ backgroundOpacity: 0.25, blur: 2 }}
            >
              <Stack mt="lg">
                <Anchor
                  fw={600}
                  component={Link}
                  to="/"
                  size="sm"
                  underline="never"
                  onClick={() => toggle()}
                >
                  Home
                </Anchor>
                <Anchor
                  fw={600}
                  component={Link}
                  to="/leaderboard"
                  size="sm"
                  underline="never"
                  onClick={() => toggle()}
                >
                  Leaderboard
                </Anchor>
                <Anchor
                  fw={600}
                  href="https://github.com/naimulcsx/progHours"
                  target="_blank"
                  size="sm"
                  underline="never"
                  onClick={() => toggle()}
                >
                  Github
                </Anchor>
                <Button
                  component={Link}
                  to="/auth/sign-in"
                  variant="proghours-ui-secondary"
                  style={{ flexGrow: 1 }}
                  onClick={() => toggle()}
                >
                  Sign In
                </Button>
                <Button
                  component={Link}
                  to="/auth/sign-up"
                  style={{ flexGrow: 1 }}
                  onClick={() => toggle()}
                >
                  Sign Up
                </Button>
              </Stack>
            </Drawer>
          </Group>
        </Flex>
      </Container>
    </AppShellHeader>
  );
}
