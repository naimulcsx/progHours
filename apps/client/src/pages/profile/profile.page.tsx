import { HandleType } from "@prisma/client";
import {
  IconBrandGithub,
  IconEdit,
  IconExternalLink
} from "@tabler/icons-react";
import { AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
  Title
} from "@mantine/core";
import { modals } from "@mantine/modals";

import { useUserHandles, useUserProfile } from "@proghours/data-access";

import { CFIcon } from "~/assets/oj-icons";
import { useUser } from "~/modules/auth/hooks/useUser";
import { FadeInTransition } from "~/modules/common/components/FadeInTransition";
import { Layout } from "~/modules/common/components/Layout";
import { AvgDifficultyChart } from "~/modules/dashboard/overview/components/charts/AvgDifficultyChart";
import { TimeSpentChart } from "~/modules/dashboard/overview/components/charts/TimeSpentChart";
import { TopSolvedTagsChart } from "~/modules/dashboard/overview/components/charts/TopSolvedTagsChart";
import { WeeklySolvedChart } from "~/modules/dashboard/overview/components/charts/WeeklySolvedChart";
import { ProfileHeader } from "~/modules/profile/components/ProfileHeader";
import { SubmissionsTab } from "~/modules/profile/components/SubmissionsTab";
import { UpdateProfileForm } from "~/modules/profile/components/UpdateProfileForm";

export function UserProfilePage() {
  const navigate = useNavigate();

  const { user } = useUser();
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

  const ownProfile = user && data && user.username === data.userName;

  const openModal = () =>
    modals.open({
      size: "lg",
      title: "Update profile",
      children: <UpdateProfileForm />
    });

  const updateProfileButton = (
    <ActionIcon ml="xs" size="sm" onClick={openModal}>
      <IconEdit size={12} />
    </ActionIcon>
  );

  return (
    <Layout withContainer={false}>
      <AnimatePresence>
        {data && (
          <FadeInTransition>
            <Box py={40}>
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
                    <Tabs.Tab value="overview">Overview</Tabs.Tab>
                    <Tabs.Tab value="submissions">Submissions</Tabs.Tab>
                    <Tabs.Tab value="medals">Medals</Tabs.Tab>
                  </Tabs.List>

                  {/* profile tab  */}
                  <Tabs.Panel value="profile">
                    <Grid mt="md" gutter="xl" style={{ overflow: "initial" }}>
                      <Grid.Col span={8}>
                        <Stack gap="md">
                          <Title order={4}>
                            About
                            {ownProfile && updateProfileButton}
                          </Title>
                          <Stack gap="xs">
                            {data?.metaData?.about ? (
                              data.metaData.about
                                .split("\n")
                                .map((part, i) => <Text key={i}>{part}</Text>)
                            ) : (
                              <Text>&mdash;</Text>
                            )}
                          </Stack>
                        </Stack>
                      </Grid.Col>
                      <Grid.Col span={4}>
                        <Stack style={{ position: "sticky", top: 80 }}>
                          <Title order={4}>
                            Skills {ownProfile && updateProfileButton}
                          </Title>
                          <Group gap="xs">
                            {data?.metaData?.skills &&
                              data.metaData.skills.map((skill) => (
                                <Badge size="md" key={skill}>
                                  {skill}
                                </Badge>
                              ))}
                            {(!data?.metaData?.skills ||
                              data?.metaData?.skills?.length === 0) && (
                              <Text>&mdash;</Text>
                            )}
                          </Group>
                          <Title order={4}>Profiles</Title>
                          <SimpleGrid cols={2}>
                            {userHandles?.map(({ type, handle }) => {
                              const handleTypeIcon: Record<
                                HandleType,
                                ReactNode
                              > = {
                                CODEFORCES: <CFIcon height={24} width={24} />,
                                CODECHEF: (
                                  <IconBrandGithub height={24} width={24} />
                                ),
                                SPOJ: <IconBrandGithub />,
                                ATCODER: <IconBrandGithub />,
                                GITHUB: <IconBrandGithub />
                              };
                              return (
                                <Button
                                  key={type}
                                  component={Link}
                                  target="_blank"
                                  to={`https://codeforces.com/profile/${handle}`}
                                  variant="msu-secondary"
                                  leftSection={handleTypeIcon[type]}
                                  rightSection={<IconExternalLink size={16} />}
                                >
                                  {handle}
                                </Button>
                              );
                            })}
                            {userHandles?.length === 0 && <Text>&mdash;</Text>}
                          </SimpleGrid>

                          <Title order={4}>Education</Title>
                          <Flex align="center" gap={6}>
                            <Text>
                              {/* <IconBuildingCommunity size={20} /> */}
                            </Text>
                            <Text>&mdash; </Text>
                          </Flex>
                        </Stack>
                      </Grid.Col>
                    </Grid>
                  </Tabs.Panel>

                  {/* overview tab */}
                  <Tabs.Panel value="overview">
                    <Title mt="md" order={4}>
                      Overview
                    </Title>
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

                  {/* submissions tab */}
                  <Tabs.Panel value="submissions">
                    <SubmissionsTab />
                  </Tabs.Panel>

                  {/* medals tab */}
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
