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
import SubmissionForm from "./SubmissionForm"

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
      firstRow={<SubmissionForm serial={submissions.length + 1} />}
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
          size: 170,
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
