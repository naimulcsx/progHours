import { Link, useLocation } from "react-router-dom";

import { Anchor, AppShellFooter, Container, Grid, Text } from "@mantine/core";

import {
  IconBarChart,
  IconHome,
  IconSettings,
  IconTable
} from "~/assets/icons";

import classes from "./ButtonBar.module.css";

export function BottomBar() {
  const { pathname } = useLocation();
  return (
    <AppShellFooter hiddenFrom="sm">
      <Container px="lg" py={0}>
        <Grid gutter="xs">
          {userLinks.map((link, i) => {
            const isActive = pathname.includes(link.to);
            return (
              <Grid.Col span={3} key={i}>
                <Anchor
                  py="xs"
                  component={Link}
                  to={link.to}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                  }}
                  className={isActive ? classes.active : ""}
                  underline="never"
                >
                  <link.Icon />
                  <Text
                    mt={4}
                    size="xs"
                    fw={600}
                    className={isActive ? classes.active : ""}
                  >
                    {link.label}
                  </Text>
                </Anchor>
              </Grid.Col>
            );
          })}
        </Grid>
      </Container>
    </AppShellFooter>
  );
}

export const userLinks = [
  {
    label: "Overview",
    to: "/overview",
    Icon: () => <IconHome width={20} height={20} />
  },
  {
    label: "Submissions",
    to: "/submissions",
    Icon: () => <IconTable width={20} height={20} />
  },
  {
    label: "Leaderboard",
    to: "/leaderboard",
    Icon: () => <IconBarChart width={20} height={20} />
  },
  {
    label: "Settings",
    to: "/settings/appearance",
    activePath: "/settings",
    Icon: () => <IconSettings width={20} height={20} />
  }
];
