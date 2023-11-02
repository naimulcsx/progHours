import { IconAt } from "@tabler/icons-react";

import { memo } from "react";

import {
  Box,
  Flex,
  Group,
  SimpleGrid,
  Text,
  Title,
  useMantineTheme
} from "@mantine/core";

import { LeaderboardEntry } from "@proghours/data-access";

import {
  IconFirstPlace,
  IconSecondPlace,
  IconThirdPlace
} from "../../../../assets/icons";
import { Countdown } from "../Countdown";
import classes from "./TopPerformers.module.css";

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
            <Title className={classes.text} mb={2} order={3}>
              Top Performers
            </Title>
            <Text className={classes.text} variant="text">
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
              p="lg"
              className={classes.card}
              style={{ order: _order[idx] }}
              key={user.userId}
            >
              <Box>
                {idx === 0 && <IconFirstPlace />}
                {idx === 1 && <IconSecondPlace />}
                {idx === 2 && <IconThirdPlace />}
                <Box>
                  <Title fw={600} order={5} className={classes.text}>
                    {user.fullName}
                  </Title>
                  <Text
                    fw={700}
                    lineClamp={1}
                    fz={theme.headings.sizes.h3.fontSize}
                    className={classes.text}
                    variant="text"
                  >
                    {user.points.toFixed(2)}
                  </Text>
                  <Text
                    className={classes.rank}
                    size="xl"
                    fw={700}
                    variant="text"
                  >
                    {_rank[idx]}
                  </Text>
                  <Flex gap={4} align="center">
                    <IconAt size={16} />
                    <Text size="sm" className={classes.text} variant="text">
                      {user.username.toUpperCase()}
                    </Text>
                  </Flex>
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
          <path className={classes.bgPath} d="M0 -15H360V225H0z"></path>
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
