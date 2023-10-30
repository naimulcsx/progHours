import Link from "next/link";

import { Anchor, Box, Text, Title } from "@mantine/core";

export function SignUpHeader() {
  return (
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
  );
}
