import {
  IconChartBar,
  IconChartLine,
  IconChartPie,
  IconUser
} from "@tabler/icons-react";

import { Box, Container, Grid, Paper, Stack, Text, Title } from "@mantine/core";

import { FeatureItem } from "../types";

export function FeaturesSection() {
  return (
    <Box component="section" my={{ base: 56, lg: 96 }}>
      <Container size="xs" style={{ textAlign: "center" }}>
        <Stack gap="sm">
          <Title order={2}>Features</Title>
          <Text>
            Discover how progHours is revolutionizing the way students engage in
            competitive programming and problem-solving with these key features.
          </Text>
        </Stack>
      </Container>
      <Container size="lg" mt={40}>
        <Grid gutter="xl">
          {featuresData.map((feature, i) => (
            <Grid.Col span={{ base: 12, sm: 6, lg: 3 }} key={i}>
              <Paper p="lg">
                <Stack>
                  {feature.icon}
                  <Title order={4} lh={1.25}>
                    {feature.title.map((s, i) => (
                      <span key={i}>{s}</span>
                    ))}
                  </Title>
                  <Text size="sm">{feature.description}</Text>
                </Stack>
              </Paper>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

const featuresData: FeatureItem[] = [
  {
    icon: <IconChartPie size={40} stroke={1.7} color="hsl(var(--primary))" />,
    title: ["Comprehensive", <br />, "Analytics"],
    description:
      "Track your journey with precision using our platform's in-depth analytics."
  },
  {
    icon: <IconChartLine size={40} stroke={1.7} color="hsl(var(--primary))" />,
    title: ["Coach", <br />, "Insights"],
    description:
      "Empower coaches with valuable insights to monitor and assess student progress."
  },
  {
    icon: <IconChartBar size={40} stroke={1.7} color="hsl(var(--primary))" />,
    title: ["Rewards &", <br />, "Leaderboard"],
    description:
      "Climb the leaderboard, earn points, and unlock rewarding achievements."
  },
  {
    icon: <IconUser size={40} stroke={1.7} color="hsl(var(--primary))" />,
    title: ["Profile", <br />, "Showcase"],
    description:
      "Stand out to tech recruiters by creating a profile that highlights your problem-solving skills."
  }
];
