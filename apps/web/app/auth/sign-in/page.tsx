"use client";

import Link from "next/link";

import { Anchor, Box, Stack, Text, Title } from "@mantine/core";

import { SignInSection } from "./sign-in-section";

export default function SignInPage() {
  return (
    <>
      <Box
        mt="xl"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: "var(--mantine-spacing-sm)",
          paddingRight: "var(--mantine-spacing-sm)"
        }}
      >
        <Box style={{ maxWidth: "440px", flexGrow: 1 }}>
          <Stack>
            <Box>
              <Title order={2} mb="4px">
                Sign in to your account
              </Title>
              <Text>
                Don&apos;t have an account?{" "}
                <Anchor
                  underline="always"
                  style={{
                    color: "hsl(var(--primary))",
                    textUnderlineOffset: 2
                  }}
                  component={Link}
                  href="/auth/sign-up"
                >
                  Sign Up
                </Anchor>
              </Text>
            </Box>
            <SignInSection />
          </Stack>
        </Box>
      </Box>
    </>
  );
}
