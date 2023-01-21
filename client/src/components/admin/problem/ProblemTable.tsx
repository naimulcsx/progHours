import { DataGrid } from "~/components/datagrid"
import { Anchor, Box } from "@mantine/core"
import ProblemName from "./Cell/ProblemName"
import Tags from "./Cell/Tags"
import { Problem } from "~/types/Problem"
import { Link } from "react-router-dom"

const ProblemTable = ({ data }: { data: Problem[] }) => {
  return (
    <Box sx={{ marginLeft: -16, marginRight: -16 }}>
      <DataGrid
        tableTitle="Problems"
        withGlobalFilter
        sx={(theme) => ({
          background: "white",
          boxShadow: theme.shadows.xs,
        })}
        data={data || []}
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
            header: "Action",
            cell: (cell) => {
              return (
                <Anchor component={Link} to={`/problems/${cell.row.original.pid}`}>
                  Edit
                </Anchor>
              )
            },
          },
        ]}
      />
    </Box>
  )
}

export default ProblemTable
