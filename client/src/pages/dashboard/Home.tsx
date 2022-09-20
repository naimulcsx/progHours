import { useContext, useState } from "react"
import { useQuery } from "react-query"
import { Helmet } from "react-helmet-async"
import {
  Box,
  GridItem,
  Spinner,
  useColorModeValue as mode,
} from "@chakra-ui/react"

/**
 * Import Components
 */
import { DashboardLayout } from "@/components/layouts/Dashboard"
import UserStats from "@/components/stats/UserStats"
import WeeklySolvedChart from "@/components/stats/visualizations/WeeklySolvedChart"
import TagsFreqChart from "@/components/stats/visualizations/TagsFreqChart"

/**
 * Import helpers
 */
import { getStats } from "@/api/dashboard"
import { getSubmissions } from "@/api/submissions"
import { getWeekRanges } from "@/utils/getWeekRanges"
import { GlobalContext } from "@/GlobalStateProvider"
import { AnimateLoading } from "@/components/AnimateLoading"
import { AppShell, Grid } from "@mantine/core"
import NewSidebar from "@/components/sidebar/NewSidebar"

const DashboardHome = () => {
  const { user } = useContext(GlobalContext)
  /**
   * Get statistics: number of problem solved, total solve time and average_difficulty
   */
  let [data, setData] = useState(null)
  useQuery("stats", getStats, {
    onSuccess: (data) => {
      setData(data)
    },
  })
  /**
   * Get submissions and get statistics for each week
   */
  interface Frequency {
    [name: string]: number
  }
  let [frequency, setFrequency] = useState<Frequency | null>(null)
  useQuery("submissions", getSubmissions, {
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

  const bg = mode("white", "gray.700")

  return (
    <DashboardLayout>
      {/* @ts-ignore */}
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <AnimateLoading isLoaded={data && frequency && data["tagsFrequency"]}>
        {data && frequency && data["tagsFrequency"] && (
          <>
            <Box mb={4}>
              <UserStats progress={data} />
            </Box>
            <Grid>
              <Grid.Col span={6}>
                {<WeeklySolvedChart data={frequency} />}
              </Grid.Col>
              <Grid.Col span={6}>
                <TagsFreqChart data={data["tagsFrequency"]} />
              </Grid.Col>
            </Grid>
          </>
        )}
      </AnimateLoading>
    </DashboardLayout>
  )
}

export default DashboardHome
