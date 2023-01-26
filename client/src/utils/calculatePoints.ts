/**
 * Calculate points in frontend from stats that we got from backend
 */
function calculatePoints(obj: any) {
  const { totalSolved: y, totalSolveTime: z, totalDifficulty } = obj
  const x = totalDifficulty / y || 0
  return (x * y) / 100 + z
}

export default calculatePoints
