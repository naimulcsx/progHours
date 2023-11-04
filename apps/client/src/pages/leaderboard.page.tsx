import { useState } from "react";
import { Helmet } from "react-helmet-async";

import { Box, Group, Select, Title, Transition } from "@mantine/core";

import { LeaderboardType, useLeaderboard } from "@proghours/data-access";

import { LeaderboardDataTable } from "~/modules/leaderboard/components/table";
import { TopPerformers } from "~/modules/leaderboard/components/top-performers/TopPerformers";

export default function LeaderboardPage() {
  const [type, setType] = useState<LeaderboardType>("full");
  const { data, isFetching } = useLeaderboard({ type });
  const topUsers = data?.slice(0, 3);
  return (
    <Box mx={{ base: -16, sm: 0 }}>
      <Helmet>
        <title>Leaderboard - progHours</title>
      </Helmet>
      <Group justify="space-between">
        <Group style={{ alignItems: "center" }}>
          <Title order={4}>Leaderboard</Title>
        </Group>
        <Select
          size="xs"
          value={type}
          withCheckIcon={false}
          defaultValue="full"
          onChange={(type) => {
            if (type) setType(type as LeaderboardType);
          }}
          data={[
            { label: "All time", value: "full" },
            { label: "Current week", value: "currentWeek" },
            { label: "Last Week", value: "lastWeek" }
          ]}
        />
      </Group>
      <Transition
        mounted={!isFetching}
        transition="fade"
        duration={500}
        exitDuration={500}
      >
        {(styles) => (
          <Box mt="lg" style={styles}>
            {topUsers && topUsers.length === 3 && (
              <TopPerformers topUsers={topUsers} />
            )}
            {data && <LeaderboardDataTable data={data} />}
          </Box>
        )}
      </Transition>
    </Box>
  );
}
