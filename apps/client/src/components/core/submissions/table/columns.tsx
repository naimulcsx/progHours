import { ColumnDef } from "@tanstack/react-table";
import { SubmissionRow } from "@proghours/data-access";
import { ProblemName } from "./cell/ProblemName";
import { VerdictCell } from "./cell/Verdict";
import { SolveTimeCell } from "./cell/SolveTime";
import { Badge, Group } from "@mantine/core";
import { SolvedAtCell } from "./cell/SolvedAt";
import { ActionsCell } from "./cell/Actions";

export const columns: ColumnDef<SubmissionRow>[] = [
  {
    accessorKey: "problem.name",
    header: "Problem Name",
    cell: ProblemName,
    size: 280
  },
  {
    accessorKey: "verdict",
    header: "Verdict",
    cell: VerdictCell,
    size: 90
  },
  {
    accessorKey: "solveTime",
    header: "Solve Time",
    size: 110,
    cell: SolveTimeCell
  },
  {
    accessorKey: "problem.tags",
    header: "Tags",
    cell: (cell) => {
      const tags = cell.row.original.problem.problemTags.map(
        (problemTag) => problemTag.tag.name
      );
      return (
        <Group spacing="xs" sx={{ maxWidth: 240 }}>
          {tags.map((tag) => {
            return <Badge key={tag}>{tag}</Badge>;
          })}
        </Group>
      );
    },
    size: 320
  },
  {
    accessorKey: "problem.difficulty",
    header: "Difficulty",
    cell: (cell) =>
      cell.row.original.problem.difficulty === 0
        ? "—"
        : cell.row.original.problem.difficulty,
    size: 140
  },
  {
    accessorKey: "solvedAt",
    header: "Solved at",
    cell: SolvedAtCell,
    size: 120
  },
  {
    header: "Actions",
    cell: ActionsCell
  }
];
