import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { getStatsByUsername } from "~/api/leaderboard"
import { getSubmissionsByUsername } from "~/api/submissions"
import { getUserByUsername } from "~/api/user"
import { getSubmissionStats } from "~/utils/getSubmissionsStats"
import { useState } from "react"
import type { Statistics } from "../dashboard/Dashboard"

import UserProfileTemplate from "~/components/templates/user-profile/UserProfile"
import NotFoundPage from "../not-found/NotFound"

export default function UserProfilePage() {
  const { username } = useParams()
  let [statistics, setStatistics] = useState<Statistics | undefined>(undefined)
  const userQuery = useQuery(`users/${username}`, () => getUserByUsername(username), {
    retry: 1,
  })
  const userStatisticsQuery = useQuery(`stats/${username}`, () => getStatsByUsername(username), {
    onSuccess: (res) => {
      setStatistics((prev) => {
        return {
          ...prev,
          ...res?.body?.stats,
        }
      })
    },
  })
  const userSubmissionsQuery = useQuery(
    `submissions/${username}`,
    () => getSubmissionsByUsername(username),
    {
      onSuccess: (res) => {
        const { frequency, avgDifficulty } = getSubmissionStats(res.body.submissions)
        // @ts-ignore
        setStatistics((prev) => {
          return {
            ...prev,
            frequency,
            avgDifficulty,
          }
        })
      },
    }
  )

  let isLoading =
    userQuery.isLoading ||
    userQuery.isFetching ||
    userStatisticsQuery.isLoading ||
    userStatisticsQuery.isFetching ||
    userSubmissionsQuery.isLoading ||
    userSubmissionsQuery.isFetching

  console.log(userSubmissionsQuery.data)

  if (userQuery.isError) return <NotFoundPage />
  return (
    <UserProfileTemplate
      user={userQuery?.data?.body?.user}
      statistics={statistics}
      isLoading={isLoading}
      submissions={userSubmissionsQuery?.data?.body?.submissions}
    />
  )
}
