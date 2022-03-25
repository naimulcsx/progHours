import { getSubmissions } from "@/api/submissions"
import { filterByWeek, getWeekRanges, WeekRange } from "@/utils/getWeekRanges"
import { useState, useEffect, useRef } from "react"
import { useQuery } from "react-query"

function useSubmissions() {
  const query = useQuery("practice", getSubmissions, {
    refetchOnWindowFocus: false,
  })
  let [filteredData, setFilteredData] = useState([])

  /**
   * Whenever the `query.data` changes, we need to recalculate the weeks
   * Week ranges containing `from` and `to` Date
   */
  const [weekRanges, setWeekRanges] = useState<WeekRange[]>([])
  const [selectedWeek, setSelectedWeek] = useState({ id: 0, name: "" })

  let counterRef = useRef(1)
  useEffect(() => {
    if (!query.data) return
    const weekRanges = getWeekRanges(query.data.submissions)
    setWeekRanges(weekRanges)
    if (counterRef.current <= 1) {
      setSelectedWeek({
        id: weekRanges.length + 1,
        name: "Week " + weekRanges.length,
      })
    }
    counterRef.current++
  }, [query.data])

  /**
   * Whenever the selected week is changed, re-filter the submissions again
   */
  useEffect(() => {
    if (!query.data) return
    let arr = query.data.submissions
    const weekId = selectedWeek.id - 1
    if (weekId > 0) arr = filterByWeek(arr, weekRanges[weekId - 1])
    setFilteredData(arr)
  }, [selectedWeek])

  return [query, filteredData, selectedWeek, setSelectedWeek, weekRanges]
}

export default useSubmissions
