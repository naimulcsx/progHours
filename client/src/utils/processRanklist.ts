import { RanklistItem } from "@/types/RanklistItem"
import calculatePoints from "./calculatePoints"

export default function processRanklist(stats: any) {
  /**
   * Data is sent unsorted by the server
   * We need to caluclate the points
   */
  stats.forEach((el: RanklistItem) => {
    el.averageDifficulty =
      el.totalDifficulty / el.totalSolvedWithDifficulty || 0
    el.points = calculatePoints(el)
  })
  /**
   * Sort the array according to the points calculated
   * in the previous step and update the ranklist state
   */
  stats.sort((a: RanklistItem, b: RanklistItem) => {
    return b.points - a.points
  })
  return stats
}
