import { useNavigate } from "@remix-run/react";
import { IconInfoCircle } from "@tabler/icons-react";
import { AnimatePresence } from "framer-motion";

import { useEffect } from "react";

import {
  Container,
  Group,
  Loader,
  Paper,
  SimpleGrid,
  Title,
  Tooltip,
  Transition
} from "@mantine/core";
import { notifications } from "@mantine/notifications";

import { useActiveProfile } from "@proghours/data-access";
import {
  // AvgDifficultyChart,
  FadeInTransition,
  IconEnergy,
  IconFlag,
  IconPoints,
  IconTime,
  StatCard, // TimeSpentChart,
  // TopSolvedTagsChart,
  // WeeklySolvedChart,
  formatSolveTime,
  useUser
} from "@proghours/ui";

export default function OverviewPage() {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      notifications.show({
        id: "private_route",
        color: "red",
        title: "Error",
        message: "Unauthorized access"
      });
      navigate("/");
    }
  }, []);

  if (!user) return null;

  const { data, isFetching } = useActiveProfile();

  return (
    <>
      <Container size="xl" px={0}>
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
                {/* <Paper p="lg">
                  <WeeklySolvedChart data={data.weeklyStatistics} />
                </Paper>
                <Paper p="lg">
                  <TopSolvedTagsChart data={data.solveCountByTags} />
                </Paper>
                <Paper p="lg">
                  <TimeSpentChart data={data.solveTimeByTags} />
                </Paper> */}
                {/* <Paper p="lg">
                  <AvgDifficultyChart data={data.weeklyStatistics} />
                </Paper> */}
              </SimpleGrid>
            </FadeInTransition>
          )}
        </AnimatePresence>
      </Container>
    </>
  );
}
