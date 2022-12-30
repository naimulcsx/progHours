import { getAllProblems } from "~/api/problems"
import UserManagementTable from "~/components/admin/user/userTable"
import { DashboardLayout } from "~/components/layouts/Dashboard"
import type { User } from "~/contexts/UserContext"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { useQuery } from "react-query"
import ProblemManagementTable from "~/components/admin/problem/problemManagementTable"

export default function ProblemManagement() {
  const [prob, setProb] = useState(null)
  useEffect(() => {
    console.log(prob)
  }, [prob])

  useQuery("prob", getAllProblems, {
    onSuccess: (res) => {
      // res.body.sort(function (a, b) {
      //   return a.id - b.id
      // })
      console.log(res.body.problems)
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
