import { ThemeIcon } from "@mantine/core";
import {
  IconFriends,
  IconHeartRateMonitor,
  IconBook2
} from "@tabler/icons-react";

import {
  IconUsers,
  IconTable,
  IconSettings,
  IconHome,
  IconBarChart
} from "~/assets/icons";

export const adminLinks = [
  {
    label: "Users",
    to: "/admin/users",
    Icon: () => (
      <ThemeIcon size="md" color="orange">
        <IconUsers />
      </ThemeIcon>
    )
  },
  {
    label: "Problems",
    to: "/admin/problems",
    Icon: () => (
      <ThemeIcon size="md" color="red">
        <IconBook2 size={16} stroke={1.6} />
      </ThemeIcon>
    )
  },
  {
    label: "Groups",
    to: "/admin/groups",
    Icon: () => (
      <ThemeIcon size="md" color="cyan">
        <IconFriends size={16} stroke={1.6} />
      </ThemeIcon>
    )
  },

  {
    label: "Parsers",
    to: "/admin/parsers-status",
    Icon: () => (
      <ThemeIcon size="md" color="green">
        <IconHeartRateMonitor size={16} stroke={1.6} />
      </ThemeIcon>
    )
  }
];

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
    Icon: () => <IconTable />
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
    Icon: () => <IconBarChart />
  },
  {
    label: "Settings",
    to: "/settings",
    Icon: () => <IconSettings />
  }
];
