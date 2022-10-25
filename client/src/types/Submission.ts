import { Problem } from "./Problem"

export interface Submission {
  id: number
  serial: number
  solveTime: number
  solvedAt: string
  verdict: string
  userId: number
  problemId: number
  problem: Problem
}
