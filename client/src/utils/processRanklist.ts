import { RanklistItem } from "@/types/RanklistItem"
import calculatePoints from "./calculatePoints"

export default function processRanklist(stats: any) {
  /** Attach a serial number */
  let serial = 1
  stats.forEach((el: RanklistItem) => {
    el.serial = serial++
  })
  return stats
}
