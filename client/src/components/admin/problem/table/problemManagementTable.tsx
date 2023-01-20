import "regenerator-runtime/runtime"
import { DataGrid } from "~/components/datagrid"
import { Group, Box, Text, Button, Anchor, MultiSelect } from "@mantine/core"
import ProblemName from "../cell/ProblemName"
import Tags from "../cell/Tags"

import { Link } from "react-router-dom"
export default function ProblemManagementTable({ prob }) {
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
              size: 20,
            },
            {
              accessorKey: "name",
              header: "Problem name",
              size: 250,
              cell: ProblemName,
            },
            {
              header: "Tags",
              size: 450,
              cell: Tags,
            },
            {
              accessorKey: "difficulty",
              header: "Difficulty",
              cell: (cell) => (cell.getValue() ? (cell.getValue() as string) : "—"),
              size: 80,
            },
            {
              accessorKey: "pid",
              header: "Problem ID",
              cell: (cell) => (cell.getValue() ? (cell.getValue() as string) : "—"),
              size: 100,
            },
            {
              header: "Test",
              cell: (cell) => {
                //console.log(cell.row.original.pid)
                return (
                  <Anchor component={Link} to={`/problems/${cell.row.original.pid}`}>
                    <Button>Edit</Button>
                  </Anchor>
                )
              },
            },
          ]}
        />
      </Box>
    </>
  )
}
