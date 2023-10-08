import { AnimatePresence } from "framer-motion";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import {
  Badge,
  Box,
  Container,
  Grid,
  Group,
  Paper,
  Stack,
  Tabs,
  Text,
  Title
} from "@mantine/core";

import { useUserHandles, useUserProfile } from "@proghours/data-access";

import { FadeInTransition } from "~/modules/common/components/FadeInTransition";
import { Layout } from "~/modules/common/components/Layout";
import { AvgDifficultyChart } from "~/modules/dashboard/overview/components/charts/AvgDifficultyChart";
import { TimeSpentChart } from "~/modules/dashboard/overview/components/charts/TimeSpentChart";
import { TopSolvedTagsChart } from "~/modules/dashboard/overview/components/charts/TopSolvedTagsChart";
import { WeeklySolvedChart } from "~/modules/dashboard/overview/components/charts/WeeklySolvedChart";
import { ProfileHeader } from "~/modules/profile/components/ProfileHeader";

export function UserProfilePage() {
  const navigate = useNavigate();
  const { username, tabValue } = useParams();

  // get user profiles
  const { data } = useUserProfile({
    username: username!,
    config: { enabled: !!username }
  });

  // user handles
  const { data: userHandles } = useUserHandles({
    username: username!,
    config: { enabled: !!username }
  });

  console.log(userHandles);
  const [searchParams] = useSearchParams();
  console.log(searchParams.get("date"));
  return (
    <Layout withContainer={false}>
      <AnimatePresence>
        {data && (
          <FadeInTransition>
            <Box pt={40} pb={8}>
              <ProfileHeader />
              <Container size="xl">
                <Tabs
                  value={tabValue ?? "profile"}
                  onChange={(value) => {
                    if (value !== "profile")
                      navigate(`/@/${username}/${value}`);
                    else navigate(`/@/${username}`);
                  }}
                >
                  <Tabs.List>
                    <Tabs.Tab value="profile">Profile</Tabs.Tab>
                    <Tabs.Tab value="submissions">Submissions</Tabs.Tab>
                    <Tabs.Tab value="medals">Medals</Tabs.Tab>
                  </Tabs.List>
                  <Tabs.Panel value="profile">
                    <Grid mt="md" gutter="xl" style={{ overflow: "initial" }}>
                      <Grid.Col span={8}>
                        <Stack gap="md">
                          {data?.metaData?.about && (
                            <>
                              <Title order={3}>About</Title>
                              <Stack gap="xs">
                                {data.metaData.about
                                  .split("\n")
                                  .map((part, i) => (
                                    <Text key={i}>{part}</Text>
                                  ))}
                              </Stack>
                            </>
                          )}
                          <Title order={3}>Overview</Title>
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
                        </Stack>
                      </Grid.Col>
                      <Grid.Col span={4}>
                        <Stack style={{ position: "sticky", top: 80 }}>
                          <Title order={3}>Skills</Title>
                          <Group gap="xs">
                            {data?.metaData?.skills ? (
                              data.metaData.skills.map((skill) => (
                                <Badge size="md" key={skill}>
                                  {skill}
                                </Badge>
                              ))
                            ) : (
                              <Text>—</Text>
                            )}
                          </Group>
                          <Title order={3}>Education</Title>
                          <Text>
                            International Islamic University Chittagong
                          </Text>
                        </Stack>
                      </Grid.Col>
                    </Grid>
                  </Tabs.Panel>
                  <Tabs.Panel value="activity">Activity</Tabs.Panel>
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
