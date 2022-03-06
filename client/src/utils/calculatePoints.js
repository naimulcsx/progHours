function calculatePoints(obj) {
  const { avg_difficulty, solve_count, solve_time } = obj
  console.log(avg_difficulty, solve_count, solve_time)
  const x = avg_difficulty / 3000
  const y = solve_count / 50
  const z = solve_time / 100
  return ((2 * x + y + z) / 4) * 1000
}

export default calculatePoints
