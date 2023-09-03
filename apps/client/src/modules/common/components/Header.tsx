import { useDisclosure } from "@mantine/hooks";
import {
  Anchor,
  AppShellHeader,
  Burger,
  Button,
  Container,
  Flex,
  Group,
  Switch,
  useMantineColorScheme
} from "@mantine/core";
import { AppLogo } from "~/assets/AppLogo";
import { Link } from "react-router-dom";
import { IconMoonStars, IconSun } from "@tabler/icons-react";

export function Header() {
  const [opened, { toggle }] = useDisclosure();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  return (
    <AppShellHeader style={{ display: "flex", alignItems: "center" }}>
      <Container size="xl" w="100%">
        <Flex justify="space-between" align="center">
          <Group>
            <Anchor component={Link} to="/dashboard" underline="never">
              <AppLogo size="sm" />
            </Anchor>
            <Flex ml="lg" gap="md">
              <Anchor size="sm" underline="never">
                Home
              </Anchor>
              <Anchor size="sm" underline="never">
                About
              </Anchor>
              <Anchor size="sm" underline="never">
                Leaderboard
              </Anchor>
              <Anchor size="sm" underline="never">
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
            <Button variant="msu-secondary">Sign In</Button>
            <Button>Sign Up</Button>
          </Group>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Flex>
      </Container>
    </AppShellHeader>
  );
}
