function calculatePoints(obj) {
  const { avg_difficulty, solve_count, solve_time } = obj
  const x = avg_difficulty
  const y = solve_count
  const z = solve_time
  return (2 * x + y + z) / (4 * 100)
}

export default calculatePoints
