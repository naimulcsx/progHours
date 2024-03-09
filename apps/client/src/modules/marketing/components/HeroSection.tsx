import { IconArrowDown, IconArrowRight } from "@tabler/icons-react";
import { Link } from "react-router-dom";

import {
  Box,
  Button,
  Container,
  Group,
  Image,
  Stack,
  Text,
  Title,
  useComputedColorScheme
} from "@mantine/core";

export function HeroSection() {
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true
  });

  return (
    <Box component="section" pos="relative">
      <Box
        style={{
          position: "absolute",
          inset: 0,
          top: -1,
          maskImage: "linear-gradient(180deg,#fff 5%,transparent 80%)",
          backgroundImage:
            "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(0 0 0 / 0.04)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e\")"
        }}
      />
      <Box pt={60} pb={200} size="xl">
        <Stack
          maw={640}
          align="center"
          style={{
            margin: "0 auto",
            textAlign: "center",
            position: "relative"
          }}
          gap="lg"
          px="md"
        >
          <Button
            component={Link}
            to="https://github.com/naimulcsx/progHours"
            target="_blank"
            variant="proghours-ui-outline"
            rightSection={
              <span role="img" aria-label="star-icon">
                ⭐
              </span>
            }
          >
            Star us on Github
          </Button>
          <Title>Code. Compete. Conquer!</Title>
          <Text size="xl">
            Track your progress with comprehensive analytics on your problem
            solving journey. Climb the leaderboard with every problem you solve.
          </Text>
          <Group>
            <Button
              size="md"
              variant="proghours-ui-outline"
              rightSection={<IconArrowDown />}
            >
              Features
            </Button>
            <Button size="md" rightSection={<IconArrowRight />}>
              Join Waitlist
            </Button>
          </Group>
        </Stack>
      </Box>
      <Container size="lg" style={{ marginTop: -140 }}>
        <Image
          src={
            computedColorScheme === "light" ? "/cover-light.jpg" : "/cover.jpg"
          }
          style={{
            borderRadius: 12,
            border: "1px solid hsl(var(--border) / 0.8)",
            boxShadow: "0 0 12px 2px hsl(var(--primary) / 0.1)"
          }}
        />
      </Container>
    </Box>
  );
}
