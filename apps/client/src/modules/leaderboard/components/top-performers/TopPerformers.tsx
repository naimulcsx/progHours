import { memo } from "react";

import {
  Box,
  Group,
  SimpleGrid,
  Text,
  Title,
  useMantineTheme
} from "@mantine/core";

import {
  IconFirstPlace,
  IconSecondPlace,
  IconThirdPlace
} from "~/assets/icons";

import { Countdown } from "../Countdown";
import classes from "./TopPerformers.module.css";

import { LeaderboardEntry } from "@proghours/data-access";

export const TopPerformers = memo(function ({
  topUsers
}: {
  topUsers: LeaderboardEntry[];
}) {
  const theme = useMantineTheme();
  return (
    <Box mb="xl" p="lg" className={classes.root}>
      <BgPattern />
      <Box style={{ position: "relative" }}>
        <Group justify="space-between" align="start">
          <Box>
            <Title mb={2} order={3} variant="proghours-ui-primary">
              Top Performers
            </Title>
            <Text variant="proghours-ui-primary">
              The stage is set, and the world is watching. It's time to shine!
            </Text>
          </Box>
          <Countdown />
        </Group>
      </Box>
      <SimpleGrid
        mt="sm"
        cols={3}
        style={{ position: "relative", alignItems: "flex-end" }}
      >
        {topUsers?.map((user, idx) => {
          const _order = [1, 0, 2];
          const _rank = ["1st", "2nd", "3rd"];
          return (
            <Box
              p="xl"
              className={classes.card}
              style={{ order: _order[idx] }}
              key={user.userId}
            >
              <Box>
                {idx === 0 && <IconFirstPlace />}
                {idx === 1 && <IconSecondPlace />}
                {idx === 2 && <IconThirdPlace />}
                <Box>
                  <Title fw={600} order={5} variant="proghours-ui-primary">
                    {user.fullName}
                  </Title>
                  <Text
                    fw={700}
                    lineClamp={1}
                    variant="proghours-ui-primary"
                    fz={theme.headings.sizes.h3.fontSize}
                  >
                    {user.points.toFixed(2)}
                  </Text>
                  <Text
                    variant="proghours-ui-primary"
                    className={classes.rank}
                    size="xl"
                    fw={700}
                  >
                    {_rank[idx]}
                  </Text>
                  <Text size="sm" variant="proghours-ui-primary">
                    @{user.username.toUpperCase()}
                  </Text>
                </Box>
              </Box>
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
});

function BgPattern() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      fill="none"
      viewBox="0 0 360 200"
      style={{ position: "absolute", inset: 0 }}
    >
      <g clipPath="url(#clip0_2_2343)">
        <mask
          id="mask0_2_2343"
          style={{ maskType: "alpha" }}
          width="480"
          height="480"
          x="-60"
          y="-135"
          maskUnits="userSpaceOnUse"
        >
          <circle
            cx="180"
            cy="105"
            r="120"
            stroke="#000"
            strokeDasharray="7.2 7.2"
            strokeWidth="240"
          ></circle>
        </mask>
        <g mask="url(#mask0_2_2343)">
          <path fill="hsl(var(--primary))" d="M0 -15H360V225H0z"></path>
        </g>
      </g>
      <defs>
        <clipPath id="clip0_2_2343">
          <path fill="#fff" d="M0 0H360V200H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}
