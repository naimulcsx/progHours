import { Helmet } from "react-helmet-async"
import { createElement, useState } from "react"
import { useQuery } from "react-query"
import { motion } from "framer-motion"

/**
 * Import Components
 */
import { DashboardLayout } from "@/components/layouts/Dashboard"
import LeaderboardTable from "@/components/leaderboard/Table"

/**
 * Import helpers
 */
import { getRankList } from "@/api/leaderboard"
import {
  Group,
  Title,
  Box,
  Select,
  LoadingOverlay,
  Loader,
} from "@mantine/core"
import { AnimatePresence } from "framer-motion"
import LeaderboardTableMobile from "@/components/leaderboard/TableMobile"

const LeaderboardPage = () => {
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
    <DashboardLayout>
      {/* @ts-ignore */}
      <Helmet>
        <title>Leaderboard</title>
      </Helmet>
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.35 }}
          >
            <Box sx={{ marginLeft: -16, marginRight: -16 }}>
              <LeaderboardTableMobile data={data} />
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  )
}

export default LeaderboardPage
