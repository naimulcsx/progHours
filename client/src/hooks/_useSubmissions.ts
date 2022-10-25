import { getSubmissions } from "@/api/submissions"
import { filterByWeek, getWeekRanges, WeekRange } from "@/utils/getWeekRanges"
import { useState, useEffect } from "react"
import { useQuery } from "react-query"

function useSubmissions() {
  const query = useQuery("submissions", getSubmissions, {
    refetchOnWindowFocus: false,
  })
  let [filteredData, setFilteredData] = useState([])

  /**
   * Whenever the `query.data` changes, we need to recalculate the weeks
   * Week ranges containing `from` and `to` Date
   */
  const [weekRanges, setWeekRanges] = useState<WeekRange[]>([])
  const [selectedWeek, setSelectedWeek] = useState({ id: 0, name: "" })

  useEffect(() => {
    if (!query.data) return

    const weekRanges = getWeekRanges(query.data.body.submissions)
    setWeekRanges(weekRanges)
    /**
     * Set default week to be the current week (only the first time we get the data)
     */
    if (selectedWeek.id === 0) {
      // setSelectedWeek({
      //   id: weekRanges.length + 1,
      //   name: "Week " + weekRanges.length,
      // })
      setSelectedWeek({
        id: 1,
        name: "All Weeks",
      })
    } else if (selectedWeek.id === 1) {
      /**
       * If we are on the all weeks filter
       */
      setFilteredData(query.data.body.submissions)
    } else {
      /**
       * Data has updated, but we don't want to change the selectedWeek, so keep the selectedWeek as it is
       * And Re-filter the data, so that the weeks have got the corrent submissions after the update
       */

      /**
       * TODO: REMOVING THE IF STATEMENT GENERATES AN ERROR
       * !! HOW TO REPRODUCE
       * !! Select `All weeks` from tracking sheet then go to dashboard for a crash
       */

      if (selectedWeek.id >= 2)
        setFilteredData(
          filterByWeek(
            query.data.body.submissions,
            weekRanges[selectedWeek.id - 2]
          )
        )
    }
  }, [query.data])

  /**
   * Whenever the selected week is changed, re-filter the submissions again
   */
  useEffect(() => {
    if (!query.data) return
    let arr = query.data.body.submissions
    const weekId = selectedWeek.id - 1
    if (weekId > 0) arr = filterByWeek(arr, weekRanges[weekId - 1])
    setFilteredData(arr)
  }, [selectedWeek])

  return { query, filteredData, selectedWeek, setSelectedWeek, weekRanges }
}

export default useSubmissions
