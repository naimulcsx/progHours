import { PropsWithChildren } from "react";
import { AppShell, useMantineTheme } from "@mantine/core";
import { Navbar } from "./Navbar";

export function Layout({ children }: PropsWithChildren) {
  const theme = useMantineTheme();
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
      header={<Navbar />}
    >
      {children}
    </AppShell>
  );
}
