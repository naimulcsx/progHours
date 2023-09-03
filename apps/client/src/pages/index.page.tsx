import { Button, Group, Stack, Text, Title } from "@mantine/core";
import { Layout } from "~/modules/common/components/Layout";

export default function HomePage() {
  return (
    <Layout>
      <Stack maw={600} mt="lg">
        <Title>Code. Compete. Conquer!</Title>
        <Text size="xl" lh={1.35}>
          Track your progress with comprehensive analytics on your problem
          solving journey. Climb the leaderboard with every problem you solve.
        </Text>
        <Group>
          <Button size="md" variant="msu-secondary">
            Learn More
          </Button>
          <Button size="md"> Get Started</Button>
        </Group>
      </Stack>
    </Layout>
  );
}
