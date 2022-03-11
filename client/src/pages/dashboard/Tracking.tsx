import { useQuery } from "react-query"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"

/**
 * Import Components and helpers
 */
import Spinner from "@/components/Spinner"
import Layout from "@/components/dashboard/Layout"
import TrackingTable from "@/components/submissions/Table"
import WeekFilters from "@/components/submissions/filters/WeekFilter"
import { getSubmissions } from "@/api/submissions"
import { getWeekRanges, WeekRange, filterByWeek } from "@/utils/getWeekRanges"

export default function TrackingSheet() {
  const query = useQuery("practice", getSubmissions)
  let [filteredData, setFilteredData] = useState([])

  /**
   * Whenever the `query.data` changes, we need to recalculate the weeks
   * Week ranges containing `from` and `to` Date
   */
  const [weekRanges, setWeekRanges] = useState<WeekRange[]>([])
  const [selectedWeek, setSelectedWeek] = useState({ id: 0, name: "" })
  useEffect(() => {
    if (!query.data) return
    const weekRanges = getWeekRanges(query.data.submissions)
    setWeekRanges(weekRanges)
    setSelectedWeek({
      id: weekRanges.length + 1,
      name: "Week " + weekRanges.length,
    })
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

  return (
    <Layout>
      <Helmet>
        <title>Tracking Sheet</title>
      </Helmet>
      <div className="flex items-center justify-between">
        <h3 className="font-bold flex items-center space-x-4">
          <span>Tracking Sheet</span>
          <Spinner show={query.isLoading || query.isRefetching} />
        </h3>
      </div>
      <div className="mt-4">
        <ul className="flex items-center space-x-4">
          <li>
            <WeekFilters
              numberOfWeeks={weekRanges.length}
              selected={selectedWeek}
              setSelected={setSelectedWeek}
            />
          </li>
        </ul>
      </div>
      {/* tracking table */}
      {query.data && <TrackingTable submissions={filteredData} />}
    </Layout>
  )
}
