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

export default function HomePage() {
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true
  });

  const lightStyles = {
    "--hex-bg-image":
      'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJhIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB3aWR0aD0iMjkiIGhlaWdodD0iNTAuMTE1IiBwYXR0ZXJuVHJhbnNmb3JtPSJzY2FsZSgyKSI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iaHNsYSgwLDAlLDEwMCUsMSkiLz48cGF0aCBkPSJNMTQuNDk4IDE2Ljg1OCAwIDguNDg4LjAwMi04LjI1N2wxNC41LTguMzc0TDI5LTguMjZsLS4wMDIgMTYuNzQ1em0wIDUwLjA2TDAgNTguNTQ4bC4wMDItMTYuNzQ1IDE0LjUtOC4zNzNMMjkgNDEuOGwtLjAwMiAxNi43NDR6TTI4Ljk5NiA0MS44bC0xNC40OTgtOC4zNy4wMDItMTYuNzQ0TDI5IDguMzEybDE0LjQ5OCA4LjM3LS4wMDIgMTYuNzQ1em0tMjkgMC0xNC40OTgtOC4zNy4wMDItMTYuNzQ0TDAgOC4zMTJsMTQuNDk4IDguMzctLjAwMiAxNi43NDV6IiBzdHJva2Utd2lkdGg9Ii41IiBzdHJva2U9ImhzbGEoMjIxLjIsIDgzLjIlLCA4NS4zJSwgMSkiIGZpbGw9Im5vbmUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSI4MDAlIiBoZWlnaHQ9IjgwMCUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zOCAtNi40NikiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=")',
    backgroundSize: "100%",
    background: `linear-gradient(180deg, rgba(251,251,255,0) 79.36%, hsl(var(--primary) / 0.075) 100%), linear-gradient(180deg,hsl(var(--primary) / 0.1) 0, rgba(250,250,255,0.9) 0, rgba(235,245,255,0.9) 50%,rgba(235,245,255,.4) 100%), var(--hex-bg-image)`
  };

  const darkStyles = {
    "--hex-bg-image":
      'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJhIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB3aWR0aD0iMjkiIGhlaWdodD0iNTAuMTE1IiBwYXR0ZXJuVHJhbnNmb3JtPSJzY2FsZSgyKSI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iaHNsYSgwLDAlLDEwMCUsMSkiLz48cGF0aCBkPSJNMTQuNDk4IDE2Ljg1OCAwIDguNDg4LjAwMi04LjI1N2wxNC41LTguMzc0TDI5LTguMjZsLS4wMDIgMTYuNzQ1em0wIDUwLjA2TDAgNTguNTQ4bC4wMDItMTYuNzQ1IDE0LjUtOC4zNzNMMjkgNDEuOGwtLjAwMiAxNi43NDR6TTI4Ljk5NiA0MS44bC0xNC40OTgtOC4zNy4wMDItMTYuNzQ0TDI5IDguMzEybDE0LjQ5OCA4LjM3LS4wMDIgMTYuNzQ1em0tMjkgMC0xNC40OTgtOC4zNy4wMDItMTYuNzQ0TDAgOC4zMTJsMTQuNDk4IDguMzctLjAwMiAxNi43NDV6IiBzdHJva2Utd2lkdGg9Ii41IiBzdHJva2U9ImhzbGEoMjE2LCAyMyUsIDQzJSwgMSkiIGZpbGw9Im5vbmUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSI4MDAlIiBoZWlnaHQ9IjgwMCUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zOCAtNi40NikiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=")',
    backgroundSize: "100%",
    background: `linear-gradient(180deg, hsl(var(--secondary) / 0.99) 40%, hsl(var(--background) / 0.925)), var(--hex-bg-image)`
  };

  return (
    <>
      <Helmet>
        <title>progHours - Code. Compete. Conquer!</title>
      </Helmet>
      <Box component="section">
        <Box
          pt={60}
          pb={200}
          size="xl"
          style={computedColorScheme === "light" ? lightStyles : darkStyles}
        >
          <Stack
            maw={640}
            align="center"
            style={{ margin: "0 auto", textAlign: "center" }}
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
              solving journey. Climb the leaderboard with every problem you
              solve.
            </Text>
            <Group>
              <Button
                size="md"
                variant="proghours-ui-white"
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
        <Container style={{ marginTop: -140 }}>
          <Image
            src={
              computedColorScheme === "light"
                ? "/cover-light.jpg"
                : "/cover.jpg"
            }
            style={{
              borderRadius: 12,
              border: "1px solid hsl(var(--border))",
              boxShadow: "0 0 12px 2px hsl(var(--primary) / 0.1)"
            }}
          />
        </Container>
      </Box>

      {/* features section */}
      <Box component="section" my={{ base: 56, lg: 96 }}>
        <Container size="xs" style={{ textAlign: "center" }}>
          <Stack gap="sm">
            <Title order={2}>Features</Title>
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
              <Grid.Col span={{ base: 12, sm: 6, lg: 3 }} key={i}>
                <Stack
                  p="lg"
                  style={{
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }}
                >
                  {service.icon}
                  <Title order={4} lh={1.25}>
                    {service.title.map((s, i) => (
                      <span key={i}>{s}</span>
                    ))}
                  </Title>
                  <Text>{service.desc}</Text>
                </Stack>
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FAQ section */}
      <Box component="section" my={{ base: 56, lg: 96 }}>
        <Container size="xs" style={{ textAlign: "center" }}>
          <Stack gap="lg">
            <Title order={2}>You probably got many questions</Title>
            <Text size="lg">
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

      <Box
        component="footer"
        mt={56}
        py={24}
        style={{ background: "hsl(var(--secondary))" }}
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
    </>
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
