import { IconArrowDown, IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";

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

export function Hero() {
  const colorScheme = useComputedColorScheme("light");
  return (
    <Box component="section" my={60}>
      <Container size="xl">
        <Stack
          maw={600}
          align="center"
          style={{ margin: "0 auto", textAlign: "center" }}
          gap="lg"
        >
          <Button
            component={Link}
            href="https://github.com/naimulcsx/progHours"
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
          <Text size="xl" lh={1.5}>
            Track your progress with comprehensive analytics on your problem
            solving journey. Climb the leaderboard with every problem you solve.
          </Text>
          <Group>
            <Button
              size="md"
              variant="proghours-ui-secondary"
              rightSection={<IconArrowDown />}
            >
              Features
            </Button>
            <Button size="md" rightSection={<IconArrowRight />}>
              Join Waitlist
            </Button>
          </Group>
        </Stack>
      </Container>
      <Container style={{ marginTop: 64 }}>
        <Image
          src={
            colorScheme === "light"
              ? "/images/cover-light.jpg"
              : "/images/cover.jpg"
          }
          style={{
            borderRadius: 12,
            border: "1px solid hsl(var(--border))",
            boxShadow: "0 0 12px 4px hsl(var(--primary)/0.1)"
          }}
        />
      </Container>
    </Box>
  );
}
