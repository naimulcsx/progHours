import React, { useState } from "react"
import { Helmet } from "react-helmet-async"

/**
 * Import Components and helpers
 */
import { DashboardLayout } from "~/components/layouts/Dashboard"
import { SubmissionsTable } from "~/components/submissions-table"

/**
 * Import helpers
 */
import csvToArray from "~/utils/csvToArray"
import useSubmissions from "~/hooks/useSubmissions"

export default function SubmissionsPage() {
  const { submissions } = useSubmissions()

  // FOR FUTURE: csv state
  let [items, setItems] = useState([])
  let [isOpen, setIsOpen] = useState(false)

  // FOR FUTURE: Called after the user picks some file from import .csv button
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
    <DashboardLayout>
      <Helmet>
        <title>Submissions</title>
      </Helmet>
      {/* tracking table */}
      {submissions && <SubmissionsTable submissions={submissions} />}
    </DashboardLayout>
  )
}
