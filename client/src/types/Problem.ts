import { ProblemTag } from "~/types/ProblemTag"

export interface Problem {
  id: number
  pid: string
  name: string
  link: string
  difficulty: number
  createdAt: string
  onlineJudge: { name: string }
  tags: ProblemTag[]
}
