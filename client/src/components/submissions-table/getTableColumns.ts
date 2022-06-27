import { EditableCells, NonEditableCells } from "./cells"
import { Column } from "react-table"
import { Submission } from "@/types/Submission"

export const getTableColumns = (isEditable: boolean = false) => {
  const columns = [
    {
      Header: "Id",
      accessor: "serial",
    },
    {
      Header: "Problem Name",
      accessor: "problem.name",
      Cell: NonEditableCells.ProblemName,
    },
    {
      Header: "Verdict",
      accessor: "verdict",
      Cell: isEditable ? EditableCells.Verdict : NonEditableCells.Verdict,
    },
    {
      Header: "Solve Time",
      accessor: "solve_time",
      Cell: isEditable ? EditableCells.SolveTime : (cell) => cell.value,
    },
    {
      Header: "Tags",
      Cell: NonEditableCells.Tags,
    },
    {
      Header: "Difficulty",
      accessor: "problem.difficulty",
    },
    {
      id: "solved-at",
      Header: "Solved On",
      accessor: "solved_at",
      Cell: isEditable ? EditableCells.DatePicker : NonEditableCells.Date,
    },
  ] as Column<Submission>[]
  /** Extra column only for the owner */
  if (isEditable)
    columns.push({
      Header: "Actions",
      accessor: "id",
      Cell: EditableCells.Actions,
    })
  return columns
}
