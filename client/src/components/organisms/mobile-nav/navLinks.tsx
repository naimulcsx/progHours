import { IconChartBar, IconClipboardList, IconLayout2, IconNotes } from "@tabler/icons"

export const navLinks = [
  {
    label: "Dashboard",
    to: "/dashboard",
    Icon: () => <IconLayout2 style={{ marginLeft: 12 }} size={24} stroke={1.5} />,
  },
  {
    label: "Submissions",
    to: "/submissions",
    Icon: () => <IconClipboardList style={{ marginLeft: 12 }} size={24} stroke={1.5} />,
  },
  {
    label: "Study List",
    to: "/study",
    Icon: () => <IconNotes style={{ marginLeft: 12 }} size={24} stroke={1.5} />,
  },
  {
    label: "Leaderboard",
    to: "/leaderboard",
    Icon: () => <IconChartBar style={{ marginLeft: 12 }} size={24} stroke={1.5} />,
  },
]
