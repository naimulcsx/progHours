import { useQuery } from "react-query"
import { useContext, useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"

/**
 * Import Components and helpers
 */
import Spinner from "@/components/Spinner"
import Layout from "@/components/dashboard/Layout"
import TrackingTable from "@/components/submissions/Table"
import WeekFilters from "@/components/submissions/filters/WeekFilter"

/**
 * Import helpers
 */
import { GlobalContext } from "@/GlobalStateProvider"

export default function TrackingSheet() {
  const context = useContext(GlobalContext)
  const { query, filteredData, selectedWeek, setSelectedWeek, weekRanges } =
    context?.useSubmissionsResult

  return (
    <Layout dataDependency={[query.data]}>
      <Helmet>
        <title>Tracking Sheet</title>
      </Helmet>
      <div>
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
      </div>
      {/* tracking table */}
      {query.data && <TrackingTable submissions={filteredData} />}
    </Layout>
  )
}
