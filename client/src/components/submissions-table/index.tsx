import { DataGrid } from "@/components/datagrid"

// ts types
import { Submission } from "@/types/Submission"

// table cells
import ProblemName from "./cells/non-editable/ProblemName"
import NonEditableTags from "./cells/non-editable/Tags"
import Verdict from "./cells/editable/Verdict"
import SolveTime from "./cells/editable/SolveTime"
import Actions from "./cells/editable/Actions"
import DatePicker from "./cells/editable/DatePicker"

export const SubmissionsTable = ({
  submissions,
}: {
  submissions: Submission[]
}) => {
  // Attach a serial number to each submissions
  let k = submissions.length
  submissions.forEach((el) => (el.serial = k--))

  return (
    <DataGrid<Submission>
      sx={(theme) => ({
        background: "white",
        boxShadow: theme.shadows.xs,
        marginLeft: -16,
        marginRight: -16,
      })}
      data={submissions ? submissions : []}
      withSorting
      withPagination
      withColumnFilters
      horizontalSpacing="xl"
      columns={[
        {
          header: "Id",
          accessorKey: "serial",
          size: 50,
        },
        {
          header: "Problem Name",
          accessorKey: "problem.name",
          cell: ProblemName,
          size: 300,
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
        },
        {
          header: "Tags",
          cell: NonEditableTags,
          size: 300,
        },
        {
          header: "Difficulty",
          accessorKey: "problem.difficulty",
          cell: (cell) => (cell.getValue() ? cell.getValue() : "—"),
        },
        {
          header: "Solved On",
          accessorKey: "solvedAt",
          cell: DatePicker,
        },
        {
          header: "Actions",
          cell: Actions,
        },
      ]}
    />
  )
}
