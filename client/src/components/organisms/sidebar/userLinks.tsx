import { ThemeIcon } from "@mantine/core"
import {
  IconLayout2,
  IconClipboardList,
  IconNotes,
  IconUsers,
  IconChartBar,
  IconSettings,
} from "@tabler/icons"

export const userLinks = [
  {
    label: "Dashboard",
    to: "/dashboard",
    Icon: () => (
      <ThemeIcon size="md" color="orange" style={{ marginLeft: 8 }}>
        <IconLayout2 size={16} stroke={2} />
      </ThemeIcon>
    ),
  },
  {
    label: "Submissions",
    to: "/submissions",
    Icon: () => (
      <ThemeIcon size="md" style={{ marginLeft: 8 }} color="green">
        <IconClipboardList size={16} stroke={2} />
      </ThemeIcon>
    ),
  },
  {
    label: "Study List",
    to: "/study",
    Icon: () => (
      <ThemeIcon size="md" style={{ marginLeft: 8 }} color="lime">
        <IconNotes size={16} stroke={2} />
      </ThemeIcon>
    ),
  },
  {
    label: "Groups",
    to: "/groups",
    Icon: () => (
      <ThemeIcon size="md" style={{ marginLeft: 8 }} color="indigo">
        <IconUsers size={16} stroke={2} />
      </ThemeIcon>
    ),
  },
  {
    label: "Leaderboard",
    to: "/leaderboard",
    Icon: () => (
      <ThemeIcon size="md" style={{ marginLeft: 8 }} color="cyan">
        <IconChartBar size={16} stroke={2} />
      </ThemeIcon>
    ),
  },
  {
    label: "Activities",
    to: "/activities",
    Icon: () => (
      <ThemeIcon size="md" style={{ marginLeft: 8 }} color="pink">
        <IconNotes size={16} stroke={2} />
      </ThemeIcon>
    ),
  },
  {
    label: "Settings",
    to: "/settings",
    Icon: () => (
      <ThemeIcon size="md" style={{ marginLeft: 8 }} color="red">
        <IconSettings size={16} stroke={2} />
      </ThemeIcon>
    ),
  },
]
