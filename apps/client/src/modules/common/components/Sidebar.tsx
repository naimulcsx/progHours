import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";

import {
  ActionIcon,
  AppShell,
  Box,
  Group,
  NavLink,
  SegmentedControl,
  Stack,
  Text,
  Tooltip
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

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
import { IconLogout } from "~/assets/icons/IconLogout";
import { useLogout } from "~/modules/auth/hooks/useLogout";
import { useUser } from "~/modules/auth/hooks/useUser";

import { useSidebar } from "../contexts/SidebarContext";
import { Avatar } from "./Avatar";
import SpotlightButton from "./SpotlightButton";

export function Sidebar() {
  const { pathname } = useLocation();
  const [selected, setSelected] = useLocalStorage({
    key: "panel",
    defaultValue: "REGULAR"
  });
  const { handleLogout } = useLogout();
  const links = userLinks;

  const { collapsed, toggleCollapse } = useSidebar();
  return (
    <AppShell.Navbar p="md">
      <AppShell.Section grow>
        <AppLogo align="center" style={{ flex: 1 }} size="md" />
        {!collapsed && (
          <SegmentedControl
            mt="lg"
            fullWidth
            value={selected}
            onChange={setSelected}
            transitionDuration={0}
            data={[
              { label: "User", value: "REGULAR" },
              { label: "Admin", value: "ADMIN" }
            ]}
          />
        )}
        <Stack mt="lg" gap={6}>
          {links.map((link, index) => {
            const child = (
              <NavLink
                key={index}
                component={Link}
                to={link.to}
                label={collapsed ? "" : link.label}
                active={pathname.includes(link.to)}
                leftSection={<link.Icon />}
              />
            );
            if (collapsed) {
              return (
                <Tooltip position="right" label={link.label}>
                  {child}
                </Tooltip>
              );
            }
            return child;
          })}
        </Stack>
      </AppShell.Section>
      <AppShell.Section>
        <SpotlightButton />

        <Group gap="xs" mt="sm" justify="center">
          {/* user avatar */}
          <Avatar variant="filled" fullName="Naimul Haque" size="md">
            NH
          </Avatar>

          {/* user details */}
          {!collapsed && <UserDetails />}

          {/* logout button */}
          {!collapsed && (
            <ActionIcon size="lg" onClick={handleLogout}>
              <IconLogout width={18} height={18} />
            </ActionIcon>
          )}
        </Group>

        <ActionIcon
          mt="xs"
          size="xs"
          style={{
            position: "absolute",
            top: 0,
            right: -10
          }}
          onClick={toggleCollapse}
        >
          {collapsed ? (
            <IconChevronRight width={14} height={14} />
          ) : (
            <IconChevronLeft width={14} height={14} />
          )}
        </ActionIcon>
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
          lh={1.5}
          size="sm"
          fw={500}
        >
          {user?.fullName}
        </Text>
        <Text size="xs" lineClamp={1}>
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
