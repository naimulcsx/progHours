import useSubmissions from "~/hooks/useSubmissions"
import SubmissionsTemplate from "~/components/templates/submissions/Submissions"

export default function SubmissionsPage() {
  const { submissions } = useSubmissions()
  return <SubmissionsTemplate submissions={submissions} />
}
