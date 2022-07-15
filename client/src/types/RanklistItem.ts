export interface RanklistItem {
  userId: number
  totalDifficulty: number
  totalSolveTime: number
  totalSolved: number
  averageDifficulty: number
  totalSolvedWithDifficulty: number
  points: number
  user: {
    id: number
    username: string
    name: string
    email: string
    role: string
  }
}
