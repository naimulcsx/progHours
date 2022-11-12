import { getRankList } from "~/api/leaderboard"
import React, { useState } from "react"
import { Helmet } from "react-helmet-async"
import { useQuery } from "react-query"
import { Box, Container, Group, Select, Title, Loader } from "@mantine/core"
import Navbar from "~/components/navbar"
import { AnimatePresence, motion } from "framer-motion"
import useUser from "~/hooks/useUser"
import Leaderboard from "~/components/leaderboard"
import { DashboardLayout } from "~/components/layouts/Dashboard"

export default function LeaderboardPage() {
  const { user } = useUser()

  const [leaderboardType, setLeaderboardType] = useState<"full" | "currentWeek" | "lastWeek" | "currentMonth">("full")

  const [dateRange, setDateRange] = useState<any>({})

  const { data, isLoading, isFetching } = useQuery(["ranklist", leaderboardType], () => getRankList(leaderboardType), {
    onSuccess: (res) => {
      const { fromDate, toDate } = res.body
      if (fromDate && toDate) setDateRange({ from: fromDate, to: toDate })
      else setDateRange({})
    },
  })

  return React.createElement(
    user ? DashboardLayout : Box,
    null,
    <>
      <Helmet>
        <title>Leaderboard</title>
      </Helmet>
      <Navbar />
      {React.createElement(
        user ? "div" : Container,
        user
          ? null
          : {
              sx: {
                maxWidth: "1536px",
                paddingTop: "80px",
                minHeight: "100vh",
              },
            },
        <>
          <Group position="apart" align="start">
            <Group align="center" mb="md">
              <Title order={3} sx={{ color: "white" }}>
                Leaderboard
              </Title>
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
                onChange={(value: "full" | "currentWeek" | "lastWeek" | "currentMonth") => {
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
                <Box
                  sx={(theme) => ({
                    margin: user ? "0 -16px" : "auto",
                    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
                      margin: "0 -16px",
                    },
                  })}
                >
                  <Leaderboard data={data?.body?.stats} loading={isLoading} />
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  )
}
