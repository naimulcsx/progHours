import { getProblemByPid, getProblemTags } from "~/api/problems"
import { DashboardLayout } from "~/components/layouts/Dashboard"
import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import EditProblemForm from "~/components/admin/problem/EditProblemForm"
import { Problem } from "~/types/Problem"
import { Tag } from "~/types/Tag"

export default function EditProblemPage() {
  const { pid } = useParams() as { pid: string }

  const [problem, setProblem] = useState<Problem>()
  const [tags, setTags] = useState<Tag[]>()

  // get all problems
  useQuery(`problems/${pid}`, () => getProblemByPid(pid), {
    onSuccess: (res) => {
      setProblem(res.body.problem)
    },
  })

  // get all problem tags
  useQuery("tags", getProblemTags, {
    onSuccess: (res) => {
      setTags(res.body.tags)
    },
  })

  return (
    <DashboardLayout>
      {/* @ts-ignore */}
      <Helmet>
        <title>Problems</title>
      </Helmet>
      {problem && tags ? <EditProblemForm problem={problem} tags={tags} pid={pid} /> : null}
    </DashboardLayout>
  )
}
