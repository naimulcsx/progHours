import { getAllUserStudy } from "~/api/userStudies"
import { useQuery } from "react-query"
import StudyListTemplate from "~/components/templates/study-list/StudyList"

export default function StudyListPage() {
  const userStudiesQuery = useQuery("userStudies", getAllUserStudy)
  const isLoading = userStudiesQuery.isLoading || userStudiesQuery.isFetching
  return (
    <StudyListTemplate userStudies={userStudiesQuery?.data?.body?.studies} isLoading={isLoading} />
  )
}
