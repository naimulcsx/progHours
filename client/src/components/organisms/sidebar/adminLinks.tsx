import { ThemeIcon } from "@mantine/core"
import { IconUsers, IconFriends, IconHeartRateMonitor } from "@tabler/icons"

export const adminLinks = [
  {
    label: "User Management",
    to: "/admin/users",
    Icon: () => (
      <ThemeIcon size="md" color="orange" style={{ marginLeft: 8 }}>
        <IconUsers size={16} stroke={2} />
      </ThemeIcon>
    ),
  },
  {
    label: "Group Management",
    to: "/admin/groups",
    Icon: () => (
      <ThemeIcon size="md" color="cyan" style={{ marginLeft: 8 }}>
        <IconFriends size={16} stroke={2} />
      </ThemeIcon>
    ),
  },
  {
    label: "Parsers Status",
    to: "/admin/parsers-status",
    Icon: () => (
      <ThemeIcon size="md" style={{ marginLeft: 8 }} color="green">
        <IconHeartRateMonitor size={16} stroke={2} />
      </ThemeIcon>
    ),
  },
]
