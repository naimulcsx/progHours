import { useQuery } from "react-query"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { Grid, Stack, Tabs, Box, Paper, Text, Table, Container } from "@mantine/core"
import { IconPhoto, IconMessageCircle, IconSettings, IconUser } from "@tabler/icons"
import { motion } from "framer-motion"
import { Helmet } from "react-helmet-async"
import moment from "moment"

import { getSubmissionsByUsername } from "~/api/submissions"
import { getUserByUsername } from "~/api/user"
import { getStatsByUsername } from "~/api/leaderboard"
import { Frequency, getSubmissionStats } from "~/utils/getSubmissionsStats"
import UserCard from "~/components/profile/UserCard"
import Navbar from "~/components/navbar"
import UserStats from "~/components/stats/UserStats"
import TagsFreqChart from "~/components/stats/visualizations/TagsFreqChart"
import WeeklySolvedChart from "~/components/stats/visualizations/WeeklySolvedChart"
import MedalsTab from "~/components/profile/MedalsTab"
import UserSubmissionTable from "~/components/profile/UserSubmission"
import TagsSolveTimeChart from "~/components/stats/visualizations/TagsSolveTimeChart"
import AvgDifficultyChart from "~/components/stats/visualizations/AvgDifficultyChart"
import NotFoundPage from "../404"

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

export default function Profile() {
  const { username } = useParams()

  /**
   * Get statistics
   */
  let [user, setUser] = useState<User | null>(null)
  let [submissions, setSubmissions] = useState([])

  /**
   * Get submissions
   */
  let [frequency, setFrequency] = useState<Frequency | null>(null)
  let [avgDifficulty, setAvgDifficulty] = useState<any>(null)

  const { data, isLoading } = useQuery(
    `submissions/${username}`,
    () => getSubmissionsByUsername(username ? username : "-1"),
    {
      onSuccess: (res) => {
        const { frequency, avgDifficulty } = getSubmissionStats(res.body.submissions)
        setAvgDifficulty(avgDifficulty)
        setFrequency(frequency)
        setSubmissions(res.body.submissions)
      },
    }
  )

  const [notFound, setNotFound] = useState(false)
  useQuery(`users/${username}`, () => getUserByUsername(username ? username : "-1"), {
    retry: 1,
    onSuccess: (res) => {
      setUser(res.body.user)
    },
    onError: () => {
      setNotFound(true)
    },
  })

  const [userStats, setUserStats] = useState<any>(null)

  useQuery(`stats/${username}`, () => getStatsByUsername(username || ""), {
    onSuccess: (res) => setUserStats(res.body.stats),
  })

  return (
    <Box>
      <Navbar />
      {notFound ? (
        <Box pt="xl">
          <NotFoundPage />
        </Box>
      ) : (
        <Container size="xl">
          {user && userStats && frequency && data && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25, duration: 0.35 }}>
              <Box>
                <Helmet>
                  <title>{user?.name}</title>
                </Helmet>
                <UserCard user={user} />
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
                    <Tabs.Tab value="activities" icon={<IconSettings size={16} />}>
                      ACTIVITY
                    </Tabs.Tab>
                  </Tabs.List>
                  <Tabs.Panel value="stats" py="sm">
                    <Stack>
                      <Grid>
                        <Grid.Col md={6}>
                          <WeeklySolvedChart data={frequency} />
                        </Grid.Col>
                        <Grid.Col md={6}>
                          <TagsFreqChart data={userStats["tagsFrequency"]} />
                        </Grid.Col>
                        <Grid.Col md={6}>
                          <TagsSolveTimeChart data={userStats["tagsSolveTime"]} />
                        </Grid.Col>
                        <Grid.Col md={6}>
                          <AvgDifficultyChart avgDifficulty={avgDifficulty} />
                        </Grid.Col>
                      </Grid>
                    </Stack>
                  </Tabs.Panel>
                  <Tabs.Panel value="about" py="sm">
                    <Box>
                      <UserStats progress={userStats} />
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
                              <Text sx={{ fontWeight: 400 }}>{moment(user.memberSince).fromNow()}</Text>
                            </th>
                          </tr>
                        </thead>
                      </Table>
                    </Paper>
                  </Tabs.Panel>
                  <Tabs.Panel value="medals" pt="sm">
                    <MedalsTab userStats={userStats} />
                  </Tabs.Panel>
                  <Tabs.Panel value="activity" pt="sm">
                    <UserSubmissionTable submissions={submissions} />
                  </Tabs.Panel>
                </Tabs>
              </Box>
            </motion.div>
          )}
        </Container>
      )}
    </Box>
  )
}
