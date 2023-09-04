import {
  ActionIcon,
  AppShell,
  Box,
  Group,
  NavLink,
  SegmentedControl,
  Stack,
  Text
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { Link, useLocation } from "react-router-dom";
import { AppLogo } from "~/assets/AppLogo";
import {
  IconBarChart,
  IconBookOpen,
  IconHome,
  IconLayoutAlt,
  IconSettings,
  IconTable,
  IconUsers
} from "~/assets/icons";
import SpotlightButton from "./SpotlightButton";
import { Avatar } from "./Avatar";
import { useUser } from "~/modules/auth/hooks/useUser";
import { useLogout } from "~/modules/auth/hooks/useLogout";
import { IconLogout } from "~/assets/icons/IconLogout";

export function Sidebar() {
  const { pathname } = useLocation();
  const [selected, setSelected] = useLocalStorage({
    key: "panel",
    defaultValue: "REGULAR"
  });
  const { handleLogout } = useLogout();
  const links = userLinks;
  return (
    <AppShell.Navbar p="md">
      <AppShell.Section grow>
        <AppLogo size="md" mb="lg" />
        <SegmentedControl
          mt="xs"
          fullWidth
          value={selected}
          onChange={setSelected}
          transitionDuration={0}
          data={[
            { label: "User", value: "REGULAR" },
            { label: "Admin", value: "ADMIN" }
          ]}
        />
        <Stack mt="xl" gap={6}>
          {links.map((link, index) => {
            return (
              <NavLink
                key={index}
                component={Link}
                to={link.to}
                label={link.label}
                active={
                  pathname.includes("/settings")
                    ? link.to.includes("/settings")
                    : pathname === link.to
                }
                leftSection={<link.Icon />}
              />
            );
          })}
        </Stack>
      </AppShell.Section>
      <AppShell.Section>
        <SpotlightButton />

        <Group gap="xs" mt="lg">
          {/* user avatar */}
          <Avatar variant="filled" fullName="Naimul Haque" size="md">
            NH
          </Avatar>

          {/* user details */}
          <UserDetails />

          {/* logout button */}
          <ActionIcon onClick={handleLogout}>
            <IconLogout />
          </ActionIcon>
        </Group>
      </AppShell.Section>
    </AppShell.Navbar>
  );
}

export function UserDetails() {
  const { user } = useUser();
  return (
    <Stack
      style={{
        flexGrow: 1
      }}
    >
      <Box>
        <Text
          style={{
            maxWidth: 130,
            color: "hsl(var(--foreground))"
          }}
          lineClamp={1}
          size="md"
          fw={500}
        >
          {user?.fullName}
        </Text>
        <Text
          size="sm"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxWidth: 130
          }}
        >
          {user?.username.toUpperCase()}
        </Text>
      </Box>
    </Stack>
  );
}

export const userLinks = [
  {
    label: "Overview",
    to: "/overview",
    Icon: () => <IconHome />
  },
  {
    label: "Submissions",
    to: "/submissions",
    Icon: () => <IconTable />
  },
  {
    label: "Study List",
    to: "/study",
    Icon: () => <IconBookOpen />
  },
  {
    label: "Groups",
    to: "/groups",
    Icon: () => <IconUsers />
  },
  {
    label: "Leaderboard",
    to: "/leaderboard",
    Icon: () => <IconBarChart />
  },
  {
    label: "Activities",
    to: "/activities",
    Icon: () => <IconLayoutAlt />
  },
  {
    label: "Settings",
    to: "/settings/appearance",
    activePath: "/settings",
    Icon: () => <IconSettings />
  }
];
