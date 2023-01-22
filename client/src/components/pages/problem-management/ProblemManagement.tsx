import { useState } from "react"
import { useQuery } from "react-query"
import { getAllProblems } from "~/api/problems"
import { getAllUsers } from "~/api/user"
import ProblemManagementTemplate from "~/components/templates/problem-management/ProblemManagement"
import UserManagementTemplate from "~/components/templates/user-management/UserManagement"
import { Problem } from "~/types/Problem"

export default function ProblemManagementPage() {
  const [problems, setProblems] = useState<Problem[]>()

  useQuery("problems", getAllProblems, {
    onSuccess: (res) => {
      setProblems(res.body.problems)
    },
  })

  return (
    <>
      <ProblemManagementTemplate problems={problems || []} />
    </>
  )
}
