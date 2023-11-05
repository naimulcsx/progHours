import { useState } from "react";
import { Helmet } from "react-helmet-async";

import { Box, Group, Loader, Select, Title, Transition } from "@mantine/core";

import { LeaderboardType, useLeaderboard } from "@proghours/data-access";

import { useUser } from "~/modules/auth/hooks/useUser";
import { LeaderboardDataTable } from "~/modules/leaderboard/components/table";
import { TopPerformers } from "~/modules/leaderboard/components/top-performers/TopPerformers";

export default function LeaderboardPage() {
  const { user } = useUser();
  const [type, setType] = useState<LeaderboardType>("full");
  const { data, isFetching } = useLeaderboard({ type });
  const topUsers = data?.slice(0, 3);
  return (
    <Box px={user ? "md" : 0} mx={{ base: -16, lg: 0 }} pb={66}>
      <Helmet>
        <title>Leaderboard - progHours</title>
      </Helmet>
      <Group justify="space-between">
        <Group style={{ alignItems: "center" }}>
          <Title order={4}>Leaderboard</Title>
          <Transition mounted={isFetching} transition="fade" duration={800}>
            {(styles) => (
              <div style={{ ...styles, display: "flex", alignItems: "center" }}>
                <Loader size="xs" />
              </div>
            )}
          </Transition>
        </Group>
        <Select
          size="xs"
          value={type}
          withCheckIcon={false}
          defaultValue="full"
          onChange={(type) => {
            if (type) setType(type as LeaderboardType);
          }}
          maw={120}
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
