import { getAllProblems } from "~/api/problems"
import UserManagementTable from "~/components/admin/user/userTable"
import { DashboardLayout } from "~/components/layouts/Dashboard"
import type { User } from "~/contexts/UserContext"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { useQuery } from "react-query"
import ProblemManagementTable from "~/components/admin/problem/table/problemManagementTable"

export default function ProblemManagement() {
  const [prob, setProb] = useState(null)

  useQuery("prob", getAllProblems, {
    onSuccess: (res) => {
      //     console.log(res.body.problems)
      setProb(res.body.problems)
    },
  })

  return (
    <DashboardLayout>
      {/* @ts-ignore */}
      <Helmet>
        <title>Problems</title>
      </Helmet>
      {prob && <ProblemManagementTable prob={prob} />}
    </DashboardLayout>
  )
}
