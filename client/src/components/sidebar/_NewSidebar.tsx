import { Navbar, Text, NavLink, SegmentedControl, Progress, Group, Stack, MantineTheme } from "@mantine/core"
import { Link, useLocation } from "react-router-dom"
import { IconLayout2, IconUsers, IconClipboardList, IconNotes, IconChartBar, IconChartLine } from "@tabler/icons"

import Avatar from "~/components/Avatar"
import useUser from "~/hooks/useUser"
import {
  IconActivities,
  IconDashboard,
  IconGroup,
  IconLeaderboard,
  IconSettings,
  IconStudy,
  IconSubmissions,
} from "../GamifiedIcons"

const navItemStyles = (theme: MantineTheme) => ({
  background: "transparent",
  borderRadius: theme.radius.md,
  "&[data-active='true']": {
    color: "white",
    background: `linear-gradient(180deg, ${theme.colors.blue[4]} 0%, ${theme.colors.blue[5]} 50%, ${theme.colors.blue[6]} 100%)`,
  },
  "&[data-active='false']": {
    color: "red",
  },
  "& span": {
    fontWeight: 500,
  },
})

const NewSidebar = () => {
  const { user } = useUser()
  const { pathname } = useLocation()

  return (
    <Navbar
      width={{ base: 0, lg: 230 }}
      p="xs"
      sx={(theme) => ({
        fontWeight: 500,
        background: `linear-gradient(to right, ${theme.colors.dark[7]}, #1C212D)`,
        borderRight: 0,
      })}
      hidden
      hiddenBreakpoint="lg"
    >
      {/* Navlink */}
      {/* <Navbar.Section>
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
      </Navbar.Section> */}
      <Navbar.Section grow mt="xs">
        {/* <SegmentedControl
          mb="sm"
          fullWidth
          data={[
            { label: "User", value: "user" },
            { label: "Admin", value: "admin" },
          ]}
        /> */}
        <Stack spacing="xs">
          <NavLink
            component={Link}
            to="/dashboard"
            label="Dashboard"
            icon={<IconDashboard />}
            active={pathname === "/dashboard"}
            color="red"
            sx={navItemStyles}
          />
          <NavLink
            component={Link}
            to="/submissions"
            label="Submissions"
            icon={<IconSubmissions />}
            active={pathname === "/submissions"}
            sx={navItemStyles}
          />
          <NavLink
            component={Link}
            to="/study"
            label="Study List"
            icon={<IconStudy />}
            active={pathname === "/study"}
            sx={navItemStyles}
          />
          <NavLink
            component={Link}
            to="/groups"
            label="My Groups"
            icon={<IconGroup />}
            active={pathname === "/groups"}
            sx={navItemStyles}
          />
          <NavLink
            component={Link}
            to="/leaderboard"
            label="Leaderboard"
            icon={<IconLeaderboard />}
            active={pathname === "/leaderboard"}
            sx={navItemStyles}
          />
          <NavLink
            component={Link}
            to="/activities"
            label="Activities"
            icon={<IconActivities />}
            active={pathname === "/activities"}
            sx={navItemStyles}
          />
          <NavLink
            component={Link}
            to="/settings"
            label="Settings"
            icon={<IconSettings />}
            active={pathname === "/settings"}
            sx={navItemStyles}
          />
        </Stack>
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
