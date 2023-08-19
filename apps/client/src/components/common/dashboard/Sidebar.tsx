import {
  ActionIcon,
  Anchor,
  Avatar,
  Box,
  Group,
  Navbar,
  NavLink,
  SegmentedControl,
  Stack,
  useMantineTheme
} from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "~/hooks/useUser";
import { AppLogo } from "~/assets/AppLogo";
import SpotlightButton from "./SpotlightButton";
import { useLocalStorage } from "@mantine/hooks";
import { useLogout } from "~/hooks/useLogout";
import { IconLogout } from "~/assets/icons/IconLogout";
import { userLinks, adminLinks } from "./_data";
import { UserDetails } from "./UserDetails";

export default function Sidebar() {
  const { user } = useUser();
  const theme = useMantineTheme();
  const { pathname } = useLocation();
  const { handleLogout } = useLogout();
  const [selected, setSelected] = useLocalStorage({
    key: "panel",
    defaultValue: "REGULAR"
  });
  const links = selected === "REGULAR" ? userLinks : adminLinks;

  return (
    <Navbar>
      <Navbar.Section grow>
        {/* logo */}
        <Box mb={24}>
          <Anchor component={Link} to="/dashboard">
            <AppLogo size="lg" />
          </Anchor>
        </Box>

        {/* nav switcher */}
        {user && user.role === "ADMIN" && (
          <SegmentedControl
            mt="md"
            fullWidth
            value={selected}
            onChange={setSelected}
            transitionDuration={0}
            data={[
              { label: "User", value: "REGULAR" },
              { label: "Admin", value: "ADMIN" }
            ]}
          />
        )}

        {/* navlinks */}
        <Stack mt="xl" spacing={6}>
          {links.map((link, index) => {
            return (
              <NavLink
                key={index}
                component={Link}
                to={link.to}
                label={link.label}
                active={
                  pathname.includes("/settings")
                    ? link.to.includes("/settings")
                    : pathname === link.to
                }
                icon={<link.Icon />}
              />
            );
          })}
        </Stack>
      </Navbar.Section>

      <Navbar.Section>
        <Stack spacing="xl">
          {/* search button */}
          <SpotlightButton />

          <Group spacing="xs">
            {/* user avatar */}
            <Avatar variant="filled" color={theme.primaryColor} radius="xl">
              NH
            </Avatar>

            {/* user details */}
            <UserDetails />

            {/* logout button */}
            <ActionIcon onClick={handleLogout}>
              <IconLogout />
            </ActionIcon>
          </Group>
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}
