import { ColumnDef } from "@tanstack/react-table";
import { GetSubmissionsResponse } from "@proghours/data-access";
import { Badge, Group } from "@mantine/core";
import { ProblemName } from "./cell/ProblemName";
import VerdictCell from "./cell/Verdict";
import SolveTimeCell from "./cell/SolveTime";

type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;
export type Submission = ArrayElement<GetSubmissionsResponse>;

export const columns: ColumnDef<Submission>[] = [
  {
    accessorFn: (row) => row.problem.pid + " " + row.problem.name,
    header: "Problem ID",
    cell: ProblemName
  },
  {
    accessorKey: "verdict",
    header: "Verdict",
    cell: VerdictCell
  },
  {
    accessorKey: "solveTime",
    header: "Solve Time",
    cell: SolveTimeCell
  },
  {
    accessorFn: (row) =>
      row.problem.problemTags
        .map((problemTag) => problemTag.tag.name)
        .toString(),
    header: "Tags",
    cell: (value) => {
      const tags = value.cell.row.original.problem.problemTags.map(
        (problemTag) => problemTag.tag.name
      );
      return (
        <Group spacing="xs" sx={{ maxWidth: 240 }}>
          {tags.map((tag) => {
            return <Badge key={tag}>{tag}</Badge>;
          })}
        </Group>
      );
    }
  },
  {
    accessorKey: "problem.difficulty",
    header: "Difficulty"
  },
  {
    accessorKey: "solvedAt",
    header: "Solved At"
  }
];
