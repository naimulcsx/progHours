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
    background: `linear-gradient(180deg, hsl(var(--secondary)), hsl(var(--secondary) / 0.9)), var(--hex-bg-image)`
  };

  return (
    <Box component="section">
      <Box
        pt={60}
        pb={200}
        size="xl"
        style={colorScheme === "light" ? lightStyles : darkStyles}
      >
        <Stack
          maw={640}
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
