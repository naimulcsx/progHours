import { Paper } from "@mantine/core"
import moment from "moment"
import { DataGrid } from "~/components/organisms/datagrid"
import { Submission } from "~/types/Submission"
import ProblemName from "./cells/non-editable/ProblemName"
import NonEditableTags from "./cells/non-editable/Tags"
import NonEditableVerdict from "./cells/non-editable/Verdict"

export default function SubmissionsListProfile({ submissions }: { submissions: Submission[] }) {
  // Attach a serial number to each submissions
  let k = submissions.length
  submissions.forEach((el) => (el.serial = k--))

  return (
    <Paper sx={{ overflow: "clip" }} mb="xl">
      <DataGrid<Submission>
        sx={(theme) => ({
          background: "white",
          boxShadow: theme.shadows.xs,
          marginLeft: -16,
          marginRight: -16,
        })}
        pageSizes={["25", "50", "100"]}
        initialState={{ pagination: { pageSize: 25 } }}
        data={submissions ? submissions : []}
        withSorting
        withPagination
        withColumnFilters
        horizontalSpacing="lg"
        columns={[
          {
            header: "Id",
            accessorKey: "serial",
            size: 40,
          },
          {
            header: "Problem Name",
            accessorKey: "problem.name",
            cell: ProblemName,
            size: 250,
          },
          {
            header: "Verdict",
            accessorKey: "verdict",
            cell: NonEditableVerdict,
            size: 80,
          },
          {
            header: "Solve Time",
            accessorKey: "solveTime",
            size: 90,
          },
          {
            header: "Tags",
            cell: NonEditableTags,
            size: 300,
          },
          {
            header: "Difficulty",
            accessorKey: "problem.difficulty",
            size: 90,
            cell: (cell) => (cell.getValue() ? cell.getValue() : "—"),
          },
          {
            header: "Solved On",
            accessorKey: "solvedAt",
            cell: (cell) => moment(cell.getValue() as string).calendar(),
          },
        ]}
      />
    </Paper>
  )
}
