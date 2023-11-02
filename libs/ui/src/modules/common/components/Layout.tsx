import { PropsWithChildren } from "react";

import { AppShell, Box } from "@mantine/core";

import { Header } from "./Header";

export interface LayoutProps {
  withContainer?: boolean;
}

export function Layout({ children }: PropsWithChildren<LayoutProps>) {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <Header />
      <AppShell.Main>
        <Box m="-16px">{children}</Box>
      </AppShell.Main>
    </AppShell>
  );
}
