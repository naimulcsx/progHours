import { useState } from "react"
import { useParams } from "react-router-dom"
import { getGroupBySlug } from "~/api/groups"
import { useQuery } from "react-query"
import { getRankList } from "~/api/leaderboard"
import { LeaderboardResponse } from "~/types/Stats"
import GroupDetailsTemplate from "~/components/templates/group-details/GroupDetails"

export default function GroupDetailsPage() {
  const { slug } = useParams()
  const groupQuery = useQuery(`groups/${slug}`, () => getGroupBySlug(slug))

  const [leaderboardType, setLeaderboardType] = useState<
    "full" | "currentWeek" | "lastWeek" | "currentMonth" | "lastMonth"
  >("currentMonth")

  const leaderboardQuery = useQuery<LeaderboardResponse>(["ranklist", leaderboardType], () =>
    getRankList(leaderboardType, slug)
  )

  const isLoading =
    groupQuery.isLoading ||
    groupQuery.isFetching ||
    leaderboardQuery.isLoading ||
    leaderboardQuery.isFetching

  return (
    <GroupDetailsTemplate
      group={groupQuery?.data?.body}
      leaderboard={leaderboardQuery?.data?.leaderboard}
      leaderboardType={leaderboardType}
      setLeaderboardType={setLeaderboardType}
      isLoading={isLoading}
    />
  )
}
