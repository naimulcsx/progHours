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
import { AnimateLoading } from "@/components/AnimateLoading"
import processRanklist from "@/utils/processRanklist"

const LeaderboardPage = () => {
  const [ranklist, setRanklist] = useState(null)
  useQuery("ranklist", getRankList, {
    onSuccess: (res) => {
      const { stats } = res.body
      setRanklist(processRanklist(stats))
    },
  })

  return (
    <DashboardLayout title="Leaderboard">
      {/* @ts-ignore */}
      <Helmet>
        <title>Leaderboard</title>
      </Helmet>
      <AnimateLoading isLoaded={ranklist}>
        {ranklist && <LeaderboardTable ranklist={ranklist} />}
      </AnimateLoading>
    </DashboardLayout>
  )
}

export default LeaderboardPage
