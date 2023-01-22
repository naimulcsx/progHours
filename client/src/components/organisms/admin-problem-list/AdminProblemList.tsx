import { Anchor, Box } from "@mantine/core"
import { Problem } from "~/types/Problem"
import { Link } from "react-router-dom"
import { DataGrid, numberFilterFn, stringFilterFn } from "../datagrid"
import ProblemName from "./cells/ProblemName"
import Tags from "./cells/Tags"
import { ProblemTag } from "~/types/ProblemTag"

const AdminProblemList = ({ problems }: { problems: Problem[] }) => {
  return (
    <Box sx={{ marginLeft: -16, marginRight: -16 }}>
      <DataGrid
        tableTitle="Problems"
        sx={(theme) => ({
          background: "white",
          boxShadow: theme.shadows.xs,
        })}
        data={problems}
        withGlobalFilter
        withPagination
        withSorting
        withColumnFilters
        horizontalSpacing="lg"
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
            filterFn: stringFilterFn,
          },
          {
            header: "Tags",
            size: 450,
            cell: Tags,
            accessorFn: (row) => row.tags.map((item: ProblemTag) => item.tag.name),
            filterFn: stringFilterFn,
          },
          {
            accessorKey: "difficulty",
            header: "Difficulty",
            cell: (cell) => (cell.getValue() ? (cell.getValue() as string) : "—"),
            size: 120,
            filterFn: numberFilterFn,
          },
          {
            accessorKey: "onlineJudge.name",
            header: "Online Judge",
            filterFn: stringFilterFn,
          },
          {
            header: "Action",
            cell: (cell) => {
              return (
                <Anchor component={Link} to={`/admin/problems/${cell.row.original.pid}`}>
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

export default AdminProblemList
