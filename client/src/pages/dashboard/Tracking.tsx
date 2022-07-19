import React, { useContext, useState } from "react"
import { Helmet } from "react-helmet-async"

/**
 * Import Components and helpers
 */
import { DashboardLayout } from "@/components/layouts/Dashboard"
import { SubmissionsTable } from "@/components/submissions-table"
import WeekFilters from "@/components/filters/WeekFilter"

/**
 * Import helpers
 */
import { GlobalContext } from "@/GlobalStateProvider"
import { UploadIcon } from "@heroicons/react/solid"
import ImportCsvModal from "./ImportCsvModal"
import csvToArray from "@/utils/csvToArray"
import { Box, Button, Flex } from "@chakra-ui/react"

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
    <DashboardLayout title="Submissions">
      {/* @ts-ignore */}
      <Helmet>
        <title>Tracking Sheet</title>
      </Helmet>
      <Box>
        <Flex justify="space-between">
          {/* week filter button  */}
          <Box>
            <WeekFilters
              numberOfWeeks={weekRanges.length}
              selected={selectedWeek}
              setSelected={setSelectedWeek}
            />
          </Box>

          {/* csv input button */}
          <Box id="import-button" display="none">
            <label htmlFor="csv-input">
              <input type="file" id="csv-input" onInput={handleImport} />
              <Button as="div" leftIcon={<UploadIcon width={16} />} size="sm">
                Import via .csv
              </Button>
            </label>
            <ImportCsvModal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              items={items}
            />
          </Box>
        </Flex>
      </Box>
      {/* tracking table */}
      {query.data && (
        <SubmissionsTable submissions={filteredData} isEditable={true} />
      )}
    </DashboardLayout>
  )
}
