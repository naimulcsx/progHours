import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

import { Badge, Group } from "@mantine/core";

import { SubmissionRow } from "@proghours/data-access";

import { ProblemName } from "./cell/ProblemName";

export const columnsPublic: ColumnDef<SubmissionRow>[] = [
  {
    accessorKey: "serial",
    header: "#",
    size: 90
  },
  {
    accessorKey: "problem.name",
    header: "Problem Name",
    cell: ProblemName,
    size: 280
  },
  {
    accessorKey: "verdict",
    header: "Verdict",
    size: 90
  },
  {
    accessorKey: "solveTime",
    header: "Solve Time",
    size: 110
  },
  {
    accessorKey: "problem.tags",
    header: "Tags",
    cell: (cell) => {
      const tags = cell.row.original.problem.problemTags.map(
        (problemTag) => problemTag.tag.name
      );
      return (
        <Group gap="xs" style={{ maxWidth: 240 }}>
          {tags.map((tag) => {
            return <Badge key={tag}>{tag}</Badge>;
          })}
          {tags.length === 0 && <span>&mdash;</span>}
        </Group>
      );
    },
    size: 300
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
    cell: (cell) => dayjs(cell.row.original.createdAt).format("DD-MM-YYYY"),
    size: 120,
    header: "Solved at"
  }
];
