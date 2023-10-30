import {
  IconChartBar,
  IconChartLine,
  IconChartPie,
  IconUser
} from "@tabler/icons-react";

import { Box, Container, SimpleGrid, Stack, Text, Title } from "@mantine/core";

export function Features() {
  return (
    <Box component="section" my={96}>
      <Container size="xs" style={{ textAlign: "center" }}>
        <Stack gap="sm">
          <Title>Features</Title>
          <Text>
            Discover how progHours is revolutionizing the way students engage in
            competitive programming and problem-solving with these key features.
          </Text>
        </Stack>
      </Container>
      <Box mt={40}>
        <SimpleGrid cols={4}>
          {services.map((service) => (
            <Stack
              key={service.id}
              p="lg"
              style={{
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)"
              }}
            >
              {service.icon}
              <Title order={4} lh={1.25}>
                {service.title.map((el, i) => (
                  <span key={i}>{el}</span>
                ))}
              </Title>
              <Text>{service.desc}</Text>
            </Stack>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}

const services = [
  {
    id: 1,
    icon: <IconChartPie size={40} stroke={1.7} color="hsl(var(--primary))" />,
    title: ["Comprehensive", <br />, "Analytics"],
    desc: "Track your problem-solving journey with precision using our platform's in-depth analytics."
  },
  {
    id: 2,
    icon: <IconChartLine size={40} stroke={1.7} color="hsl(var(--primary))" />,
    title: ["Coach", <br />, "Insights"],
    desc: "Empower coaches with valuable insights to monitor and assess student progress."
  },
  {
    id: 3,
    icon: <IconChartBar size={40} stroke={1.7} color="hsl(var(--primary))" />,
    title: ["Rewards &", <br />, "Leaderboard"],
    desc: "Climb the leaderboard, earn points, and unlock rewarding achievements."
  },
  {
    id: 4,
    icon: <IconUser size={40} stroke={1.7} color="hsl(var(--primary))" />,
    title: ["Profile", <br />, "Showcase"],
    desc: "Stand out to tech recruiters by creating a profile that highlights your problem-solving skills."
  }
];
