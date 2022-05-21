import React, { useContext, useState } from "react"
import { Helmet } from "react-helmet-async"

/**
 * Import Components and helpers
 */
import Spinner from "@/components/Spinner"
import { DashboardLayout } from "@/components/layouts/Dashboard"
import TrackingTable from "@/components/submissions/Table"
import WeekFilters from "@/components/submissions/filters/WeekFilter"

/**
 * Import helpers
 */
import { GlobalContext } from "@/GlobalStateProvider"
import { UploadIcon } from "@heroicons/react/solid"
import ImportCsvModal from "./ImportCsvModal"
import csvToArray from "@/utils/csvToArray"

export default function TrackingSheet() {
  const context = useContext(GlobalContext)
  const { query, filteredData, selectedWeek, setSelectedWeek, weekRanges } =
    context?.useSubmissionsResult

  /**
   * Import .csv states
   */
  let [items, setItems] = useState([])
  let [isOpen, setIsOpen] = useState(false)

  /**
   * Called after the user picks some file from import .csv button
   */
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      setIsOpen(true) // open the modal
      const reader = new FileReader()
      reader.onload = function fileReadCompleted() {
        // when the reader is done, the content is in reader.result.
        let itemList = csvToArray(reader.result as string)
        itemList = itemList.filter((item: Array<any>) => item.length !== 1)
        setItems(itemList)
      }
      reader.readAsText(files[0])
    }
    e.target.value = ""
  }

  return (
    <DashboardLayout dataDependency={[query.data]} className="pb-0 bg-white">
      <Helmet>
        <title>Tracking Sheet</title>
      </Helmet>

      <div>
        <div className="flex items-center justify-between">
          <h3 className="flex items-center space-x-4 font-bold">
            <span>Submissions</span>
            <Spinner show={query.isLoading || query.isRefetching} />
          </h3>
        </div>
        <div className="flex justify-between mt-4">
          <ul className="flex items-center space-x-4">
            <li>
              <WeekFilters
                numberOfWeeks={weekRanges.length}
                selected={selectedWeek}
                setSelected={setSelectedWeek}
              />
            </li>
          </ul>
          <ul>
            <li>
              <label
                htmlFor="csv-input"
                className="flex items-center px-4 py-2 text-sm text-white rounded-lg cursor-pointer bg-primary"
              >
                <input type="file" id="csv-input" onInput={handleImport} />
                <UploadIcon className="w-5 h-5 mr-2" />
                Import via .csv
              </label>
              <ImportCsvModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                items={items}
              />
            </li>
          </ul>
        </div>
      </div>
      {/* tracking table */}
      {query.data && <TrackingTable submissions={filteredData} />}
    </DashboardLayout>
  )
}
