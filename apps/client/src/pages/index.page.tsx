import {
  Box,
  Container,
  Group,
  Loader,
  Select,
  Title,
  Tooltip,
  Transition
} from "@mantine/core";
import { LeaderboardType, useLeaderboard } from "@proghours/data-access";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { FadeInTransition } from "~/components/common/transition/FadeInTransition";
import { IconInfoCircle } from "~/assets/icons";
import { LeaderboardDataTable } from "~/components/core/leaderboard/table";
import { TopPerformers } from "~/components/core/leaderboard/TopPerformers";
import { Layout } from "~/components/common/Layout";

export default function HomePage() {
  const [type, setType] = useState<LeaderboardType>("full");
  const { data, isFetching } = useLeaderboard({ type });
  const topUsers = data?.slice(0, 3);
  console.log("rendered");
  return (
    <Layout>
      <Container size="lg">
        <Group position="apart">
          <Group sx={{ alignItems: "center" }}>
            <Title order={3}>
              Leaderboard{" "}
              <Tooltip label="Latest data may experience a delay of up to 5 minutes.">
                <Box component="span" ml="xs">
                  <IconInfoCircle width={16} height={16} />
                </Box>
              </Tooltip>
            </Title>
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
            defaultValue="full"
            value={type}
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
            <FadeInTransition mt="xl">
              {topUsers && topUsers.length === 3 && (
                <TopPerformers topUsers={topUsers} />
              )}
              <LeaderboardDataTable data={data} />
            </FadeInTransition>
          )}
        </AnimatePresence>
      </Container>
    </Layout>
  );
}
