import { getAllUsers } from "@/api/user"
import ProblemListTable from "@/components/admin/problems/Table"
import { AnimateLoading } from "@/components/AnimateLoading"
import { DashboardLayout } from "@/components/layouts/Dashboard"
import { User } from "@/GlobalStateProvider"
import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { useQuery } from "react-query"
import axios from "axios"

export default function ProblemsList() {
  const [prob, setProb] = useState(null)
  const getAllProblems = () => {
    return axios("/api/problems").then((res) => res.data)
  }
  useQuery("users", getAllProblems, {
    onSuccess: (res) => {
      setProb(res.body.problems)
    },
  })

  return (
    <DashboardLayout title="Problem list">
      {/* @ts-ignore */}
      <Helmet>
        <title>Problems</title>
      </Helmet>
      <AnimateLoading isLoaded={prob}>
        {prob && <ProblemListTable prob={prob} />}
      </AnimateLoading>
    </DashboardLayout>
  )
}
