import { useParams } from "react-router-dom";

import { Box, Flex, Paper, Select, SimpleGrid, Title } from "@mantine/core";

import { useUserProfile } from "@proghours/data-access";

import { AvgDifficultyChart } from "~/modules/dashboard/overview/components/charts/AvgDifficultyChart";
import { TimeSpentChart } from "~/modules/dashboard/overview/components/charts/TimeSpentChart";
import { TopSolvedTagsChart } from "~/modules/dashboard/overview/components/charts/TopSolvedTagsChart";
import { WeeklySolvedChart } from "~/modules/dashboard/overview/components/charts/WeeklySolvedChart";

export function OverviewTab() {
  const { username } = useParams();

  // get user profiles
  const { data } = useUserProfile({
    username: username!,
    config: { enabled: !!username }
  });

  return (
    <Box mt="lg">
      <Flex align="center" justify="space-between">
        <Title order={4}>Overview</Title>
        <Select
          size="xs"
          // value={type}
          withCheckIcon={false}
          defaultValue="full"
          // onChange={(type) => {}}
          data={[
            { label: "All time", value: "full" },
            { label: "Current week", value: "currentWeek" },
            { label: "Last Week", value: "lastWeek" }
          ]}
        />
      </Flex>
      {data && (
        <SimpleGrid mt="md" cols={2}>
          <Paper p="lg">
            <WeeklySolvedChart data={data.weeklyStatistics} />
          </Paper>
          <Paper p="lg">
            <TopSolvedTagsChart data={data.solveCountByTags} />
          </Paper>
          <Paper p="lg">
            <TimeSpentChart data={data.solveTimeByTags} />
          </Paper>
          <Paper p="lg">
            <AvgDifficultyChart data={data.weeklyStatistics} />
          </Paper>
        </SimpleGrid>
      )}
    </Box>
  );
}
