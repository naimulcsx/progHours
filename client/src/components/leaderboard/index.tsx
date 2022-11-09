import { Box } from "@mantine/core"
import LeaderboardTable from "./TableDesktop"
import LeaderboardTableMobile from "./TableMobile"

export default function Leaderboard({ data }: any) {
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
        <LeaderboardTable data={data} />
      </Box>
      <Box
        sx={(theme) => ({
          display: "none",
          [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
            display: "block",
          },
        })}
      >
        <LeaderboardTableMobile data={data} />
      </Box>
    </>
  )
}
