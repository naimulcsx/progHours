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
import { getRankList } from "@/api/leaderboard"
import { AnimateLoading } from "@/components/AnimateLoading"
import processRanklist from "@/utils/processRanklist"
import { filterData } from "@/components/leaderboard/filters/filterData"
import { LeaderboardFilters } from "@/components/leaderboard/filters/Filters"

const LeaderboardPage = () => {
  const [ranklist, setRanklist] = useState<any>(null)
  const [filteredData, setFilteredData] = useState<any>(null)

  useQuery("ranklist", getRankList, {
    onSuccess: (res) => {
      const { stats } = res.body
      const result = processRanklist(stats)
      setRanklist(result)
    },
  })

  const [filters, setFilters] = useState<any>({})

  useEffect(() => {
    if (Object.keys(filters).length > 0)
      setFilteredData(filterData(ranklist, filters))
    else setFilteredData(ranklist)
  }, [ranklist])

  useEffect(() => {
    if (Object.keys(filters).length > 0)
      setFilteredData(filterData(ranklist, filters))
    else setFilteredData(ranklist)
  }, [filters])

  return (
    <DashboardLayout title="Leaderboard">
      {/* @ts-ignore */}
      <Helmet>
        <title>Leaderboard</title>
      </Helmet>
      <AnimateLoading isLoaded={filteredData}>
        {filteredData && (
          <>
            <LeaderboardFilters filters={filters} setFilters={setFilters} />
            <LeaderboardTable ranklist={filteredData} isPublic={false} />
          </>
        )}
      </AnimateLoading>
    </DashboardLayout>
  )
}

export default LeaderboardPage
