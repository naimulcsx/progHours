import { IconAt, IconBuildingCommunity } from "@tabler/icons-react";
import { AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";

import {
  Box,
  Container,
  Flex,
  Paper,
  SimpleGrid,
  Tabs,
  Text,
  Title
} from "@mantine/core";

import {
  UserProfileResponse,
  useUserHandles,
  useUserProfile
} from "@proghours/data-access";

import {
  Icon100Solved,
  Icon250Solved,
  Icon500Solved,
  Icon750Solved,
  Icon1000Solved,
  IconEnergy,
  IconFlag,
  IconPoints
} from "~/assets/icons";
import { Avatar } from "~/modules/common/components/Avatar";
import { FadeInTransition } from "~/modules/common/components/FadeInTransition";
import { Layout } from "~/modules/common/components/Layout";
import { AvgDifficultyChart } from "~/modules/dashboard/overview/components/charts/AvgDifficultyChart";
import { TimeSpentChart } from "~/modules/dashboard/overview/components/charts/TimeSpentChart";
import { TopSolvedTagsChart } from "~/modules/dashboard/overview/components/charts/TopSolvedTagsChart";
import { WeeklySolvedChart } from "~/modules/dashboard/overview/components/charts/WeeklySolvedChart";

export function UserProfilePage() {
  const { username } = useParams();
  const { data } = useUserProfile({
    username: username!,
    config: { enabled: !!username }
  });
  const { data: userHandles } = useUserHandles({
    username: username!,
    config: { enabled: !!username }
  });
  console.log(userHandles);
  return (
    <Layout withContainer={false}>
      <AnimatePresence>
        {data && (
          <FadeInTransition>
            <Box pt={40} pb={8}>
              <Container size="xl">
                <Box>
                  <Flex justify="space-between">
                    <Box>
                      <Flex gap="lg" py="md">
                        <Avatar fullName={data.fullName} size="xl" />
                        <Box>
                          <Title order={2} mb={4}>
                            {data.fullName}
                          </Title>
                          <Flex align="center" gap={4}>
                            <IconAt size={18} stroke={1.5} />
                            <Text>{data.userName.toUpperCase()}</Text>
                          </Flex>

                          <Flex align="center" gap={4}>
                            <IconBuildingCommunity size={18} stroke={1.5} />
                            <Text>
                              International Islamic University Chittagong
                            </Text>
                          </Flex>

                          <Flex gap="xs" mt="sm">
                            <Icon100Solved height={40} width={40} />
                            <Icon250Solved height={40} width={40} />
                            <Icon500Solved height={40} width={40} />
                            <Icon750Solved height={40} width={40} />
                            <Icon1000Solved height={40} width={40} />
                          </Flex>
                        </Box>
                      </Flex>
                    </Box>
                    <HeaderStats data={data} />
                  </Flex>
                </Box>
              </Container>
              <Container size="xl">
                <Tabs defaultValue="statistics">
                  <Tabs.List>
                    <Tabs.Tab value="statistics">Statistics</Tabs.Tab>
                    <Tabs.Tab value="solved">Solved</Tabs.Tab>
                    <Tabs.Tab value="medals">Medals</Tabs.Tab>
                  </Tabs.List>
                  <Tabs.Panel value="statistics">
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
                  </Tabs.Panel>
                  <Tabs.Panel value="medals">Test</Tabs.Panel>
                </Tabs>
              </Container>
            </Box>
          </FadeInTransition>
        )}
      </AnimatePresence>
    </Layout>
  );
}

const stats = [
  {
    icon: <IconFlag height={48} />,
    label: "Total Solved",
    key: "totalSolved"
  },
  {
    icon: <IconPoints height={48} />,
    label: "Points",
    key: "points"
  },
  {
    icon: <IconEnergy height={48} />,
    label: "Avg. Difficulty",
    key: "averageDifficulty"
  }
] as const;

function HeaderStats({ data }: { data: UserProfileResponse }) {
  return (
    <Flex>
      {stats.map((stat) => {
        return (
          <Box
            p="lg"
            style={{
              textAlign: "center"
            }}
          >
            {stat.icon}
            <Text my={4} size="xs">
              {stat.label}
            </Text>
            <Title order={3} fw={500}>
              {data[stat.key]}
            </Title>
          </Box>
        );
      })}
    </Flex>
  );
}
