import Link from "next/link";

import { Anchor, Flex } from "@mantine/core";

export function Navigation() {
  return (
    <Flex ml="lg" gap="md">
      <Anchor
        fw={600}
        className="headerLink"
        component={Link}
        href="/"
        size="sm"
        underline="never"
      >
        Home
      </Anchor>
      <Anchor
        fw={600}
        className="headerLink"
        component={Link}
        href="/leaderboard"
        size="sm"
        underline="never"
      >
        Leaderboard
      </Anchor>
      <Anchor
        fw={600}
        className="headerLink"
        href="https://github.com/naimulcsx/progHours"
        target="_blank"
        size="sm"
        underline="never"
      >
        Github
      </Anchor>
    </Flex>
  );
}
