export interface RanklistItem {
  user_id: number
  total_difficulty: number
  total_solve_time: number
  total_solved: number
  average_difficulty: number
  total_solved_with_difficulty: number
  points: number
  user: {
    id: number
    username: string
    name: string
    email: string
    role: string
  }
}
