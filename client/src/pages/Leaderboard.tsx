import { Helmet } from "react-helmet-async"
import { useEffect, useState } from "react"
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

const filterLeaderboard = (ranklist: any, filters: any) => {
  return ranklist?.filter((el: any) => {
    let batchFlag = false,
      totalSolvedFlag = false
    let flags = []
    if (filters.batch) {
      switch (filters.batch.type) {
        case "gte":
          batchFlag = el.user.batch >= filters.batch.value
          break
        case "eq":
          batchFlag = el.user.batch === filters.batch.value
          break
        case "lte":
          batchFlag = el.user.batch <= filters.batch.value
          break
      }
      flags.push(batchFlag)
    }
    if (filters.totalSolved) {
      switch (filters.totalSolved.type) {
        case "gte":
          totalSolvedFlag = el.totalSolved >= filters.totalSolved.value
          break
        case "eq":
          totalSolvedFlag = el.totalSolved == filters.totalSolved.value
          break
        case "lte":
          totalSolvedFlag = el.totalSolved <= filters.totalSolved.value
          break
      }
      flags.push(totalSolvedFlag)
    }
    let result = true
    flags.forEach((flag) => (result = result && flag))
    return flags.length === 0 ? false : result
  })
}

const LeaderboardPage = () => {
  const [ranklist, setRanklist] = useState<any>(null)
  const [filteredData, setFilteredData] = useState<any>(null)
  useQuery("ranklist", getRankList, {
    onSuccess: (res) => {
      const { stats } = res.body
      const result = processRanklist(stats)
      console.log(stats)
      setRanklist(result)
    },
  })

  const [filters, setFilters] = useState<any>({})

  useEffect(() => {
    if (Object.keys(filters).length > 0)
      setFilteredData(filterLeaderboard(ranklist, filters))
    else setFilteredData(ranklist)
  }, [ranklist])

  useEffect(() => {
    if (Object.keys(filters).length > 0)
      setFilteredData(filterLeaderboard(ranklist, filters))
    else setFilteredData(ranklist)
  }, [filters])

  console.log(filters)

  /**
   * { name: "batch", type: "<=", value: 46 }
   */

  return (
    <DashboardLayout title="Leaderboard">
      {/* @ts-ignore */}
      <Helmet>
        <title>Leaderboard</title>
      </Helmet>
      <AnimateLoading isLoaded={ranklist}>
        {filteredData && (
          <LeaderboardTable
            ranklist={filteredData}
            filters={filters}
            setFilters={setFilters}
          />
        )}
      </AnimateLoading>
    </DashboardLayout>
  )
}

export default LeaderboardPage
