import { Helmet } from "react-helmet-async"
import { createElement, useState } from "react"
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
import { Group, Title, Box, Select } from "@mantine/core"

const LeaderboardPage = () => {
  const [leaderboardType, setLeaderboardType] = useState<
    "full" | "currentWeek" | "lastWeek" | "currentMonth"
  >("full")

  const [dateRange, setDateRange] = useState<any>({})

  const { data, isLoading } = useQuery(
    ["ranklist", leaderboardType],
    () => getRankList(leaderboardType),
    {
      onSuccess: (res) => {
        const { fromDate, toDate } = res.body
        if (fromDate && toDate) setDateRange({ from: fromDate, to: toDate })
        else setDateRange({})
      },
    }
  )

  return (
    <DashboardLayout>
      {/* @ts-ignore */}
      <Helmet>
        <title>Leaderboard</title>
      </Helmet>
      <Group position="apart" align="start">
        <Title order={3} mb="md">
          Leaderboard
        </Title>
        <Box>
          <Select
            size="xs"
            defaultValue="full"
            onChange={(
              value: "full" | "currentWeek" | "lastWeek" | "currentMonth"
            ) => {
              setLeaderboardType(value)
            }}
            data={[
              {
                value: "full",
                label: "All Time",
              },
              {
                value: "currentWeek",
                label: "Current Week",
              },
              {
                value: "lastWeek",
                label: "Last Week",
              },
              {
                value: "currentMonth",
                label: "Last Month",
              },
            ]}
          />
        </Box>
      </Group>
      {<LeaderboardTable data={data} loading={isLoading} />}
    </DashboardLayout>
  )
}

export default LeaderboardPage
