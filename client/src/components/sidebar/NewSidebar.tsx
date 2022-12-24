import {
  Navbar,
  Text,
  NavLink,
  SegmentedControl,
  Group,
  Stack,
  MantineTheme,
  Box,
  Badge,
  ThemeIcon,
  useMantineTheme,
  Title,
} from "@mantine/core"
import { IconChartBar, IconClipboardList, IconLayout2, IconNotes, IconSettings, IconUsers } from "@tabler/icons"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"

import Avatar from "~/components/Avatar"
import useUser from "~/hooks/useUser"

const navItemStyles = (theme: MantineTheme) => ({
  background: "transparent",
  borderRadius: theme.radius.md,
  paddingLeft: 4,
  paddingRight: 4,
  "&[data-active='true']": {
    "&:hover": {
      background: theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[2],
    },
    color: theme.colorScheme === "dark" ? theme.white : theme.colors.dark[8],
    // background: `linear-gradient(180deg, ${theme.colors.blue[4]} 0%, ${theme.colors.blue[5]} 50%, ${theme.colors.blue[6]} 100%)`,
    background: theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[1],
    boxShadow:
      theme.colorScheme === "dark"
        ? "inset 0.125em -0.125em 0.3em rgb(68 68 68 / 40%), inset -0.3em 0 0.0625em -0.25em rgb(34 34 34 / 10%), inset 0.4em 0.5em 0.5em -0.25em rgb(255 255 255 / 5%), 0.04em 0.25em 0 -0.3em #333"
        : "none",
  },
  "& span": {
    fontWeight: 500,
  },
})

const NewSidebar = () => {
  const { user } = useUser()
  const { pathname } = useLocation()
  const [value, setValue] = useState(() => localStorage.getItem("__sc") || "user")
  const theme = useMantineTheme()

  useEffect(() => {
    localStorage.setItem("__sc", value)
  }, [value])

  return (
    <Navbar
      width={{ base: 0, lg: 230 }}
      p="xs"
      sx={(theme) => ({
        fontWeight: 500,
        background:
          theme.colorScheme === "dark"
            ? `linear-gradient(to left, ${theme.colors.dark[7]}, ${theme.colors.dark[8]})`
            : theme.white,
      })}
      hidden
      hiddenBreakpoint="lg"
    >
      {/* Navlink */}
      <Navbar.Section grow mt="xs">
        {user?.role === "ADMIN" && (
          <SegmentedControl
            sx={(theme) => ({ background: theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[1] })}
            mb="xl"
            fullWidth
            value={value}
            onChange={setValue}
            data={[
              { label: "User", value: "user" },
              { label: "Admin", value: "admin" },
            ]}
          />
        )}
        {value === "user" && (
          <Stack spacing="xs">
            <NavLink
              component={Link}
              to="/dashboard"
              label="Dashboard"
              active={pathname === "/dashboard"}
              icon={
                <ThemeIcon
                  size="md"
                  color="orange"
                  style={{ marginLeft: 8 }}
                  // variant="gradient"
                  // gradient={{ from: "yellow", to: "red" }}
                  // sx={{ boxShadow: `inset 1px 2px 2px 1px ${theme.colors.yellow[3]}` }}
                >
                  <IconLayout2 size={16} stroke={2} />
                </ThemeIcon>
              }
              color="red"
              sx={navItemStyles}
            />
            <NavLink
              component={Link}
              to="/submissions"
              label="Submissions"
              icon={
                <ThemeIcon
                  size="md"
                  style={{ marginLeft: 8 }}
                  color="green"
                  // variant="gradient"
                  // gradient={{ from: "teal", to: "lime" }}
                  // sx={{ boxShadow: "inset 1px 2px 2px 1px lime" }}
                >
                  <IconClipboardList size={16} stroke={2} />
                </ThemeIcon>
              }
              active={pathname === "/submissions"}
              sx={navItemStyles}
            />
            <NavLink
              component={Link}
              to="/study"
              label="Study List"
              icon={
                <ThemeIcon
                  size="md"
                  style={{ marginLeft: 8 }}
                  color="lime"
                  // variant="gradient"
                  // gradient={{ from: "purple", to: "pink" }}
                  // sx={{ boxShadow: `inset 1px 2px 2px 1px ${theme.colors.pink[4]}` }}
                >
                  <IconNotes size={16} stroke={2} />
                </ThemeIcon>
              }
              active={pathname === "/study"}
              sx={navItemStyles}
            />
            <NavLink
              component={Link}
              to="/groups"
              label="My Groups"
              icon={
                <ThemeIcon
                  size="md"
                  style={{ marginLeft: 8 }}
                  color="indigo"
                  // variant="gradient"
                  // gradient={{ from: "pink", to: "blue" }}
                  // sx={{ boxShadow: `inset 1px 2px 2px 1px ${theme.colors.blue[3]}` }}
                >
                  <IconUsers size={16} stroke={2} />
                </ThemeIcon>
              }
              active={pathname === "/groups"}
              sx={navItemStyles}
            />
            <NavLink
              component={Link}
              to="/leaderboard"
              label="Leaderboard"
              icon={
                <ThemeIcon
                  size="md"
                  style={{ marginLeft: 8 }}
                  color="cyan"
                  // variant="gradient"
                  // gradient={{ from: "red", to: "orange" }}
                  // sx={{ boxShadow: `inset 1px 2px 2px 1px ${theme.colors.pink[3]}` }}
                >
                  <IconChartBar size={16} stroke={2} />
                </ThemeIcon>
              }
              active={pathname === "/leaderboard"}
              sx={navItemStyles}
            />
            <NavLink
              component={Link}
              to="/activities"
              label="Activities"
              icon={
                <ThemeIcon
                  size="md"
                  style={{ marginLeft: 8 }}
                  color="pink"
                  // variant="gradient"
                  // gradient={{ from: theme.colors.pink[8], to: theme.colors.red[8] }}
                  // sx={{ boxShadow: `inset 1px 2px 2px 1px ${theme.colors.red[4]}` }}
                >
                  <IconNotes size={16} stroke={2} />
                </ThemeIcon>
              }
              active={pathname === "/activities"}
              sx={navItemStyles}
            />
            <NavLink
              component={Link}
              to="/settings"
              label="Settings"
              icon={
                <ThemeIcon
                  size="md"
                  style={{ marginLeft: 8 }}
                  color="red"
                  // variant="gradient"
                  // gradient={{ from: theme.colors.yellow[8], to: theme.colors.orange[8] }}
                  // sx={{ boxShadow: `inset 1px 2px 2px 1px ${theme.colors.yellow[6]}` }}
                >
                  <IconSettings size={16} stroke={2} />
                </ThemeIcon>
              }
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
              icon={
                <ThemeIcon
                  size="md"
                  variant="gradient"
                  gradient={{ from: "pink", to: "blue" }}
                  style={{ marginLeft: 8 }}
                  sx={{ boxShadow: `inset 1px 2px 2px 1px ${theme.colors.blue[3]}` }}
                >
                  <IconUsers size={16} stroke={2} />
                </ThemeIcon>
              }
              active={pathname === "/users"}
              sx={navItemStyles}
            />
            <NavLink
              component={Link}
              to="/problems"
              label="User Management"
              icon={
                <ThemeIcon
                  size="md"
                  variant="gradient"
                  gradient={{ from: "pink", to: "blue" }}
                  style={{ marginLeft: 8 }}
                  sx={{ boxShadow: `inset 1px 2px 2px 1px ${theme.colors.blue[3]}` }}
                >
                  <IconUsers size={16} stroke={2} />
                </ThemeIcon>
              }
              active={pathname === "/users"}
              sx={navItemStyles}
            />
          </Stack>
        )}
      </Navbar.Section>

      <Navbar.Section sx={{ display: "flex", alignItems: "center", gap: 16 }}>
        {user && (
          <Box
            sx={(theme) => ({
              width: "100%",
            })}
          >
            <Group sx={{ alignItems: "flex-start" }} spacing={10}>
              <Avatar name={user.name} />
              <Box>
                <Title
                  order={5}
                  sx={(theme) => ({
                    maxWidth: 160,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontWeight: 500,
                    color: theme.colorScheme === "dark" ? theme.white : theme.colors.dark[6],
                  })}
                >
                  {user.name}
                </Title>
                <Badge color="violet">{user.role}</Badge>
              </Box>
            </Group>
          </Box>
        )}
      </Navbar.Section>
    </Navbar>
  )
}

export default NewSidebar
