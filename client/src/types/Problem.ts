import { ProblemTag } from "~/types/ProblemTag"

export interface Problem {
  id: number
  pid: string
  name: string
  link: string
  difficulty: number
  createdAt: string
  onlineJudgeId: number
  tags: ProblemTag[]
}
