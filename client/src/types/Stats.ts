export type LeaderboardItem = {
  id: number
  totalSolveTime: number
  totalDifficulty: number
  totalSolved: number
  totalSolvedWithDifficulty: number
  averageDifficulty: number
  score: number
  rank: number
  user: {
    id: number
    name: string
    username: string
    batch?: number
    department?: string
  }
}

export type LeaderboardResponse = {
  statusCode: number
  fromDate?: string
  toDate?: string
  leaderboard: LeaderboardItem[]
}
