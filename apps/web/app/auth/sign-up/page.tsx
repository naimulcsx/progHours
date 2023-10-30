"use client";

import Link from "next/link";

import { Anchor, Box, Stack, Text, Title } from "@mantine/core";

import { SignUpSection } from "./sign-up-section";

export default function SignUpPage() {
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
                Sign up for an account
              </Title>
              <Text>
                Already have an account?{" "}
                <Anchor
                  underline="always"
                  style={{
                    color: "hsl(var(--primary))",
                    textUnderlineOffset: 2
                  }}
                  component={Link}
                  href="/auth/sign-in"
                >
                  Sign In
                </Anchor>
              </Text>
            </Box>
            <SignUpSection />
          </Stack>
        </Box>
      </Box>
    </>
  );
}
