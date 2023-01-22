import { Box } from "@mantine/core"
import { LeaderboardResponse } from "~/types/Stats"
import LeaderboardDesktop from "./LeaderboardDesktop"
import LeaderboardMobile from "./LeaderboardMobile"

export default function Leaderboard({ data }: LeaderboardProps) {
  return (
    <>
      <Box
        sx={(theme) => ({
          display: "block",
          [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
            display: "none",
          },
        })}
      >
        <LeaderboardDesktop data={data} />
      </Box>
      <Box
        sx={(theme) => ({
          display: "none",
          [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
            display: "block",
          },
        })}
      >
        <LeaderboardMobile data={data} />
      </Box>
    </>
  )
}

export interface LeaderboardProps {
  data: LeaderboardResponse["leaderboard"]
}
