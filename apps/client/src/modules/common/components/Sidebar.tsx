import { AppShell, NavLink, SegmentedControl, Stack } from "@mantine/core";
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

export function Sidebar() {
  const { pathname } = useLocation();
  const [selected, setSelected] = useLocalStorage({
    key: "panel",
    defaultValue: "REGULAR"
  });
  // const links = selected === "REGULAR" ? userLinks : adminLinks;
  const links = userLinks;
  return (
    <AppShell.Navbar p="md">
      <AppLogo size="md" mb="lg" />
      <SegmentedControl
        mt="xs"
        fullWidth
        value={selected}
        onChange={setSelected}
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
    </AppShell.Navbar>
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
