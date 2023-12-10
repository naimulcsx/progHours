import { useState } from "react";

import {
  Box,
  Container,
  Flex,
  Grid,
  Paper,
  SegmentedControl,
  Stack,
  Text,
  Title
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import { AvgDifficultyChart } from "~/modules/dashboard/overview/components/charts/AvgDifficultyChart";
import { TimeSpentChart } from "~/modules/dashboard/overview/components/charts/TimeSpentChart";
import { TopSolvedTagsChart } from "~/modules/dashboard/overview/components/charts/TopSolvedTagsChart";
import { WeeklySolvedChart } from "~/modules/dashboard/overview/components/charts/WeeklySolvedChart";
import { Analytics } from "~/modules/marketing/types";

export function AnalyticsSection() {
  const matches = useMediaQuery("(max-width: 640px)");
  const [value, setValue] = useState<Analytics>("weeklyInsights");
  return (
    <Box component="section" my={{ base: 56, lg: 96 }}>
      <Container size="xs" style={{ textAlign: "center" }}>
        <Stack gap="lg">
          <Title order={2}>Insightful Analytics</Title>
          <Text size="lg">
            Discover how these analytics can help you see where you're
            excelling, where you can improve.
          </Text>
        </Stack>
      </Container>

      <Container size="lg" mt={40}>
        <Flex justify="center">
          <SegmentedControl
            size="xs"
            w={matches ? "100%" : "auto"}
            orientation={matches ? "vertical" : "horizontal"}
            value={value}
            onChange={(val) => setValue(val as Analytics)}
            data={[
              {
                label: analytics["weeklyInsights"].title,
                value: "weeklyInsights"
              },
              {
                label: analytics["topSolvedTags"].title,
                value: "topSolvedTags"
              },
              {
                label: analytics["timeDistribution"].title,
                value: "timeDistribution"
              },
              {
                label: analytics["averageDifficultyAnalysis"].title,
                value: "averageDifficultyAnalysis"
              }
            ]}
          />
        </Flex>

        <Paper p="xl" mt="xl">
          <Grid gutter={{ base: 32, md: 64 }} align="center">
            <Grid.Col span={{ base: 12, md: 6 }}>
              {analytics[value].content}
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              {analytics[value].chart}
            </Grid.Col>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

const analytics = {
  weeklyInsights: {
    title: "Weekly Activity Insights",
    content: (
      <Stack>
        <Box>
          <Title order={3}>Weekly Activity Insights</Title>
          <Text size="xl" mt="xs">
            Explore Your Coding Consistency
          </Text>
        </Box>
        <Text>
          The peaks represent your most active weeks. Consistency is the secret
          — it helps you steadily progress over time. Set achievable weekly
          goals, maintaining a consistent pace on your coding journey.
        </Text>
        <Text>
          Checking this chart regularly will push you to maintain your
          consistency and adapt your routine, contributing to continual
          improvement.
        </Text>
      </Stack>
    ),
    chart: (
      <WeeklySolvedChart
        data={[
          {
            weekStartDate: "2022-06-11T00:00:00.000Z",
            solved: 6,
            averageDifficulty: 916,
            weekNumber: 1,
            label: "W1"
          },
          {
            label: "W2",
            weekNumber: 2,
            weekStartDate: "2022-06-25T00:00:00.000Z",
            solved: 0,
            averageDifficulty: 0
          },
          {
            label: "W3",
            weekNumber: 3,
            weekStartDate: "2022-07-02T00:00:00.000Z",
            solved: 0,
            averageDifficulty: 0
          },
          {
            weekStartDate: "2022-07-02T00:00:00.000Z",
            solved: 3,
            averageDifficulty: 1000,
            weekNumber: 4,
            label: "W4"
          },
          {
            weekStartDate: "2022-07-09T00:00:00.000Z",
            solved: 11,
            averageDifficulty: 1018,
            weekNumber: 5,
            label: "W5"
          },
          {
            label: "W6",
            weekNumber: 6,
            weekStartDate: "2022-07-23T00:00:00.000Z",
            solved: 0,
            averageDifficulty: 0
          },
          {
            label: "W7",
            weekNumber: 7,
            weekStartDate: "2022-07-30T00:00:00.000Z",
            solved: 0,
            averageDifficulty: 0
          },
          {
            weekStartDate: "2022-07-30T00:00:00.000Z",
            solved: 6,
            averageDifficulty: 1400,
            weekNumber: 8,
            label: "W8"
          },
          {
            label: "W9",
            weekNumber: 9,
            weekStartDate: "2022-08-13T00:00:00.000Z",
            solved: 0,
            averageDifficulty: 0
          },
          {
            label: "W10",
            weekNumber: 10,
            weekStartDate: "2022-08-20T00:00:00.000Z",
            solved: 0,
            averageDifficulty: 0
          },
          {
            label: "W11",
            weekNumber: 11,
            weekStartDate: "2022-08-27T00:00:00.000Z",
            solved: 0,
            averageDifficulty: 0
          },
          {
            label: "W12",
            weekNumber: 12,
            weekStartDate: "2022-09-03T00:00:00.000Z",
            solved: 0,
            averageDifficulty: 0
          },
          {
            weekStartDate: "2022-09-03T00:00:00.000Z",
            solved: 3,
            averageDifficulty: 800,
            weekNumber: 13,
            label: "W13"
          }
        ]}
      />
    )
  },
  topSolvedTags: {
    title: "Top Solved Tags",
    content: (
      <Stack>
        <Box>
          <Title order={3}>Top Solved Tags</Title>
          <Text size="xl" mt="xs">
            Discover Your Strength and Weakness
          </Text>
        </Box>
        <Text>
          Recognizing your strengths provides a psychological lift, motivating
          you to take on more challenges with a belief in your abilities. These
          insights can be your secret weapon for leveling up your coding skills.
        </Text>

        <Text>
          It's also about spotting areas that might need a bit more attention.
          You can also use the information to strategically target and improve
          upon your weaknesses.
        </Text>
      </Stack>
    ),
    chart: (
      <TopSolvedTagsChart
        data={[
          {
            tag: "binary search",
            count: 2
          },
          {
            tag: "bitmasks",
            count: 1
          },
          {
            tag: "brute force",
            count: 8
          },
          {
            tag: "constructive algorithms",
            count: 4
          },
          {
            tag: "data structures",
            count: 6
          },
          {
            tag: "dp",
            count: 1
          },
          {
            tag: "greedy",
            count: 14
          },
          {
            tag: "implementation",
            count: 13
          },
          {
            tag: "math",
            count: 5
          },
          {
            tag: "number theory",
            count: 1
          },
          {
            tag: "sortings",
            count: 3
          },
          {
            tag: "strings",
            count: 3
          },
          {
            tag: "two pointers",
            count: 1
          }
        ]}
      />
    )
  },
  timeDistribution: {
    title: "Time Spent by Tag",
    content: (
      <Stack>
        <Box>
          <Title order={3}>Time Distribution by Tag</Title>
          <Text size="xl" mt="xs">
            Mastering Time Management
          </Text>
        </Box>
        <Text>
          Witnessing the distribution of your time across different tags is like
          acknowledging the effort you invested in each category. This
          acknowledgment boosts your sense of commitment and dedication.
        </Text>
        <Text>
          The visual breakdown of time spent on various tags can also act as a
          compass for balancing your focus. It encourages you to explore a
          diverse set of problems with different techniques.
        </Text>
      </Stack>
    ),
    chart: (
      <TimeSpentChart
        data={[
          {
            tag: "bitmasks",
            sum: 10
          },
          {
            tag: "strings",
            sum: 17
          },
          {
            tag: "dp",
            sum: 30
          },
          {
            tag: "two pointers",
            sum: 46
          },
          {
            tag: "constructive algorithms",
            sum: 68
          },
          {
            tag: "binary search",
            sum: 76
          },
          {
            tag: "number theory",
            sum: 80
          },
          {
            tag: "data structures",
            sum: 80
          },
          {
            tag: "implementation",
            sum: 133
          },
          {
            tag: "math",
            sum: 135
          },
          {
            tag: "brute force",
            sum: 144
          },
          {
            tag: "greedy",
            sum: 279
          }
        ]}
      />
    )
  },
  averageDifficultyAnalysis: {
    title: "Average Difficulty Analysis",
    content: (
      <Stack>
        <Box>
          <Title order={3}>Average Difficulty Analysis</Title>
          <Text size="xl" mt="xs">
            Navigating the Challenge Spectrum
          </Text>
        </Box>
        <Text>
          Explore the average difficulty level of problems you are solving. The
          upward trend in this chart over time becomes a powerful indicator of
          personal growth. It will push you to take on increasingly challenging
          tasks than previous week.
        </Text>
        <Text>
          Remember, you're not just learning for yourself, bring your friends,
          create a group. The competition will push you to solve more challenges
          problems and improve faster.
        </Text>
      </Stack>
    ),
    chart: (
      <AvgDifficultyChart
        data={[
          {
            weekStartDate: "2022-06-18T00:00:00.000Z",
            solved: 6,
            averageDifficulty: 800,
            weekNumber: 1,
            label: "W1"
          },
          {
            label: "W2",
            weekNumber: 2,
            weekStartDate: "2022-06-25T00:00:00.000Z",
            solved: 4,
            averageDifficulty: 900
          },
          {
            label: "W3",
            weekNumber: 3,
            weekStartDate: "2022-07-02T00:00:00.000Z",
            solved: 8,
            averageDifficulty: 1000
          },
          {
            weekStartDate: "2022-07-02T00:00:00.000Z",
            solved: 3,
            averageDifficulty: 850,
            weekNumber: 4,
            label: "W4"
          },
          {
            weekStartDate: "2022-07-09T00:00:00.000Z",
            solved: 11,
            averageDifficulty: 1300,
            weekNumber: 2,
            label: "W5"
          },
          {
            label: "W6",
            weekNumber: 6,
            weekStartDate: "2022-07-23T00:00:00.000Z",
            solved: 5,
            averageDifficulty: 1100
          },
          {
            label: "W7",
            weekNumber: 7,
            weekStartDate: "2022-07-30T00:00:00.000Z",
            solved: 3,
            averageDifficulty: 1200
          },
          {
            weekStartDate: "2022-07-30T00:00:00.000Z",
            solved: 6,
            averageDifficulty: 1250,
            weekNumber: 8,
            label: "W8"
          },
          {
            label: "W9",
            weekNumber: 9,
            weekStartDate: "2022-08-13T00:00:00.000Z",
            solved: 10,
            averageDifficulty: 1300
          },
          {
            label: "W10",
            weekNumber: 10,
            weekStartDate: "2022-08-20T00:00:00.000Z",
            solved: 1,
            averageDifficulty: 1500
          }
        ]}
      />
    )
  }
} as const;
