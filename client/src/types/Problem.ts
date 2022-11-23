import { Tag } from "./Tag"

export interface Problem {
  id: number
  pid: string
  name: string
  link: string
  difficulty: number
  createdAt: string
  onlineJudgeId: number
  tags: Tag[]
}
