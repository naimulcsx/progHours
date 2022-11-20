import { useContext, useState } from "react"
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

  const { isLoading, isFetching } = useQuery("submissions", getSubmissions, {
    onSuccess: (res) => {
      const frequency: Frequency = {}
      const weekRanges = getWeekRanges(res.body.submissions)
      /**
       * For each week k, calculate how many problems are solved in the k'th week
       */
      for (let i = 0; i < res.body.submissions.length; ++i) {
        for (let j = 0; j < weekRanges.length; ++j) {
          const solvedAt = new Date(res.body.submissions[i].solvedAt)
          if (solvedAt >= weekRanges[j].from && solvedAt <= weekRanges[j].to) {
            if (!frequency[j + 1]) frequency[j + 1] = 0
            frequency[j + 1]++
          }
        }
      }
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
              </Grid>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </DashboardLayout>
  )
}
