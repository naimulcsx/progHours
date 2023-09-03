import { Flex, Group, Loader, Select, Title, Tooltip } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FadeInTransition } from "~/modules/common/components/FadeInTransition";
import { Layout } from "~/modules/common/components/Layout";
import { LeaderboardType, useLeaderboard } from "@proghours/data-access";
import { LeaderboardDataTable } from "~/modules/leaderboard/components/table";
import { TopPerformers } from "~/modules/leaderboard/components/top-performers/TopPerformers";

export default function HomePage() {
  const [type, setType] = useState<LeaderboardType>("full");
  const { data, isFetching } = useLeaderboard({ type });
  const topUsers = data?.slice(0, 3);
  return (
    <Layout>
      <Group justify="space-between">
        <Group style={{ alignItems: "center" }}>
          <Flex align="center" gap="xs">
            <Title order={3}>Leaderboard </Title>
            <Tooltip label="Latest data may experience a delay of up to 5 minutes.">
              <IconInfoCircle width={18} height={18} />
            </Tooltip>
          </Flex>
          {isFetching && <Loader size="xs" />}
        </Group>
        <Select
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
      <AnimatePresence>
        {!isFetching && data && (
          <FadeInTransition mt="md">
            {topUsers && topUsers.length === 3 && (
              <TopPerformers topUsers={topUsers} />
            )}
            <LeaderboardDataTable data={data} />
          </FadeInTransition>
        )}
      </AnimatePresence>
    </Layout>
  );
}
