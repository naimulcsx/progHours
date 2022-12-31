import { getProblemByPid } from "~/api/problems"
import { DashboardLayout } from "~/components/layouts/Dashboard"
import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import ProblemEditForm from "~/components/admin/problem/ProblemEdit/ProblemEdifForm"

export default function ProblemEditPage() {
  const { id } = useParams() as {
    id: string
  }
  const [prob, setProb] = useState(null)

  useQuery("prob", () => getProblemByPid(id), {
    onSuccess: (res) => {
      setProb(res.body.problem)
    },
  })

  return (
    <DashboardLayout>
      {/* @ts-ignore */}
      <Helmet>
        <title>Problems</title>
      </Helmet>
      {prob ? <ProblemEditForm prob={prob}></ProblemEditForm> : null}
    </DashboardLayout>
  )
}
