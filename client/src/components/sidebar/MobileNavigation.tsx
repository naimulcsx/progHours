import { Box, Button, Group, NavLink, Menu, ThemeIcon, useMantineTheme } from "@mantine/core"
import {
  IconLayout2,
  IconUsers,
  IconClipboardList,
  IconNotes,
  IconChartBar,
  IconChartLine,
  IconDotsVertical,
  IconSettings,
} from "@tabler/icons"
import { Link, useLocation, useNavigate } from "react-router-dom"

export default function MobileNavigation() {
  const navigate = useNavigate()
  const theme = useMantineTheme()
  const { pathname } = useLocation()
  return (
    <Group
      py="6px"
      sx={(theme) => ({
        display: "none",
        justifyContent: "center",
        position: "fixed",
        flexWrap: "nowrap",
        gap: 2,
        bottom: 0,
        left: 0,
        right: 0,
        background: theme.colors.dark[7],
        borderTop: "1px solid",
        borderColor: theme.colors.dark[4],
        [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
          display: "flex",
        },
      })}
    >
      <NavLink
        component={Link}
        to="/dashboard"
        icon={<IconLayout2 style={{ marginLeft: 8 }} size={20} stroke={1.5} />}
        active={pathname === "/dashboard"}
        sx={(theme) => ({
          width: "auto",
          display: "flex",
          borderRadius: theme.radius.md,
          "&[data-active='true']": {
            color: "white",
            background: theme.colors.dark[4],
          },
        })}
      />
      <NavLink
        component={Link}
        to="/submissions"
        icon={<IconClipboardList style={{ marginLeft: 8 }} size={20} stroke={1.5} />}
        active={pathname === "/submissions"}
        sx={(theme) => ({
          width: "auto",
          display: "flex",
          borderRadius: theme.radius.md,
          "&[data-active='true']": {
            color: "white",
            background: theme.colors.dark[4],
          },
        })}
      />
      <NavLink
        component={Link}
        to="/study"
        icon={<IconNotes style={{ marginLeft: 8 }} size={20} stroke={1.5} />}
        active={pathname === "/study"}
        sx={(theme) => ({
          width: "auto",
          display: "flex",
          borderRadius: theme.radius.md,
          "&[data-active='true']": {
            color: "white",
            background: theme.colors.dark[4],
          },
        })}
      />

      <NavLink
        component={Link}
        to="/leaderboard"
        icon={<IconChartBar style={{ marginLeft: 8 }} size={20} stroke={1.5} />}
        active={pathname === "/leaderboard"}
        sx={(theme) => ({
          width: "auto",
          display: "flex",
          borderRadius: theme.radius.md,
          "&[data-active='true']": {
            color: "white",
            background: theme.colors.dark[4],
          },
        })}
      />

      <Menu shadow="md" width={200}>
        <Menu.Target>
          <NavLink
            icon={<IconDotsVertical style={{ marginLeft: 8 }} size={20} stroke={1.5} />}
            sx={(theme) => ({
              color: theme.colors.gray[5],
              width: "auto",
              borderRadius: theme.radius.md,
            })}
          />
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item icon={<IconUsers size={14} />} onClick={() => navigate("/groups")}>
            Groups
          </Menu.Item>
          <Menu.Item icon={<IconChartLine size={14} />} onClick={() => navigate("/activities")}>
            Activities
          </Menu.Item>
          <Menu.Item icon={<IconSettings size={14} />} onClick={() => navigate("/settings")}>
            Settings
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  )
}
