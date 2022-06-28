import { Helmet } from "react-helmet-async"
import { Transition } from "@headlessui/react"
import { Fragment, useEffect, useState } from "react"
import { useQuery, useQueryClient } from "react-query"

/**
 * Import Components
 */
import { DashboardLayout } from "@/components/layouts/Dashboard"
import LeaderboardTable from "@/components/leaderboard/Table"
import Spinner from "@/components/Spinner"

/**
 * Import helpers
 */
import calculatePoints from "@/utils/calculatePoints"
import { getRankList } from "@/api/leaderboard"
import { RanklistItem } from "@/types/RanklistItem"
import DashboardHeader from "@/components/dashboard/Header"

const LeaderboardPage = () => {
  const [ranklist, setRanklist] = useState(null)
  const query = useQuery("ranklist", getRankList, {
    onSuccess: (data) => {
      /**
       * Data is sent unsorted by the server
       * We need to caluclate the points
       */
      data.ranklist.forEach((el: RanklistItem) => {
        el.average_difficulty =
          el.total_difficulty / el.total_solved_with_difficulty || 0
        el.points = calculatePoints(el)
      })
      /**
       * Sort the array according to the points calculated
       * in the previous step and update the ranklist state
       */
      data.ranklist.sort((a: RanklistItem, b: RanklistItem) => {
        return b.points - a.points
      })
      setRanklist(data.ranklist)
    },
  })

  return (
    <DashboardLayout title="Submissions">
      <Helmet>
        <title>Leaderboard</title>
      </Helmet>
      {ranklist && <LeaderboardTable ranklist={ranklist} />}
    </DashboardLayout>
  )
}

export default LeaderboardPage
