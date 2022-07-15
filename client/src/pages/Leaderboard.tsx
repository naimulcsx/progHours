import { Helmet } from "react-helmet-async"
import { useState } from "react"
import { useQuery } from "react-query"

/**
 * Import Components
 */
import { DashboardLayout } from "@/components/layouts/Dashboard"
import LeaderboardTable from "@/components/leaderboard/Table"

/**
 * Import helpers
 */
import calculatePoints from "@/utils/calculatePoints"
import { getRankList } from "@/api/leaderboard"
import { RanklistItem } from "@/types/RanklistItem"
import { Spinner } from "@chakra-ui/react"

const LeaderboardPage = () => {
  const [ranklist, setRanklist] = useState(null)
  useQuery("ranklist", getRankList, {
    onSuccess: (res) => {
      const { stats } = res.body
      /**
       * Data is sent unsorted by the server
       * We need to caluclate the points
       */
      stats.forEach((el: RanklistItem) => {
        el.averageDifficulty =
          el.totalDifficulty / el.totalSolvedWithDifficulty || 0
        el.points = calculatePoints(el)
      })
      /**
       * Sort the array according to the points calculated
       * in the previous step and update the ranklist state
       */
      stats.sort((a: RanklistItem, b: RanklistItem) => {
        return b.points - a.points
      })
      setRanklist(stats)
    },
  })

  return (
    <DashboardLayout title="Leaderboard">
      <Helmet>
        <title>Leaderboard</title>
      </Helmet>
      {ranklist ? (
        <LeaderboardTable ranklist={ranklist} />
      ) : (
        <Spinner size="sm" />
      )}
    </DashboardLayout>
  )
}

export default LeaderboardPage
