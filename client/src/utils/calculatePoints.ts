/**
 * Calculate points in frontend from stats that we got from backend
 */
function calculatePoints(item: any) {
  item.averageDifficulty = item.totalDifficulty / item.totalSolvedWithDifficulty || 0
  let score = (item.totalSolved * item.averageDifficulty) / 100 + item.totalSolveTime
  if (!score) score = 0
  return score
}

export default calculatePoints
