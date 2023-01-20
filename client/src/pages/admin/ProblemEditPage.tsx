import { getProblemByPid, getProblemTags } from "~/api/problems"
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
  const [tags, setTags] = useState(null)

  useQuery("prob", () => getProblemByPid(id), {
    onSuccess: (res) => {
      let temp = res.body.problem
      let tagList = []
      temp.tags.map((value) => {
        tagList.push(value.tag.name)
      })
      temp.tagList = tagList
      console.log(temp)
      setProb(temp)
    },
  })
  useQuery("tags", getProblemTags, {
    onSuccess: (res) => {
      let temp = []
      res.body.tags.map((value) => {
        temp.push(value.name)
      })
      setTags(temp)
    },
  })

  return (
    <DashboardLayout>
      {/* @ts-ignore */}
      <Helmet>
        <title>Problems</title>
      </Helmet>
      {prob && tags ? <ProblemEditForm prob={prob} tags={tags}></ProblemEditForm> : null}
    </DashboardLayout>
  )
}
