import moment from "moment"

/**
 * filters the submissions array in a specific date range
 */

const filterByWeek = (arr: any, range: WeekRange) =>
  arr.filter((el: any) => {
    if (
      new Date(el.solved_at) >= range.from &&
      new Date(el.solved_at) <= range.to
    )
      return true
  })

/**
 * Get the minimum date from submissions
 */

function getMinDate(arr: any[]) {
  var len = arr.length,
    min = new Date()
  while (len--) {
    if (new Date(arr[len].solved_at) < min) {
      min = new Date(arr[len].solved_at)
    }
  }
  return moment(min).startOf("day").toDate()
}

/**
 * Returns week ranges by taking a look at the date of sumbissions. For Example
 */

interface WeekRange {
  from: Date
  to: Date
}

function getWeekRanges(submissions: any) {
  const minDate = getMinDate(submissions)
  let from = moment(minDate).startOf("day"),
    to = moment(minDate).endOf("day")
  while (to.format("dddd") !== "Friday") {
    to.add(1, "day")
  }
  const weekRanges = [{ from: from.toDate(), to: to.toDate() }]
  while (to.toDate() <= new Date()) {
    weekRanges.push({
      from: to.add(1, "day").startOf("day").toDate(),
      to: to.add(6, "day").endOf("day").toDate(),
    })
  }
  console.log(weekRanges)
  return weekRanges
}

export type { WeekRange }
export { getWeekRanges, filterByWeek }
