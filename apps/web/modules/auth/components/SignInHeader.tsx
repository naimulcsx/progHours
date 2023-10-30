import Link from "next/link";

import { Anchor, Box, Text, Title } from "@mantine/core";

export function SignInHeader() {
  return (
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
  );
}
