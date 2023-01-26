import { useState } from "react"
import { useParams } from "react-router-dom"
import { getGroupBySlug } from "~/api/groups"
import { useQuery } from "react-query"
import { getRankList } from "~/api/leaderboard"
import { LeaderboardResponse } from "~/types/Stats"
import GroupDetailsTemplate from "~/components/templates/group-details/GroupDetails"
import axios from "axios"

export default function GroupDetailsPage() {
  const { slug } = useParams()
  const groupQuery = useQuery(`groups/${slug}`, () => getGroupBySlug(slug))

  const [leaderboardType, setLeaderboardType] = useState<
    "full" | "currentWeek" | "lastWeek" | "currentMonth" | "lastMonth"
  >("currentMonth")

  const leaderboardQuery = useQuery<LeaderboardResponse>(["ranklist", leaderboardType], () =>
    getRankList(leaderboardType, slug)
  )

  const groupListsQuery = useQuery(`groups/${slug}/lists`, () =>
    axios.get(`/api/groups/${slug}/lists`).then((res) => res.data)
  )

  const isLoading =
    groupQuery.isLoading ||
    groupQuery.isFetching ||
    leaderboardQuery.isLoading ||
    leaderboardQuery.isFetching ||
    groupListsQuery.isLoading ||
    groupListsQuery.isFetching

  return (
    <GroupDetailsTemplate
      group={groupQuery?.data?.body}
      leaderboard={leaderboardQuery?.data?.leaderboard}
      leaderboardType={leaderboardType}
      problemLists={groupListsQuery?.data?.lists}
      setLeaderboardType={setLeaderboardType}
      isLoading={isLoading}
    />
  )
}
