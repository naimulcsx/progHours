import { useState } from "react"
import { useQuery } from "react-query"
import { Helmet } from "react-helmet-async"
import { Box, Spinner } from "@chakra-ui/react"

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

const DashboardHome = () => {
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
  useQuery("practice", getSubmissions, {
    onSuccess: (data) => {
      const frequency: Frequency = {}
      const weekRanges = getWeekRanges(data.submissions)
      /**
       * For each week k, calculate how many problems are solved in the k'th week
       */
      for (let i = 0; i < data.submissions.length; ++i) {
        for (let j = 0; j < weekRanges.length; ++j) {
          const solved_at = new Date(data.submissions[i].solved_at)
          if (
            solved_at >= weekRanges[j].from &&
            solved_at <= weekRanges[j].to
          ) {
            if (!frequency[j + 1]) frequency[j + 1] = 0
            frequency[j + 1]++
          }
        }
      }
      setFrequency(frequency)
    },
  })
  return (
    <DashboardLayout title="Hi! Naimul Haque">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      {data && frequency && data["tags_frequency"] ? (
        <>
          <Box mb={4}>
            <UserStats progress={data} />
          </Box>
          <Box className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Box className="p-8 bg-white rounded-lg shadow xl:px-8">
              {<WeeklySolvedChart data={frequency} />}
            </Box>
            <Box className="w-full h-full col-span-2 px-8 pt-8 pb-0 bg-white rounded-lg shadow xl:px-8 md:px-16 lg:px-32">
              <TagsFreqChart data={data["tags_frequency"]} />
            </Box>
          </Box>
        </>
      ) : (
        <Spinner size="sm" />
      )}
    </DashboardLayout>
  )
}

export default DashboardHome
