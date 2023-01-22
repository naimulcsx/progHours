import { Helmet } from "react-helmet-async"
import { createElement, Dispatch, SetStateAction } from "react"
import { Box, Container, Group, Select, Title, Loader } from "@mantine/core"
import { AnimatePresence, motion } from "framer-motion"
import { DashboardLayout } from "~/components/templates"
import { Navbar } from "~/components/organisms"
import { Leaderboard } from "~/components/organisms"
import useUser from "~/hooks/useUser"

type LeaderboardType = "full" | "currentWeek" | "lastWeek" | "currentMonth" | "lastMonth"

export interface LeaderboardProps {
  leaderboard: any
  leaderboardType: LeaderboardType
  setLeaderboardType: Dispatch<SetStateAction<LeaderboardType>>
  isLoading: boolean
}

export default function LeaderboardTemplate({
  leaderboard,
  leaderboardType,
  setLeaderboardType,
  isLoading,
}: LeaderboardProps) {
  const { user } = useUser()
  return createElement(
    user ? DashboardLayout : Box,
    null,
    <>
      <Helmet>
        <title>Leaderboard</title>
      </Helmet>
      <Navbar />
      {createElement(
        user ? "div" : Container,
        user
          ? null
          : {
              sx: {
                paddingBottom: "32px",
                maxWidth: "1400px",
                paddingTop: "80px",
                minHeight: "100vh",
              },
            },
        <>
          <Group position="apart" align="start" mb="md">
            <Group align="center">
              <Title order={3}>Leaderboard</Title>
              <AnimatePresence>
                {isLoading && (
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
                defaultValue={leaderboardType}
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
                    label: "Current Month",
                  },
                  {
                    value: "lastMonth",
                    label: "Last Month",
                  },
                ]}
              />
            </Box>
          </Group>
          <AnimatePresence>
            {leaderboard && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ delay: 0.25, duration: 0.35 }}
              >
                <Box
                  sx={(theme) => ({
                    margin: user ? "0 -16px" : "auto",
                    borderRadius: user ? 0 : theme.radius.md,
                    overflow: "clip",
                    boxShadow: theme.shadows.xs,
                    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
                      margin: "0 -16px",
                    },
                  })}
                >
                  <Leaderboard data={leaderboard} />
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  )
}
