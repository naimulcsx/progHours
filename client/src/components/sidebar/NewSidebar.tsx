import {
  Navbar,
  Box,
  Text,
  NavLink,
  Avatar,
  UnstyledButton,
  Group,
} from "@mantine/core"

import {
  IconLayout2,
  IconUsers,
  IconClipboardList,
  IconNotes,
  IconChartBar,
  IconChartLine,
} from "@tabler/icons"

import { Link, useLocation } from "react-router-dom"

const NewSidebar = () => {
  const { pathname } = useLocation()
  return (
    <Navbar
      width={{ base: 0, lg: 230 }}
      p="xs"
      sx={{ fontWeight: 500 }}
      hidden
      hiddenBreakpoint="lg"
    >
      {/* Navlink */}
      <Navbar.Section grow mt="xs">
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
          label="Groups"
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
      </Navbar.Section>

      <Navbar.Section sx={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* user */}
        <UnstyledButton
          sx={(theme) => ({
            display: "block",
            width: "100%",
            padding: theme.spacing.xs,
            borderRadius: theme.radius.sm,
            color:
              theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

            "&:hover": {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[6]
                  : theme.colors.gray[0],
            },
          })}
        >
          <Group>
            <Avatar
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan" }}
              radius="xl"
            >
              NH
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Text size="sm" weight={500}>
                Naimul Haque
              </Text>
              <Text color="dimmed" size="xs">
                naimulcsx@gmail.com
              </Text>
            </Box>
          </Group>
        </UnstyledButton>
      </Navbar.Section>
    </Navbar>
  )
}

export default NewSidebar
