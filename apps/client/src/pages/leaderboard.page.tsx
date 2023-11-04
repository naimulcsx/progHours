import { IconInfoCircle } from "@tabler/icons-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

import {
  Box,
  Flex,
  Group,
  Loader,
  Select,
  Title,
  Tooltip,
  Transition
} from "@mantine/core";

import { LeaderboardType, useLeaderboard } from "@proghours/data-access";

import { LeaderboardDataTable } from "~/modules/leaderboard/components/table";
import { TopPerformers } from "~/modules/leaderboard/components/top-performers/TopPerformers";

export default function LeaderboardPage() {
  const [type, setType] = useState<LeaderboardType>("full");
  const { data, isFetching } = useLeaderboard({ type });
  const topUsers = data?.slice(0, 3);
  return (
    <>
      <Helmet>
        <title>Leaderboard - progHours</title>
      </Helmet>
      <Group justify="space-between">
        <Group style={{ alignItems: "center" }}>
          <Flex align="center" gap="xs">
            <Title order={4}>Leaderboard</Title>
            <Tooltip label="Latest data may experience a delay of up to 5 minutes.">
              <IconInfoCircle size={22} />
            </Tooltip>
          </Flex>
          <Transition mounted={isFetching} transition="fade" duration={500}>
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
    </>
  );
}
