import { useContext, useState } from "react"
import { useQuery } from "react-query"
import { Helmet } from "react-helmet-async"
import { Box, Grid, GridItem, Spinner } from "@chakra-ui/react"

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
  return (
    <DashboardLayout title={`Hi! ${user?.name || ""}`}>
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
            <Grid
              templateColumns={[
                "repeat(1, 1fr)",
                "repeat(1, 1fr)",
                "repeat(1, 1fr)",
                "repeat(1, 1fr)",
                "repeat(3, 1fr)",
              ]}
              gap={[0, 0, 0, 4]}
              mb={[14]}
            >
              <GridItem
                p={[4, 4, 4, 8]}
                bg="white"
                rounded="lg"
                shadow="base"
                mb={[4, 4, 4, 0]}
              >
                {<WeeklySolvedChart data={frequency} />}
              </GridItem>
              <GridItem
                p={[4, 4, 4, 8]}
                pb={[0, 0, 0, 2]}
                bg="white"
                rounded="lg"
                shadow="base"
                colSpan={2}
              >
                <TagsFreqChart data={data["tagsFrequency"]} />
              </GridItem>
            </Grid>
          </>
        )}
      </AnimateLoading>
    </DashboardLayout>
  )
}

export default DashboardHome
