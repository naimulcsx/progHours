import { useQuery } from "react-query"
import { useState } from "react"
import { fetchActivities } from "~/api/submissions"
import ActivitiesTemplate from "~/components/templates/activities/Activities"

export default function ActivitiesPage() {
  // pagination state
  const [page, setPage] = useState(1)
  const [submissions, setSubmissions] = useState([])
  const [totalSubmissions, setTotalSubmissions] = useState(0)

  // fetch data
  const activityQuery = useQuery(["activities", page], () => fetchActivities(page), {
    onSuccess(res) {
      setSubmissions(res.body.submissions)
      setTotalSubmissions(res.body.totalSubmissions)
    },
    refetchInterval: 30000,
  })

  const isLoading = activityQuery.isLoading || activityQuery.isFetching

  return (
    <ActivitiesTemplate
      page={page}
      setPage={setPage}
      submissions={submissions}
      totalSubmissions={totalSubmissions}
      isLoading={isLoading}
    />
  )
}
