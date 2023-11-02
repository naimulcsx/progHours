import { MetaFunction } from "@remix-run/node";
import { IconInfoCircle } from "@tabler/icons-react";
import { AnimatePresence } from "framer-motion";

import { useState } from "react";

import {
  Group,
  Flex,
  Title,
  Tooltip,
  Loader,
  Select,
  Transition,
  Container
} from "@mantine/core";

import { type LeaderboardType, useLeaderboard } from "@proghours/data-access";
import {
  FadeInTransition,
  TopPerformers,
  LeaderboardDataTable,
  Footer
} from "@proghours/ui";

export const meta: MetaFunction = () => ({
  title: "Leaderboard - progHours"
});

export default function LeaderboardPage() {
  const [type, setType] = useState<LeaderboardType>("full");
  const { data, isFetching } = useLeaderboard({
    type
  });

  const topUsers = data?.slice(0, 3);

  return (
    <>
      <Container size="xl" mt="lg">
        <Group justify="space-between">
          <Group style={{ alignItems: "center" }}>
            <Flex align="center" gap="xs">
              <Title order={3}>Leaderboard</Title>
              <Tooltip label="Latest data may experience a delay of up to 5 minutes.">
                <IconInfoCircle size={22} />
              </Tooltip>
            </Flex>
            <Transition mounted={isFetching} transition="fade" duration={800}>
              {(styles) => (
                <div
                  style={{ ...styles, display: "flex", alignItems: "center" }}
                >
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
        <AnimatePresence>
          {!isFetching && data && (
            <FadeInTransition mt="md">
              {topUsers && topUsers.length === 3 && (
                <TopPerformers topUsers={topUsers} />
              )}
              <LeaderboardDataTable data={data} />
              <Footer mt="xl" />
            </FadeInTransition>
          )}
        </AnimatePresence>
      </Container>
    </>
  );
}
