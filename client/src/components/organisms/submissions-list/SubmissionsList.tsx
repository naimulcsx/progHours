import {
  DataGrid,
  dateFilterFn,
  numberFilterFn,
  stringFilterFn,
} from "~/components/organisms/datagrid"

// ts types
import { Submission } from "~/types/Submission"

// table cells
import ProblemName from "./cells/non-editable/ProblemName"
import NonEditableTags from "./cells/non-editable/Tags"
import Verdict from "./cells/editable/Verdict"
import SolveTime from "./cells/editable/SolveTime"
import Actions from "./cells/editable/Actions"
import DatePicker from "./cells/editable/DatePicker"
import { Box } from "@mantine/core"
import { SubmissionForm } from "~/components/molecules"

export default function SubmissionsList({ submissions }: { submissions: Submission[] }) {
  // Attach a serial number to each submissions
  let k = submissions.length
  submissions.forEach((el) => (el.serial = k--))

  return (
    <Box sx={{ marginLeft: -16, marginRight: -16, zIndex: 999 }}>
      <DataGrid<Submission>
        sx={(theme) => ({
          background: "white",
          boxShadow: theme.shadows.xs,
        })}
        firstRow={<SubmissionForm serial={submissions.length + 1} />}
        pageSizes={["10", "25", "50", "100"]}
        initialState={{ pagination: { pageSize: 10 } }}
        data={submissions ? submissions : []}
        withSorting
        withPagination
        withColumnFilters
        horizontalSpacing="lg"
        withGlobalFilter
        tableTitle="Submissions"
        columns={[
          {
            header: "Id",
            accessorKey: "problem.pid",
            size: 40,
            cell: ({ cell }) => cell.row.original.serial,
          },
          {
            header: "Problem Name",
            accessorKey: "problem.name",
            cell: ProblemName,
            size: 260,
          },
          {
            header: "Verdict",
            accessorKey: "verdict",
            cell: Verdict,
            size: 80,
          },
          {
            header: "Solve Time",
            accessorKey: "solveTime",
            size: 95,
            cell: SolveTime,
            filterFn: numberFilterFn,
          },
          {
            header: "Tags",
            cell: NonEditableTags,
            size: 480,
            filterFn: stringFilterFn,
          },
          {
            header: "Difficulty",
            accessorKey: "problem.difficulty",
            filterFn: numberFilterFn,
            size: 90,
            cell: (cell) => (cell.getValue() ? cell.getValue() : "—"),
          },
          {
            header: "Solved On",
            accessorKey: "solvedAt",
            size: 170,
            cell: DatePicker,
            filterFn: dateFilterFn,
          },
          {
            header: "Actions",
            cell: Actions,
          },
        ]}
      />
    </Box>
  )
}
