import { useState } from "react"
import { useQuery } from "react-query"
import { getStats } from "~/api/dashboard"
import { getSubmissions } from "~/api/submissions"
import { getSubmissionStats } from "~/utils/getSubmissionsStats"
import DashboardTemplate from "~/components/templates/dashboard/Dashboard"

export type Statistics = {
  frequency: {
    [key: string]: number
  }
  avgDifficulty: {
    [key: string]: number
  }
  tagsFrequency: { name: string; count: number }[]
  tagsSolveTime: { name: string; sum: number; count: number }[]
  totalDifficulty: number
  totalSolveTime: number
  totalSolved: number
  totalSolvedWithDifficulty: number
  verdictCount: {
    [key: string]: number
  }
}

export default function DashboardPage() {
  // get statistics
  let [statistics, setStatistics] = useState<Statistics | undefined>(undefined)
  const statsQuery = useQuery("stats", getStats, {
    onSuccess: (res) => {
      setStatistics((prev) => {
        return {
          ...prev,
          ...res,
        }
      })
    },
  })

  // get submissions and get statistics for each week
  const submissionsQuery = useQuery("submissions", getSubmissions, {
    onSuccess: (res) => {
      const { frequency, avgDifficulty } = getSubmissionStats(res.body.submissions)
      // @ts-ignore
      setStatistics((prev) => {
        return {
          ...prev,
          frequency,
          avgDifficulty,
        }
      })
    },
  })

  let isLoading =
    statsQuery.isLoading ||
    statsQuery.isFetching ||
    submissionsQuery.isLoading ||
    submissionsQuery.isFetching

  return <DashboardTemplate statistics={statistics} isLoading={isLoading} />
}
