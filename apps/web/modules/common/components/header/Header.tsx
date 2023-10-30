"use client";

import Link from "next/link";

import {
  Anchor,
  AppShellHeader,
  Button,
  Container,
  Flex,
  Group
} from "@mantine/core";

import { AppLogo, useUser } from "@proghours/ui";

import { ActiveUserMenu } from "./ActiveUserMenu";
import { ColorSchemeSwitcher } from "./ColorSchemeSwitcher";
import { Navigation } from "./Navigation";

export function Header() {
  const { user } = useUser();
  return (
    <AppShellHeader style={{ display: "flex", alignItems: "center" }}>
      <Container w="100%" size="xl">
        <Flex justify="space-between" align="center">
          <Group>
            <Anchor component={Link} href="/" underline="never">
              <AppLogo size="sm" />
            </Anchor>
            <Navigation />
          </Group>
          <Group>
            <ColorSchemeSwitcher />
            {!user ? (
              <>
                <Button
                  component={Link}
                  href="/auth/sign-in"
                  variant="proghours-ui-secondary"
                >
                  Sign In
                </Button>
                <Button component={Link} href="/auth/sign-up">
                  Sign Up
                </Button>
              </>
            ) : (
              <ActiveUserMenu fullName={user.fullName} />
            )}
          </Group>
        </Flex>
      </Container>
    </AppShellHeader>
  );
}
