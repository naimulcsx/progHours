import "regenerator-runtime/runtime"
import { useState } from "react"
import type { User } from "~/contexts/UserContext"
import { DataGrid } from "~/components/datagrid"
import { Group, Box, Text, Button, Anchor } from "@mantine/core"
import Avatar from "~/components/Avatar"
import Action from "./Actions"

export default function ProblemManagementTable({ prob }) {
  console.log(prob)
  return (
    <>
      <Box sx={{ marginLeft: -16, marginRight: -16 }}>
        <DataGrid
          tableTitle="Problem List"
          withGlobalFilter
          sx={(theme) => ({
            background: "white",
            boxShadow: theme.shadows.xs,
          })}
          data={prob || []}
          withPagination
          horizontalSpacing="md"
          pageSizes={["25", "50", "100"]}
          initialState={{ pagination: { pageSize: 25 } }}
          columns={[
            {
              accessorKey: "id",
              header: "Id",
            },
            {
              accessorKey: "name",
              header: "Problem name",
              cell: (cell) => (cell.getValue() as string).toUpperCase(),
            },
            {
              accessorKey: "link",
              header: "Link",
            },
            {
              accessorKey: "difficulty",
              header: "Difficulty",
              cell: (cell) => (cell.getValue() ? (cell.getValue() as string) : "—"),
            },
            {
              accessorKey: "pid",
              header: "Problem ID",
              cell: (cell) => (cell.getValue() ? (cell.getValue() as string) : "—"),
            },
          ]}
        />
      </Box>
    </>
  )
}
