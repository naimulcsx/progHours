import { getProblemByPid, getProblemTags } from "~/api/problems"
import { useState } from "react"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { Problem } from "~/types/Problem"
import { Tag } from "~/types/Tag"
import EditProblemTemplate from "~/components/templates/problem-management/EditProblem"

export default function EditProblemPage() {
  const { pid } = useParams() as { pid: string }

  const [problem, setProblem] = useState<Problem>()
  const [tags, setTags] = useState<Tag[]>()

  // get all problems
  const problemQuery = useQuery(`problems/${pid}`, () => getProblemByPid(pid), {
    onSuccess: (res) => {
      setProblem(res.body.problem)
    },
  })

  // get all problem tags
  const tagQuery = useQuery("tags", getProblemTags, {
    onSuccess: (res) => {
      setTags(res.body.tags)
    },
  })

  const isLoading =
    problemQuery.isLoading || problemQuery.isFetching || tagQuery.isLoading || tagQuery.isFetching

  return (
    <>
      {problem && tags && (
        <EditProblemTemplate isLoading={isLoading} problem={problem} tags={tags} pid={pid} />
      )}
    </>
  )
}
