"use client";

import { PropsWithChildren } from "react";

import { AppShell, Box, Container } from "@mantine/core";

import { Footer } from "../footer/Footer";
import { Header } from "../header/Header";

export interface LayoutProps {
  withContainer?: boolean;
}

export function Layout({
  children,
  withContainer = true
}: PropsWithChildren<LayoutProps>) {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <Header />
      <AppShell.Main>
        {withContainer ? (
          <Container size="xl" mt="xs">
            {children}
          </Container>
        ) : (
          <Box m="-16px">{children}</Box>
        )}
      </AppShell.Main>
      <Footer />
    </AppShell>
  );
}
