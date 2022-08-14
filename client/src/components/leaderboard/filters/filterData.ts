const setFlag = (
  type: "eq" | "gte" | "lte",
  userValue: number,
  filterValue: number
) => {
  let batchFlag = true
  switch (type) {
    case "gte":
      batchFlag = userValue >= filterValue
      break
    case "eq":
      batchFlag = userValue === filterValue
      break
    case "lte":
      batchFlag = userValue <= filterValue
      break
  }
  return batchFlag
}

export const filterData = (ranklist: any, filters: any) => {
  return ranklist?.filter((el: any) => {
    let flags = []
    if (filters.batch) {
      flags.push(
        setFlag(filters.batch.type, el.user.batch, filters.batch.value)
      )
    }
    if (filters.totalSolved) {
      flags.push(
        setFlag(
          filters.totalSolved.type,
          el.totalSolved,
          filters.totalSolved.value
        )
      )
    }

    if (filters.totalSolveTime) {
      flags.push(
        setFlag(
          filters.totalSolveTime.type,
          el.totalSolveTime,
          filters.totalSolveTime.value
        )
      )
    }

    let result = true
    flags.forEach((flag) => (result = result && flag))
    return flags.length === 0 ? false : result
  })
}
