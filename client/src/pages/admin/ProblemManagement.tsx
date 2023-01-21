import { getAllProblems } from "~/api/problems"
import { DashboardLayout } from "~/components/layouts/Dashboard"
import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { useQuery } from "react-query"
import { Problem } from "~/types/Problem"
import ProblemTable from "~/components/admin/problem/ProblemTable"

export default function ProblemManagement() {
  const [problems, setProblems] = useState<Problem[]>()

  useQuery("problems", getAllProblems, {
    onSuccess: (res) => {
      setProblems(res.body.problems)
    },
  })

  return (
    <DashboardLayout>
      {/* @ts-ignore */}
      <Helmet>
        <title>Problems</title>
      </Helmet>
      {problems && <ProblemTable data={problems} />}
    </DashboardLayout>
  )
}
