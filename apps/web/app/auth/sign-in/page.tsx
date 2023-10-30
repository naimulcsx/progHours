import { Box, Stack } from "@mantine/core";

import { SignInHeader } from "~/modules/auth/components/SignInHeader";

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
            <SignInHeader />
            <SignInSection />
          </Stack>
        </Box>
      </Box>
    </>
  );
}
