import { Navbar, Text, NavLink, SegmentedControl, Progress, Group, Stack } from "@mantine/core"
import { Link, useLocation } from "react-router-dom"
import {
  IconLayout2,
  IconUsers,
  IconClipboardList,
  IconNotes,
  IconChartBar,
  IconChartLine,
  IconSettings,
} from "@tabler/icons"

import Avatar from "~/components/Avatar"
import useUser from "~/hooks/useUser"

const NewSidebar = () => {
  const { user } = useUser()
  const { pathname } = useLocation()
  return (
    <Navbar width={{ base: 0, lg: 230 }} p="xs" sx={{ fontWeight: 500 }} hidden hiddenBreakpoint="lg">
      {/* Navlink */}
      <Navbar.Section>
        <Stack
          sx={(theme) => ({ background: "linear-gradient(to right, #2FA1DF, #1A6BB9)", borderRadius: theme.radius.md })}
          p="sm"
          mb="xl"
          spacing="xs"
        >
          <Group>
            <Avatar name={user?.name || ""} width={28} height={28} />
            <Text sx={{ color: "white", fontWeight: 600 }}>{user?.name}</Text>
          </Group>
          <Progress value={58} label="29/50" size="xl" radius="xl" />
        </Stack>
      </Navbar.Section>
      <Navbar.Section grow mt="xs">
        {/* <SegmentedControl
          mb="sm"
          fullWidth
          data={[
            { label: "User", value: "user" },
            { label: "Admin", value: "admin" },
          ]}
        /> */}
        <NavLink
          component={Link}
          to="/dashboard"
          label="Dashboard"
          icon={<IconLayout2 size={24} stroke={1.5} />}
          active={pathname === "/dashboard"}
          sx={(theme) => ({
            color: theme.colors.gray[8],
          })}
        />
        <NavLink
          component={Link}
          to="/submissions"
          label="Submissions"
          icon={<IconClipboardList size={24} stroke={1.5} />}
          active={pathname === "/submissions"}
          sx={(theme) => ({ color: theme.colors.gray[8] })}
        />
        <NavLink
          component={Link}
          to="/study"
          label="Study List"
          icon={<IconNotes size={24} stroke={1.5} />}
          active={pathname === "/study"}
          sx={(theme) => ({ color: theme.colors.gray[8] })}
        />
        <NavLink
          component={Link}
          to="/groups"
          label="My Groups"
          icon={<IconUsers size={24} stroke={1.5} />}
          active={pathname === "/groups"}
          sx={(theme) => ({ color: theme.colors.gray[8] })}
        />
        <NavLink
          component={Link}
          to="/leaderboard"
          label="Leaderboard"
          icon={<IconChartBar size={24} stroke={1.5} />}
          active={pathname === "/leaderboard"}
          sx={(theme) => ({ color: theme.colors.gray[8] })}
        />
        <NavLink
          component={Link}
          to="/activities"
          label="Activities"
          icon={<IconChartLine size={24} stroke={1.5} />}
          active={pathname === "/activities"}
          sx={(theme) => ({ color: theme.colors.gray[8] })}
        />
        <NavLink
          component={Link}
          to="/settings"
          label="Settings"
          icon={<IconSettings size={24} stroke={1.5} />}
          active={pathname === "/settings"}
          sx={(theme) => ({ color: theme.colors.gray[8] })}
        />
      </Navbar.Section>

      {/* <Navbar.Section sx={{ display: "flex", alignItems: "center", gap: 10 }}>
        <NavLink
          component={Link}
          to="/settings"
          label="Settings"
          icon={<IconSettings size={24} stroke={1.5} />}
          active={pathname === "/settings"}
          sx={(theme) => ({ color: theme.colors.gray[8] })}
        />
      </Navbar.Section> */}
    </Navbar>
  )
}

export default NewSidebar
