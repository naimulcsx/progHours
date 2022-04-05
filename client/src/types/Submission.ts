import { Problem } from "./Problem"

export interface Submission {
  id: number
  serial: number
  problem: Problem
  solve_time: number
  solved_at: string
  verdict: string
}
