import moment from "moment"

function getMinDate(arr) {
  var len = arr.length,
    min = new Date()
  while (len--) {
    if (new Date(arr[len].solved_at) < min) {
      min = new Date(arr[len].solved_at)
    }
  }
  return moment(min).startOf("day").toDate()
}

function getWeekRanges(submissions) {
  const minDate = getMinDate(submissions)
  let from = moment(minDate)
  let to = moment(minDate)
  while (to.format("dddd") !== "Friday") {
    to.add(1, "day")
  }
  const weekRanges = [{ from: from.toDate(), to: to.toDate() }]
  while (to.toDate() <= new Date()) {
    weekRanges.push({
      from: to.add(1, "day").toDate(),
      to: to.add(6, "day").toDate(),
    })
  }
  console.log(weekRanges)
  return weekRanges
}

export default getWeekRanges
