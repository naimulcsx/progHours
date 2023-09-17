import { IconInfoCircle } from "@tabler/icons-react";
import { AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";

import {
  Group,
  Loader,
  Paper,
  SimpleGrid,
  Title,
  Tooltip,
  Transition
} from "@mantine/core";

import { useActiveProfile } from "@proghours/data-access";

import { IconEnergy, IconFlag, IconPoints, IconTime } from "~/assets/icons";
import { DashboardLayout } from "~/modules/common/components/DashboardLayout";
import { FadeInTransition } from "~/modules/common/components/FadeInTransition";
import { formatSolveTime } from "~/modules/common/utils/formatSolveTime";
import { StatCard } from "~/modules/dashboard/overview/components/StatCard";
import { AvgDifficultyChart } from "~/modules/dashboard/overview/components/charts/AvgDifficultyChart";
import { TimeSpentChart } from "~/modules/dashboard/overview/components/charts/TimeSpentChart";
import { TopSolvedTagsChart } from "~/modules/dashboard/overview/components/charts/TopSolvedTagsChart";
import { WeeklySolvedChart } from "~/modules/dashboard/overview/components/charts/WeeklySolvedChart";

export default function OverviewPage() {
  const { data, isFetching } = useActiveProfile();
  return (
    <DashboardLayout>
      <Helmet>
        <title>Overview - progHours</title>
      </Helmet>
      <Group gap="xs">
        <Title order={3}>Overview </Title>
        <Tooltip label="Latest data may experience a delay of up to 5 minutes.">
          <IconInfoCircle size={22} />
        </Tooltip>
        <Transition mounted={isFetching} transition="fade" duration={800}>
          {(styles) => (
            <div style={{ ...styles, display: "flex", alignItems: "center" }}>
              <Loader size="xs" />
            </div>
          )}
        </Transition>
      </Group>

      <AnimatePresence>
        {!isFetching && data && (
          <FadeInTransition>
            <SimpleGrid mt="lg" cols={4}>
              <StatCard
                icon={<IconPoints width={40} height={40} />}
                label="Points"
                value="778.22"
              />
              <StatCard
                icon={<IconFlag width={40} height={40} />}
                label="Problem Solved"
                value={data.totalSolved}
              />
              <StatCard
                icon={<IconTime width={40} height={40} />}
                label="Solve Time"
                value={formatSolveTime(data.totalSolveTime)}
              />
              <StatCard
                icon={<IconEnergy width={40} height={40} />}
                label="Average Difficulty"
                value={(
                  data.totalDifficulty / data.totalSolvedWithDifficulty
                ).toFixed(2)}
              />
            </SimpleGrid>
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
          </FadeInTransition>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
