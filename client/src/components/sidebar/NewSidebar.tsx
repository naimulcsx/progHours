import { Navbar, Text, NavLink, SegmentedControl, Group, Stack, MantineTheme, Box, Badge } from "@mantine/core"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"

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
  IconUsers,
} from "../GamifiedIcons"

const navItemStyles = (theme: MantineTheme) => ({
  background: "transparent",
  borderRadius: theme.radius.md,

  "&[data-active='true']": {
    color: "white",
    background: `linear-gradient(180deg, ${theme.colors.blue[4]} 0%, ${theme.colors.blue[5]} 50%, ${theme.colors.blue[6]} 100%)`,
    boxShadow:
      "inset 0.125em -0.125em 0.3em rgb(68 68 68 / 40%), inset -0.3em 0 0.0625em -0.25em rgb(34 34 34 / 10%), inset 0.4em 0.5em 0.5em -0.25em rgb(255 255 255 / 20%), 0.04em 0.25em 0 -0.3em #333",
  },
  "& span": {
    fontWeight: 500,
  },
})

const NewSidebar = () => {
  const { user } = useUser()
  const { pathname } = useLocation()
  const [value, setValue] = useState(() => localStorage.getItem("__sc") || "user")

  useEffect(() => {
    localStorage.setItem("__sc", value)
  }, [value])

  return (
    <Navbar
      width={{ base: 0, lg: 230 }}
      p="xs"
      sx={(theme) => ({
        fontWeight: 500,
        background: `linear-gradient(to left, ${theme.colors.dark[7]}, ${theme.colors.dark[8]})`,
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
        <SegmentedControl
          sx={(theme) => ({ background: theme.colors.dark[9] })}
          mb="xl"
          fullWidth
          value={value}
          onChange={setValue}
          data={[
            { label: "User", value: "user" },
            { label: "Admin", value: "admin" },
          ]}
        />
        {value === "user" && (
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
        )}
        {value === "admin" && (
          <Stack spacing="xs">
            <NavLink
              component={Link}
              to="/users"
              label="User Management"
              icon={<IconUsers />}
              active={pathname === "/users"}
              sx={navItemStyles}
            />
          </Stack>
        )}
      </Navbar.Section>

      <Navbar.Section sx={{ display: "flex", alignItems: "center", gap: 10 }}>
        {user && (
          <Box
            sx={(theme) => ({
              width: "100%",
            })}
          >
            <Group sx={{ alignItems: "flex-start" }}>
              <Avatar name={user.name} />
              <Box>
                <Text>{user.name}</Text>
                <Badge color="cyan">{user.role}</Badge>
              </Box>
            </Group>
          </Box>
        )}
        {/* <Anchor> About </Anchor>
        <Anchor> Leave a star </Anchor> */}
      </Navbar.Section>
    </Navbar>
  )
}

export default NewSidebar
