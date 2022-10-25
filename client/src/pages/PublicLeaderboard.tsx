import { getRankList } from "@/api/leaderboard"
import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { useQuery } from "react-query"
import {
  Box,
  Container,
  Group,
  Select,
  Title,
  Text,
  Loader,
} from "@mantine/core"
import LeaderboardTable from "@/components/leaderboard/Table"
import Navbar from "@/components/navbar"
import { AnimatePresence, motion } from "framer-motion"

function PublicLeaderboard() {
  const [leaderboardType, setLeaderboardType] = useState<
    "full" | "currentWeek" | "lastWeek" | "currentMonth"
  >("full")

  const [dateRange, setDateRange] = useState<any>({})

  const { data, isLoading, isFetching } = useQuery(
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
    <Box>
      {/* @ts-ignore */}
      <Helmet>
        <title>Leaderboard</title>
      </Helmet>
      <Navbar />
      <Container
        sx={{ maxWidth: "1536px", paddingTop: "80px", minHeight: "100vh" }}
      >
        <Group position="apart" align="start">
          <Group align="center" mb="md">
            <Title order={3}>Leaderboard</Title>
            <AnimatePresence>
              {(isLoading || isFetching) && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Loader size="xs" />
                </motion.div>
              )}
            </AnimatePresence>
          </Group>
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
        <AnimatePresence>
          {!isLoading && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ delay: 0.25, duration: 0.35 }}
            >
              <Box>
                <LeaderboardTable data={data} loading={isLoading} />
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  )
}

export default PublicLeaderboard
