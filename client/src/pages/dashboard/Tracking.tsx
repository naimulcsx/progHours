import React, { useContext, useState } from "react"
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
import { UploadIcon } from "@heroicons/react/outline"
import ImportCsvModal from "./ImportCsvModal"
import csvToArray from "@/utils/csvToArray"
import { createSubmission } from "@/api/submissions"

export default function TrackingSheet() {
  const context = useContext(GlobalContext)
  const { query, filteredData, selectedWeek, setSelectedWeek, weekRanges } =
    context?.useSubmissionsResult

  let [isOpen, setIsOpen] = useState(false)
  let [files, setFiles] = useState([])

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      setIsOpen(true)
      const reader = new FileReader()
      reader.onload = function fileReadCompleted() {
        // when the reader is done, the content is in reader.result.
        let fileList = csvToArray(reader.result as string)
        fileList = fileList.filter((file) => file.length !== 1)
        setFiles(fileList)
      }
      reader.readAsText(files[0])
    }
    e.target.value = ""
  }

  console.log(files)

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
                className="flex items-center text-sm text-primary px-4 py-2 rounded-lg cursor-pointer border border-dashed border-primary"
              >
                <input type="file" id="csv-input" onInput={handleImport} />
                <UploadIcon className="w-5 h-5 mr-2" />
                Import via .csv
              </label>
              <ImportCsvModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                files={files}
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
