import { Box, Stack } from "@mantine/core";

import { SignUpHeader } from "~/modules/auth/components/SignUpHeader";

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
            <SignUpHeader />
            <SignUpSection />
          </Stack>
        </Box>
      </Box>
    </>
  );
}
