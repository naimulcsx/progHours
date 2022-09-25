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
import { Box, Flex, Select, Text } from "@chakra-ui/react"
import moment from "moment"
import { getGroupByHashtag, getUserGroups } from "@/api/groups"

const LeaderboardPage = () => {
  const [ranklist, setRanklist] = useState<any>(null)
  const [filteredData, setFilteredData] = useState<any>(null)

  const [groupTag, setGroupTag] = useState()
  const [groups, setGroups] = useState([])

  const [leaderboardType, setLeaderboardType] = useState<
    "full" | "currentWeek" | "lastWeek" | "currentMonth"
  >("currentWeek")

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

  // get all groups
  useQuery("groups", getUserGroups, {
    onSuccess: (data) => {
      setGroups(data?.body.groups)
    },
  })

  useQuery(["groups", groupTag], () => getGroupByHashtag(groupTag), {
    onSuccess: (data) => {
      setRanklist(processRanklist(data?.body.ranklist))
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
              alignItems={["start", "center"]}
              mb={4}
              flexDirection={["column-reverse", "row"]}
            >
              <Flex gap={6} align="center">
                <LeaderboardFilters filters={filters} setFilters={setFilters} />

                {groups.length > 0 && (
                  <Select
                    size="sm"
                    maxW="160"
                    placeholder="Select a group"
                    rounded="lg"
                    onChange={(e: any) => {
                      setGroupTag(e.target.value)
                    }}
                  >
                    {groups.map((item: any) => {
                      return (
                        <option key={item.id} value={item.group.hashtag}>
                          {item.group.name}
                        </option>
                      )
                    })}
                  </Select>
                )}
              </Flex>
              <Flex
                direction={["row-reverse", "row"]}
                w={["full", "auto"]}
                justify="start"
                alignItems="center"
                gap={4}
                mb={4}
              >
                <Box fontSize="sm" minW="180" textAlign="right">
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
                  defaultValue="currentWeek"
                  rounded="lg"
                  onChange={(e: any) => {
                    setLeaderboardType(e.target.value)
                  }}
                >
                  <option value="full">All Time</option>
                  <option value="currentWeek">This Week</option>
                  <option value="lastWeek">Last Week</option>
                  <option value="currentMonth">This Month</option>
                  <option value="lastMonth">Last Month</option>
                </Select>
              </Flex>
            </Box>
            <LeaderboardTable ranklist={filteredData} />
          </>
        )}
      </AnimateLoading>
    </DashboardLayout>
  )
}

export default LeaderboardPage
