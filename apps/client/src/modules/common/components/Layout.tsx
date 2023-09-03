import { AppShell, Container } from "@mantine/core";
import { Header } from "./Header";
import { PropsWithChildren } from "react";

export function Layout({ children }: PropsWithChildren) {
  return (
    <AppShell header={{ height: 56 }} padding="md">
      <Header />
      <AppShell.Main>
        <Container size="xl" mt="xs">
          {children}
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
