import ProblemTable from "@/components/admin/problems/ProblemTable"
import { AnimateLoading } from "@/components/AnimateLoading"
import { DashboardLayout } from "@/components/layouts/Dashboard"
import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { useQuery } from "react-query"
import axios from "axios"
import { getAllProblems } from "@/api/problems"

export default function ProblemManagement() {
  const [problems, setProblems] = useState(null)

  useQuery("problems", getAllProblems, {
    onSuccess: (res) => {
      console.log(res.body)
      setProblems(res.body.problems)
    },
  })

  return (
    <DashboardLayout title="Problem list">
      {/* @ts-ignore */}
      <Helmet>
        <title>Problems</title>
      </Helmet>
      <AnimateLoading isLoaded={problems}>
        {problems && <ProblemTable problems={problems} />}
      </AnimateLoading>
    </DashboardLayout>
  )
}
