import { getRankList } from "@/api/leaderboard"
import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { useQuery } from "react-query"
import { Box, Container, Group, Select, Title, Text } from "@mantine/core"
import LeaderboardTable from "@/components/leaderboard/Table"
import Navbar from "@/components/navbar"

function PublicLeaderboard() {
  const [leaderboardType, setLeaderboardType] = useState<
    "full" | "currentWeek" | "lastWeek" | "currentMonth"
  >("full")

  const [dateRange, setDateRange] = useState<any>({})

  const { data, isLoading } = useQuery(
    ["ranklist", leaderboardType],
    () => getRankList(leaderboardType),
    {
      onSuccess: (res) => {
        const { stats, fromDate, toDate } = res.body
        if (fromDate && toDate) setDateRange({ from: fromDate, to: toDate })
        else setDateRange({})
      },
    }
  )

  return (
    <Box>
      {/* @ts-ignore */}
      <Helmet>
        <title>Leaderboard</title>
      </Helmet>
      <Navbar />
      <Container sx={{ maxWidth: "1536px", paddingTop: "80px" }}>
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
        <LeaderboardTable data={data} loading={isLoading} />
      </Container>
    </Box>
  )
}

export default PublicLeaderboard
