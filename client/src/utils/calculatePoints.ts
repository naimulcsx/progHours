/**
 * Calculate points in frontend from stats that we got from backend
 */
function calculatePoints(obj: any) {
  const { average_difficulty, total_solved, total_solve_time } = obj
  const x = average_difficulty
  const y = total_solved
  const z = total_solve_time
  return (2 * x + y + z) / (4 * 100)
}

export default calculatePoints
