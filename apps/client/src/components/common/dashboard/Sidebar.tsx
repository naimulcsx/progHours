import {
  Anchor,
  Avatar,
  Box,
  Group,
  Navbar,
  NavLink,
  Stack,
  Text,
  useMantineTheme
} from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "~/hooks/useUser";
import { userLinks, adminLinks } from "./_data";
import { AppLogo } from "~/assets/AppLogo";
import SpotlightButton from "./SpotlightButton";
import { useLocalStorage } from "@mantine/hooks";

export default function Sidebar() {
  const { user } = useUser();

  const { pathname } = useLocation();
  const theme = useMantineTheme();
  // const { handleLogout } = useLogout();

  const [selected] = useLocalStorage({
    key: "panel",
    defaultValue: "REGULAR"
  });

  return (
    <Navbar
      p="xl"
      width={{ base: 0, lg: 250 }}
      hidden
      hiddenBreakpoint="lg"
      sx={{
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white
      }}
    >
      <Navbar.Section grow>
        <Box mb={24}>
          <Anchor
            component={Link}
            to="/dashboard"
            sx={{
              ":hover": {
                textDecoration: "none"
              }
            }}
          >
            <AppLogo size="lg" />
          </Anchor>
        </Box>

        <SpotlightButton />

        {/* {user?.role === "ADMIN" && (
          <SegmentedControl
            mt="md"
            fullWidth
            value={selected}
            onChange={setSelected}
            data={[
              { label: "User", value: "REGULAR" },
              { label: "Admin", value: "ADMIN" }
            ]}
            transitionDuration={0}
            sx={{
              background:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[9]
                  : theme.colors.gray[1]
            }}
          />
        )} */}

        <Stack mt="xl" spacing={6} sx={{ margin: "0 -12px" }}>
          {selected === "REGULAR"
            ? userLinks.map((link, index) => {
                return (
                  <NavLink
                    key={index}
                    component={Link}
                    to={link.to}
                    label={link.label}
                    active={pathname === link.to}
                    icon={<link.Icon />}
                  />
                );
              })
            : adminLinks.map((link, index) => {
                return (
                  <NavLink
                    key={index}
                    component={Link}
                    to={link.to}
                    label={link.label}
                    active={pathname === link.to}
                    icon={<link.Icon />}
                  />
                );
              })}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Group spacing="xs">
          <Avatar variant="filled" color={theme.primaryColor} radius="xl">
            NH
          </Avatar>
          <Stack>
            <Box>
              <Text
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: 145,
                  fontWeight: 600
                }}
                size="sm"
              >
                Naimul Haque
              </Text>
              <Text
                size="sm"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: 145
                }}
              >
                {user?.email}
              </Text>
            </Box>
            {/* Logout
            <ActionIcon size="sm" onClick={handleLogout}>
              <IconLogout />
            </ActionIcon> */}
          </Stack>
        </Group>
      </Navbar.Section>
    </Navbar>
  );
}
