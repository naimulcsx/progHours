import {
  Anchor,
  Box,
  Navbar,
  NavLink,
  SegmentedControl,
  Stack,
  useMantineTheme
} from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import { useLocalStorage } from "@mantine/hooks";
import { useUser } from "~/hooks/useUser";
import { userLinks, adminLinks } from "./_data";
import { AppLogo } from "~/assets/AppLogo";

export default function Sidebar() {
  const { user } = useUser();
  const { pathname } = useLocation();
  const theme = useMantineTheme();

  const [selected, setSelected] = useLocalStorage({
    key: "panel",
    defaultValue: "REGULAR"
  });

  return (
    <Navbar
      p="md"
      hidden
      width={{ base: 0, lg: 220 }}
      hiddenBreakpoint="lg"
      sx={{
        fontWeight: 500,
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white
      }}
    >
      <Navbar.Section grow>
        <Box mb="md">
          <Anchor
            component={Link}
            to="/dashboard"
            sx={{
              ":hover": {
                textDecoration: "none"
              }
            }}
          >
            <AppLogo size="md" />
          </Anchor>
        </Box>

        {user?.role === "ADMIN" && (
          <SegmentedControl
            mb="md"
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
        )}

        <Stack spacing={6} sx={{ margin: "0 -16px" }}>
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
    </Navbar>
  );
}
