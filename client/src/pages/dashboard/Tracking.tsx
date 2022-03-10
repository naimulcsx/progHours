import { useQuery } from "react-query"
import { Fragment, useEffect, useRef, useState } from "react"
import { Transition } from "@headlessui/react"

/**
 * Import Components and helpers
 */
import Layout from "@/components/dashboard/Layout"
import TrackingTable from "@/components/submissions/Table"
import WeekFilters from "@/components/submissions/filters/WeekFilter"
import { getSubmissions } from "@/api/submissions"
import { getWeekRanges, WeekRange } from "@/utils/getWeekRanges"

const dateFilter = (arr: any, range: WeekRange) =>
  arr.filter((el: any) => {
    if (
      new Date(el.solved_at) >= range.from &&
      new Date(el.solved_at) <= range.to
    )
      return true
  })

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
    if (weekId > 0) arr = dateFilter(arr, weekRanges[weekId - 1])
    setFilteredData(arr)
  }, [selectedWeek])

  return (
    <Layout>
      <div className="flex items-center justify-between">
        <h3 className="font-bold">
          <div className="flex items-center space-x-4">
            <span>Tracking Sheet</span>
            <Transition
              as={Fragment}
              show={query.status === "loading"}
              enter="transform transition duration-[400ms]"
              enterFrom="opacity-0 rotate-[-120deg] scale-50"
              enterTo="opacity-100 rotate-0 scale-100"
              leave="transform duration-200 transition ease-in-out"
              leaveFrom="opacity-100 rotate-0 scale-100 "
              leaveTo="opacity-0 scale-95 "
            >
              <div className="sp sp-circle sp-circle-dark"></div>
            </Transition>
          </div>
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
