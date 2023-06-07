import { PropsWithChildren, useState } from "react";
import {
  AppShell,
  Header,
  MediaQuery,
  Burger,
  useMantineTheme,
  Container
} from "@mantine/core";
import { AppLogo } from "~/assets/AppLogo";

export function PublicLayout({ children }: PropsWithChildren) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0]
        }
      }}
      header={
        <Header height={{ base: 64 }} p="sm">
          <Container size="xl">
            <div
              style={{ display: "flex", alignItems: "center", height: "100%" }}
            >
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>

              <AppLogo size="sm" />
            </div>
          </Container>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}
