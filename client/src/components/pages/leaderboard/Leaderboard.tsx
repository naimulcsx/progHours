import { getRankList } from "~/api/leaderboard"
import { useState } from "react"
import { useQuery } from "react-query"
import { LeaderboardResponse } from "~/types/Stats"
import LeaderboardTemplate from "~/components/templates/leaderboard/Leaderboard"

export default function LeaderboardPage() {
  const [leaderboardType, setLeaderboardType] = useState<
    "full" | "currentWeek" | "lastWeek" | "currentMonth" | "lastMonth"
  >("currentWeek")
  const leaderboardQuery = useQuery<LeaderboardResponse>(["ranklist", leaderboardType], () =>
    getRankList(leaderboardType)
  )
  const isLoading = leaderboardQuery.isLoading || leaderboardQuery.isFetching
  return (
    <LeaderboardTemplate
      leaderboard={leaderboardQuery.data?.leaderboard}
      leaderboardType={leaderboardType}
      setLeaderboardType={setLeaderboardType}
      isLoading={isLoading}
    />
  )
}
