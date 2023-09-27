import { IconArrowDown, IconArrowRight } from "@tabler/icons-react";

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

import { Layout } from "~/modules/common/components/Layout";

export default function HomePage() {
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true
  });

  return (
    <Layout withContainer={false}>
      <Box component="section" py={64}>
        <Container size="xl">
          <Stack
            maw={600}
            align="center"
            style={{ margin: "0 auto", textAlign: "center" }}
            gap="lg"
          >
            <Title>Code. Compete. Conquer!</Title>
            <Text size="xl" lh={1.35}>
              Track your progress with comprehensive analytics on your problem
              solving journey. Climb the leaderboard with every problem you
              solve.
            </Text>
            <Group>
              <Button
                size="md"
                variant="msu-secondary"
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
              computedColorScheme === "light" ? "cover-light.png" : "/cover.png"
            }
            style={{
              borderRadius: "12px",
              border: "1px solid hsl(var(--border))",
              boxShadow: "0 0 12px 1px hsl(var(--primary)/0.1)"
            }}
          />
        </Container>
      </Box>
    </Layout>
  );
}
