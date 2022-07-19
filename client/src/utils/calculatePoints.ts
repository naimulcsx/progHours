/**
 * Calculate points in frontend from stats that we got from backend
 */
function calculatePoints(obj: any) {
  const { averageDifficulty: x, totalSolved: y, totalSolveTime: z } = obj
  return (x * y) / 100 + z
}

export default calculatePoints
