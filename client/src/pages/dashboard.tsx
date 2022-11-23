import { useState } from "react"
import { Box, Grid, Group, Loader, Text, Title } from "@mantine/core"
import { AnimatePresence } from "framer-motion"
import { useQuery } from "react-query"
import { Helmet } from "react-helmet-async"
import { motion } from "framer-motion"

import { DashboardLayout } from "~/components/layouts/Dashboard"
import UserStats from "~/components/stats/UserStats"
import WeeklySolvedChart from "~/components/stats/visualizations/WeeklySolvedChart"
import TagsFreqChart from "~/components/stats/visualizations/TagsFreqChart"
import { getStats } from "~/api/dashboard"
import { getSubmissions } from "~/api/submissions"
import { getWeekRanges } from "~/utils/getWeekRanges"
import AvgDifficultyChart from "~/components/stats/visualizations/AvgDifficultyChart"
import TagsSolveTimeChart from "~/components/stats/visualizations/TagsSolveTimeChart"
import { Frequency, getSubmissionStats } from "~/utils/getSubmissionsStats"

export default function DashboardPage() {
  // get statistics: number of problem solved, total solve time and average_difficulty
  let [data, setData] = useState(null)
  useQuery("stats", getStats, {
    onSuccess: (data) => {
      setData(data)
    },
  })

  // get submissions and get statistics for each week
  let [frequency, setFrequency] = useState<Frequency | null>(null)
  let [avgDifficulty, setAvgDifficulty] = useState<any>(null)
  const {
    data: submissionsData,
    isLoading,
    isFetching,
  } = useQuery("submissions", getSubmissions, {
    onSuccess: (res) => {
      const { frequency, avgDifficulty } = getSubmissionStats(res.body.submissions)
      setAvgDifficulty(avgDifficulty)
      setFrequency(frequency)
    },
  })

  return (
    <DashboardLayout>
      {/* page meta data */}
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      {/* page title */}
      <Group align="center" mb="md">
        <Title order={3}>Dashboard</Title>
        <AnimatePresence>
          {(isLoading || isFetching) && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ display: "flex", alignItems: "center" }}
            >
              <Loader size="xs" />
            </motion.div>
          )}
        </AnimatePresence>
      </Group>

      {/* dashboard stats section */}
      <AnimatePresence>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25, duration: 0.35 }}>
          {data && frequency && data["tagsFrequency"] && (
            <>
              <Box mb={8}>
                <UserStats progress={data} />
              </Box>
              <Grid sx={{ alignItems: "stretch" }}>
                <Grid.Col md={6}>{<WeeklySolvedChart data={frequency} />}</Grid.Col>
                <Grid.Col md={6}>
                  <TagsFreqChart data={data["tagsFrequency"]} />
                </Grid.Col>
                <Grid.Col md={6}>
                  <TagsSolveTimeChart data={data["tagsSolveTime"]} />
                </Grid.Col>
                <Grid.Col md={6}>
                  <AvgDifficultyChart avgDifficulty={avgDifficulty} />
                </Grid.Col>
              </Grid>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </DashboardLayout>
  )
}
