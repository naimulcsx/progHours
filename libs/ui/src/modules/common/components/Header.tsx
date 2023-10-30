import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { setCookie } from "cookies-next";
import Link from "next/link";

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

import { AppLogo } from "~/ui/assets/AppLogo";

// import { IconHome, IconSettings } from "~/ui/assets/icons";
// import { IconLogout } from "~/ui/assets/icons/IconLogout";
// import { useLogout } from "~/ui/modules/auth/hooks/useLogout";

export function Header() {
  // const { handleLogout } = useLogout();
  const { colorScheme } = useMantineColorScheme();

  return (
    <AppShellHeader style={{ display: "flex", alignItems: "center" }}>
      <Container w="100%" size="xl">
        <Flex justify="space-between" align="center">
          <Group>
            <Anchor component={Link} href="/" underline="never">
              <AppLogo size="sm" />
            </Anchor>
            <Flex ml="lg" gap="md">
              <Anchor
                fw={600}
                className="headerLink"
                component={Link}
                href="/"
                size="sm"
                underline="never"
              >
                Home
              </Anchor>
              <Anchor
                fw={600}
                className="headerLink"
                component={Link}
                href="/leaderboard"
                size="sm"
                underline="never"
              >
                Leaderboard
              </Anchor>
              <Anchor
                fw={600}
                className="headerLink"
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
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  leftSection={<IconSun size={16} />}
                  onClick={() => {
                    setCookie("color-scheme", "light");
                    window.location.reload();
                  }}
                >
                  Light
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconMoonStars size={16} />}
                  onClick={() => {
                    setCookie("color-scheme", "dark");
                    window.location.reload();
                  }}
                >
                  Dark
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
            <Button
              component={Link}
              href="/auth/sign-in"
              variant="proghours-ui-secondary"
            >
              Sign In
            </Button>
            <Button component={Link} href="/auth/sign-up">
              Sign Up
            </Button>
          </Group>
        </Flex>
      </Container>
    </AppShellHeader>
  );
}
