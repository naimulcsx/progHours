import {
  IconArrowDown,
  IconArrowRight,
  IconChartBar,
  IconChartLine,
  IconChartPie,
  IconUser
} from "@tabler/icons-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import {
  Accordion,
  Box,
  Button,
  Container,
  Grid,
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
      <Helmet>
        <title>progHours - Code. Compete. Conquer!</title>
      </Helmet>
      <Box component="section" my={72}>
        <Container size="xl">
          <Stack
            maw={600}
            align="center"
            style={{ margin: "0 auto", textAlign: "center" }}
            gap="lg"
          >
            <Button
              component={Link}
              to="https://github.com/naimulcsx/progHours"
              target="_blank"
              variant="msu-outline"
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
              computedColorScheme === "light" ? "cover-light.jpg" : "/cover.jpg"
            }
            style={{
              borderRadius: "12px",
              border: "1px solid hsl(var(--border))",
              boxShadow: "0 0 12px 1px hsl(var(--primary)/0.1)"
            }}
          />
        </Container>
      </Box>
      <Box component="section" my={96}>
        <Container size="xs" style={{ textAlign: "center" }}>
          <Stack gap="sm">
            <Title>Features</Title>
            <Text>
              Discover how progHours is revolutionizing the way students engage
              in competitive programming and problem-solving with these key
              features.
            </Text>
          </Stack>
        </Container>
        <Container size="xl" mt={40}>
          <Grid gutter="xl">
            {services.map((service, i) => (
              <Grid.Col span={3} key={i}>
                <Stack
                  p="lg"
                  style={{
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }}
                >
                  {service.icon}
                  <Title order={4} lh={1.25}>
                    {service.title}
                  </Title>
                  <Text>{service.desc}</Text>
                </Stack>
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box component="section" my={96}>
        <Container size="xs" style={{ textAlign: "center" }}>
          <Stack gap="lg">
            <Title>You probably got many questions</Title>
            <Text size="lg" lh={1.35}>
              So here's a list of things we think you might be wondering about
              when it comes to progHours.
            </Text>
          </Stack>
        </Container>
        <Container size="sm" mt={40}>
          <Accordion>
            {faq.map((q) => (
              <Accordion.Item key={q.value} value={q.value}>
                <Accordion.Control>{q.value}</Accordion.Control>
                <Accordion.Panel>
                  <Text>{q.description}</Text>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </Container>
      </Box>

      <Box component="footer" my={96}>
        <Container size="xl" style={{ textAlign: "center" }}>
          <Title order={2}>
            Made with love in{" "}
            <span role="img" aria-label="bangladesh-flag">
              🇧🇩
            </span>
          </Title>
          <Text mt="sm" size="lg">
            &copy; Copyright Naimul Haque {new Date().getFullYear()}. All Rights
            Reserved.
          </Text>
        </Container>
      </Box>
    </Layout>
  );
}

const services = [
  {
    icon: <IconChartPie size={40} stroke={1.7} color="hsl(var(--primary))" />,
    title: ["Comprehensive", <br />, "Analytics"],
    desc: "Track your problem-solving journey with precision using our platform's in-depth analytics."
  },
  {
    icon: <IconChartLine size={40} stroke={1.7} color="hsl(var(--primary))" />,
    title: ["Coach", <br />, "Insights"],
    desc: "Empower coaches with valuable insights to monitor and assess student progress."
  },
  {
    icon: <IconChartBar size={40} stroke={1.7} color="hsl(var(--primary))" />,
    title: ["Rewards &", <br />, "Leaderboard"],
    desc: "Climb the leaderboard, earn points, and unlock rewarding achievements."
  },
  {
    icon: <IconUser size={40} stroke={1.7} color="hsl(var(--primary))" />,
    title: ["Profile", <br />, "Showcase"],
    desc: "Stand out to tech recruiters by creating a profile that highlights your problem-solving skills."
  }
];

const faq = [
  {
    value: "Why is the name progHours?",
    description: `Since our platform is all about programming and problem-solving. The first name that came to our mind was "programming hours". We decided to tweak it a bit and came up with "progHours". We liked it and it stuck.`
  },
  {
    value: "How does the leaderboard work?",
    description:
      "The leaderboard ranks users based on how many problems they've solved and the difficulty of those problems."
  },
  {
    value: "How can progHours help educators?",
    description:
      "progHours offers tools for coaches and educators to monitor students' progress, assess their performance."
  },
  {
    value: "When is it coming out?",
    description:
      "We are working hard to get the first public version of progHours out as soon as possible."
  },
  {
    value: "Will I be given access?",
    description:
      "Yes, we will onboard the people on our waitlist based on a first come first serve basis, with a 1000 user limit for our initial version."
  }
  // {
  //   value: "Is there a mobile app for progHours?",
  //   description:
  //     "Currently, progHours is accessible through web browsers. However, we've plans to work on a mobile app in the future."
  // }
];
