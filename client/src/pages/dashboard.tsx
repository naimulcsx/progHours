import { useState } from "react"
import { Box, Grid, Group, Loader, Title } from "@mantine/core"
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

export default function DashboardPage() {
  // get statistics: number of problem solved, total solve time and average_difficulty
  let [data, setData] = useState(null)
  useQuery("stats", getStats, {
    onSuccess: (data) => {
      setData(data)
    },
  })

  // get submissions and get statistics for each week
  interface Frequency {
    [name: string]: number
  }
  let [frequency, setFrequency] = useState<Frequency | null>(null)
  let [avgDifficulty, setAvgDifficulty] = useState<any>(null)

  const { isLoading, isFetching } = useQuery("submissions", getSubmissions, {
    onSuccess: (res) => {
      const weekRanges = getWeekRanges(res.body.submissions)

      const frequency: Frequency = {},
        difficulty: any = {},
        frequencyWithDifficulty: any = {},
        avgDifficulty: any = {}

      // For each week k, calculate how many problems are solved in the k'th week
      for (let i = 0; i < res.body.submissions.length; ++i) {
        for (let j = 0; j < weekRanges.length; ++j) {
          const verdict = res.body.submissions[i].verdict
          const solvedAt = new Date(res.body.submissions[i].solvedAt)
          if (verdict === "AC" && solvedAt >= weekRanges[j].from && solvedAt <= weekRanges[j].to) {
            // count how many problems are solved in that week
            if (!frequency[j + 1]) frequency[j + 1] = 0
            frequency[j + 1]++

            // count total difficulty in that week
            if (!difficulty[j + 1]) difficulty[j + 1] = 0
            difficulty[j + 1] += res.body.submissions[i].problem.difficulty

            if (!frequencyWithDifficulty[j + 1]) frequencyWithDifficulty[j + 1] = 0
            frequencyWithDifficulty[j + 1] += res.body.submissions[i].problem.difficulty > 0
          }
        }
      }

      Object.keys(difficulty).map((key) => {
        avgDifficulty[key] = difficulty[key] / frequencyWithDifficulty[key] || 0
      })

      // weeks with 0 solve
      const weeks = Object.keys(frequency).map((key) => parseInt(key))
      const lastWeek = weeks[weeks.length - 1]
      for (let i = 1; i <= lastWeek; ++i) {
        if (!frequency[i]) {
          frequency[i] = 0
        }
      }
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
