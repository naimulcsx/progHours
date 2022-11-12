import React, { useContext, useState } from "react"
import { Helmet } from "react-helmet-async"

/**
 * Import Components and helpers
 */
import { DashboardLayout } from "~/components/layouts/Dashboard"
import { SubmissionsTable } from "~/components/submissions-table"
import WeekFilters from "~/components/filters/WeekFilter"

/**
 * Import helpers
 */
import { UploadIcon } from "@heroicons/react/outline"
import ImportCsvModal from "../components/ImportCsvModal"
import csvToArray from "~/utils/csvToArray"
import { Box, Button, Flex } from "@chakra-ui/react"
import { Group, Title } from "@mantine/core"
import axios from "axios"
import { useQuery } from "react-query"
import useSubmissions from "~/hooks/useSubmissions"

export default function SubmissionsPage() {
  // const context = useContext(GlobalContext)
  // const { query, filteredData, selectedWeek, setSelectedWeek, weekRanges } =
  //   context?.useSubmissionsResult

  const { submissions } = useSubmissions()
  console.log(submissions)
  // const { data } = useQuery("submissions", () =>
  //   axios.get("/api/submissions").then((res) => res.data)
  // )

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
    <DashboardLayout>
      <Helmet>
        <title>Submissions</title>
      </Helmet>
      <Group align="center" mb="md">
        <Title order={3} sx={{ color: "white" }}>
          Submissions
        </Title>
      </Group>
      {/* tracking table */}
      {submissions && <SubmissionsTable submissions={submissions} />}
    </DashboardLayout>
  )
}
