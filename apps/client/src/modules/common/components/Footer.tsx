import { Box, Container, Text } from "@mantine/core";

export function Footer() {
  return (
    <Box
      component="footer"
      mt={56}
      py={24}
      style={{ borderTop: "1px solid hsl(var(--border) / 0.75)" }}
    >
      <Container size="xl" style={{ textAlign: "center" }}>
        <Text size="lg" style={{ color: "hsl(var(--foreground))" }}>
          Made with{" "}
          <span role="img" aria-label="love emoji">
            ❤️
          </span>{" "}
          in Bangladesh
        </Text>
        <Text mt="sm">
          &copy; Copyright Naimul Haque {new Date().getFullYear()}. All Rights
          Reserved.
        </Text>
      </Container>
    </Box>
  );
}
