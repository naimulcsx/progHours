import { getWeekRanges } from "./getWeekRanges"

export interface Frequency {
  [name: string]: number
}

export function getSubmissionStats(submissions: any[]) {
  const weekRanges = getWeekRanges(submissions)

  const frequency: Frequency = {},
    difficulty: any = {},
    frequencyWithDifficulty: any = {},
    avgDifficulty: any = {}

  // For each week k, calculate how many problems are solved in the k'th week
  for (let i = 0; i < submissions.length; ++i) {
    for (let j = 0; j < weekRanges.length; ++j) {
      const verdict = submissions[i].verdict
      const solvedAt = new Date(submissions[i].solvedAt)
      if (verdict === "AC" && solvedAt >= weekRanges[j].from && solvedAt <= weekRanges[j].to) {
        // count how many problems are solved in that week
        if (!frequency[j + 1]) frequency[j + 1] = 0
        frequency[j + 1]++

        // count total difficulty in that week
        if (!difficulty[j + 1]) difficulty[j + 1] = 0
        difficulty[j + 1] += submissions[i].problem.difficulty

        if (!frequencyWithDifficulty[j + 1]) frequencyWithDifficulty[j + 1] = 0
        frequencyWithDifficulty[j + 1] += submissions[i].problem.difficulty > 0
      }
    }
  }

  Object.keys(difficulty).map((key) => {
    avgDifficulty[key] = difficulty[key] / frequencyWithDifficulty[key] || 0
  })

  // weeks with 0 solve
  // const weeks = Object.keys(frequency).map((key) => parseInt(key))
  // const lastWeek = weeks[weeks.length - 1]
  // for (let i = 1; i <= lastWeek; ++i) {
  //   if (!frequency[i]) {
  //     frequency[i] = 0
  //   }
  // }

  return { frequency, avgDifficulty }
}
