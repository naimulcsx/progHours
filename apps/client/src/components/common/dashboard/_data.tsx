import { ThemeIcon } from "@mantine/core";
import {
  IconUsers,
  IconFriends,
  IconHeartRateMonitor,
  IconBook2,
  IconLayout2,
  IconClipboardList,
  IconNotes,
  IconChartBar,
  IconSettings
} from "@tabler/icons-react";

export const adminLinks = [
  {
    label: "Users",
    to: "/admin/users",
    Icon: () => (
      <ThemeIcon size="md" color="orange" style={{ marginLeft: 8 }}>
        <IconUsers size={16} stroke={2} />
      </ThemeIcon>
    )
  },
  {
    label: "Problems",
    to: "/admin/problems",
    Icon: () => (
      <ThemeIcon size="md" color="red" style={{ marginLeft: 8 }}>
        <IconBook2 size={16} stroke={2} />
      </ThemeIcon>
    )
  },
  {
    label: "Groups",
    to: "/admin/groups",
    Icon: () => (
      <ThemeIcon size="md" color="cyan" style={{ marginLeft: 8 }}>
        <IconFriends size={16} stroke={2} />
      </ThemeIcon>
    )
  },

  {
    label: "Parsers",
    to: "/admin/parsers-status",
    Icon: () => (
      <ThemeIcon size="md" style={{ marginLeft: 8 }} color="green">
        <IconHeartRateMonitor size={16} stroke={2} />
      </ThemeIcon>
    )
  }
];

export const userLinks = [
  {
    label: "Overview",
    to: "/overview",
    Icon: () => (
      <ThemeIcon size="md" color="orange" style={{ marginLeft: 8 }}>
        <IconLayout2 size={16} stroke={2} />
      </ThemeIcon>
    )
  },
  {
    label: "Submissions",
    to: "/submissions",
    Icon: () => (
      <ThemeIcon size="md" style={{ marginLeft: 8 }} color="green">
        <IconClipboardList size={16} stroke={2} />
      </ThemeIcon>
    )
  },
  {
    label: "Study List",
    to: "/study",
    Icon: () => (
      <ThemeIcon size="md" style={{ marginLeft: 8 }} color="lime">
        <IconNotes size={16} stroke={2} />
      </ThemeIcon>
    )
  },
  {
    label: "Groups",
    to: "/groups",
    Icon: () => (
      <ThemeIcon size="md" style={{ marginLeft: 8 }} color="indigo">
        <IconUsers size={16} stroke={2} />
      </ThemeIcon>
    )
  },
  {
    label: "Leaderboard",
    to: "/leaderboard",
    Icon: () => (
      <ThemeIcon size="md" style={{ marginLeft: 8 }} color="cyan">
        <IconChartBar size={16} stroke={2} />
      </ThemeIcon>
    )
  },
  {
    label: "Activities",
    to: "/activities",
    Icon: () => (
      <ThemeIcon size="md" style={{ marginLeft: 8 }} color="pink">
        <IconNotes size={16} stroke={2} />
      </ThemeIcon>
    )
  },
  {
    label: "Settings",
    to: "/settings",
    Icon: () => (
      <ThemeIcon size="md" style={{ marginLeft: 8 }} color="red">
        <IconSettings size={16} stroke={2} />
      </ThemeIcon>
    )
  }
];
