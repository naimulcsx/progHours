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
import { Box, Flex, HStack, Select, Text, VStack } from "@chakra-ui/react"
import moment from "moment"

const LeaderboardPage = () => {
  const [ranklist, setRanklist] = useState<any>(null)
  const [filteredData, setFilteredData] = useState<any>(null)

  const [leaderboardType, setLeaderboardType] = useState<
    "full" | "currentWeek" | "lastWeek" | "currentMonth"
  >("full")

  const [dateRange, setDateRange] = useState<any>({})

  useQuery(["ranklist", leaderboardType], () => getRankList(leaderboardType), {
    onSuccess: (res) => {
      const { stats, fromDate, toDate } = res.body
      const result = processRanklist(stats)
      setRanklist(result)
      if (fromDate && toDate) setDateRange({ from: fromDate, to: toDate })
      else setDateRange({})
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
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={4}
            >
              <LeaderboardFilters filters={filters} setFilters={setFilters} />
              <Box ml="auto" mr={4} fontSize="sm">
                {Object.keys(dateRange).length == 2 && (
                  <>
                    <Text as="span">
                      {moment(dateRange.from).format("ddd, D MMM")}
                    </Text>
                    {" - "}
                    <Text as="span">
                      {moment(dateRange.to).format("ddd, D MMM")}
                    </Text>
                  </>
                )}
              </Box>
              <Select
                size="sm"
                maxW="140"
                placeholder="Select option"
                defaultValue="full"
                rounded="lg"
                onChange={(e: any) => {
                  setLeaderboardType(e.target.value)
                }}
              >
                <option value="full">All Time</option>
                <option value="currentWeek">This Week</option>
                <option value="lastWeek">Last Week</option>
                <option value="currentMonth">Current Month</option>
                <option value="lastMonth">Last Month</option>
              </Select>
            </Box>
            <LeaderboardTable ranklist={filteredData} />
          </>
        )}
      </AnimateLoading>
    </DashboardLayout>
  )
}

export default LeaderboardPage
