import { useQuery } from "react-query"
import { useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { Grid, Stack, Tabs, Box, Paper, Text, Table, Container } from "@mantine/core"
import { IconPhoto, IconMessageCircle, IconSettings, IconUser } from "@tabler/icons"
import { motion } from "framer-motion"
import { Helmet } from "react-helmet-async"
import moment from "moment"
import { getSubmissionsByUsername } from "~/api/submissions"
import { getUserByUsername } from "~/api/user"
import { getStatsByUsername } from "~/api/leaderboard"
import { getSubmissionStats } from "~/utils/getSubmissionsStats"
import { Navbar } from "~/components/organisms"
import ProfileStats from "~/components/organisms/profile-stats/ProfileStats"
import {
  WeeklySolvedChart,
  AverageDifficultyChart,
  MostSolvedCategoriesChart,
  TimeSpentChart,
  ProfileBanner,
  ProfileMedals,
} from "~/components/molecules"
import SubmissionsListProfile from "~/components/organisms/submissions-list/SubmissionsListProfile"

import { Statistics } from "~/components/pages/dashboard/Dashboard"

interface User {
  name: string
  username: string
  email: string
  id: number
  memberSince: string
  department: string
  mobile: string
  batch: number
  role: string
}

export interface UserProfileTemplateProps {
  user: any
  statistics?: Statistics
  isLoading: boolean
  submissions: any[]
}

export default function UserProfileTemplate({
  user,
  statistics,
  submissions,
  isLoading,
}: UserProfileTemplateProps) {
  return (
    <Box>
      <Navbar />
      <Container size="xl">
        {!isLoading && user && statistics && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.35 }}
          >
            <Box>
              <Helmet>
                <title>{user.name}</title>
              </Helmet>
              <ProfileBanner user={user} />
              <Tabs defaultValue="about">
                <Tabs.List>
                  <Tabs.Tab value="about" icon={<IconUser size={16} />}>
                    ABOUT
                  </Tabs.Tab>
                  <Tabs.Tab value="stats" icon={<IconPhoto size={16} />}>
                    STATS
                  </Tabs.Tab>
                  <Tabs.Tab value="medals" icon={<IconMessageCircle size={16} />}>
                    MEDALS
                  </Tabs.Tab>
                  <Tabs.Tab value="activity" icon={<IconSettings size={16} />}>
                    ACTIVITY
                  </Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="stats" py="sm">
                  <Stack>
                    <Grid>
                      <Grid.Col md={6}>
                        <WeeklySolvedChart data={statistics.frequency} />
                      </Grid.Col>
                      <Grid.Col md={6}>
                        <MostSolvedCategoriesChart data={statistics.tagsFrequency} />
                      </Grid.Col>
                      <Grid.Col md={6}>
                        <TimeSpentChart data={statistics.tagsSolveTime} />
                      </Grid.Col>
                      <Grid.Col md={6}>
                        <AverageDifficultyChart avgDifficulty={statistics.avgDifficulty} />
                      </Grid.Col>
                    </Grid>
                  </Stack>
                </Tabs.Panel>
                <Tabs.Panel value="about" py="sm">
                  <Box>
                    <ProfileStats statistics={statistics} />
                  </Box>
                  <Paper mt="md">
                    <Table
                      verticalSpacing="sm"
                      horizontalSpacing="xl"
                      sx={(theme) => ({
                        borderRadius: theme.radius.md,
                        overflow: "clip",
                      })}
                    >
                      <thead>
                        <tr>
                          <th style={{ width: 200 }}>Full Name</th>
                          <th>
                            <Text sx={{ fontWeight: 400 }}>{user.name}</Text>
                          </th>
                        </tr>
                        <tr>
                          <th style={{ width: 200 }}>University ID</th>
                          <th>
                            <Text sx={{ fontWeight: 400 }}>{user.username.toUpperCase()}</Text>
                          </th>
                        </tr>
                        <tr>
                          <th style={{ width: 200 }}>Department</th>
                          <th>
                            <Text sx={{ fontWeight: 400 }}>{user.department ?? "—"}</Text>
                          </th>
                        </tr>
                        <tr>
                          <th style={{ width: 200 }}>Batch</th>
                          <th>
                            <Text sx={{ fontWeight: 400 }}>{user.batch ?? "—"}</Text>
                          </th>
                        </tr>
                        <tr>
                          <th style={{ width: 200 }}>Email</th>
                          <th>
                            <Text sx={{ fontWeight: 400 }}>{user.email}</Text>
                          </th>
                        </tr>
                        <tr>
                          <th style={{ width: 200, borderBottom: 0 }}>Member Since</th>
                          <th style={{ borderBottom: 0 }}>
                            <Text sx={{ fontWeight: 400 }}>
                              {moment(user.memberSince).fromNow()}
                            </Text>
                          </th>
                        </tr>
                      </thead>
                    </Table>
                  </Paper>
                </Tabs.Panel>
                <Tabs.Panel value="medals" pt="sm">
                  <ProfileMedals userStats={statistics} />
                </Tabs.Panel>
                <Tabs.Panel value="activity" pt="sm">
                  <SubmissionsListProfile submissions={submissions} />
                </Tabs.Panel>
              </Tabs>
            </Box>
          </motion.div>
        )}
      </Container>
    </Box>
  )
}
