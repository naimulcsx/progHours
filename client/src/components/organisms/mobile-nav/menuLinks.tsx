import { IconChartLine, IconUsers, IconSettings } from "@tabler/icons"

export const menuLinks = [
  {
    label: "Groups",
    to: "/groups",
    Icon: () => <IconUsers size={14} />,
  },
  {
    label: "Activities",
    to: "/activities",
    Icon: () => <IconChartLine size={14} />,
  },
  {
    label: "Settings",
    to: "/settings",
    Icon: () => <IconSettings size={14} />,
  },
]
