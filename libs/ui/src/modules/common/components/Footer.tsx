import { Box, BoxComponentProps, Container, Text, Title } from "@mantine/core";

export function Footer(props: BoxComponentProps) {
  return (
    <Box component="footer" pb="xl" {...props}>
      <Container size="xl" style={{ textAlign: "center" }}>
        <Title order={3}>
          Made with{" "}
          <span role="img" aria-label="love emoji">
            ❤️
          </span>{" "}
          in Bangladesh
        </Title>
        <Text mt="sm" size="md">
          &copy; Copyright Naimul Haque {new Date().getFullYear()}. All Rights
          Reserved.
        </Text>
      </Container>
    </Box>
  );
}
