import { Badge, Group } from "@mantine/core";
import { SubmissionRow } from "@proghours/data-access";
import {
  Table,
  getFacetedRowModel,
  getFacetedUniqueValues
} from "@tanstack/react-table";
import { DataGrid } from "~/components/common/datagrid";
import { ProblemName } from "./cell/ProblemName";
import VerdictCell from "./cell/Verdict";
import SolveTimeCell from "./cell/SolveTime";
import { SolvedAtCell } from "./cell/SolvedAt";
import { RefCallback } from "react";
import { ActionsCell } from "./cell/Actions";

export interface SubmissionsTableProps {
  data: SubmissionRow[];
  tableRef: RefCallback<Table<SubmissionRow>>;
}

export function SubmissionsTable({ tableRef, data }: SubmissionsTableProps) {
  return (
    <DataGrid
      data={data}
      tableRef={tableRef}
      withSorting
      withPagination
      withGlobalFilter
      withToolbarPadding
      withColumnFilters
      options={{
        autoResetPageIndex: false,
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues()
      }}
      pageSizes={["10", "25", "50", "100"]}
      initialState={{ pagination: { pageSize: 10 } }}
      columns={[
        {
          id: "problem_name",
          accessorFn: (row) => `${row.problem.pid} - ${row.problem.name}`,
          header: "Name",
          cell: ProblemName,
          minSize: 280,
          maxSize: 280
        },
        {
          id: "verdict",
          accessorKey: "verdict",
          header: "Verdict",
          cell: VerdictCell,
          minSize: 90,
          maxSize: 90,
          filterFn: (row, columnId, filterValue: Set<string>) => {
            if (filterValue.size === 0) return true;
            return filterValue.has(row.original.verdict);
          }
        },
        {
          id: "solve_time",
          accessorKey: "solveTime",
          header: "Solve Time",
          cell: SolveTimeCell,
          minSize: 120,
          maxSize: 120
        },
        {
          accessorFn: (row) =>
            row.problem.problemTags
              .map((problemTag) => problemTag.tag.name)
              .toString(),
          header: "Tags",
          minSize: 320,
          maxSize: 320,
          cell: (value) => {
            const tags = value.cell.row.original.problem.problemTags.map(
              (problemTag) => problemTag.tag.name
            );
            return (
              <Group spacing="xs" sx={{ maxWidth: 240 }}>
                {tags.map((tag) => {
                  return (
                    <Badge size="sm" key={tag}>
                      {tag}
                    </Badge>
                  );
                })}
              </Group>
            );
          }
        },
        {
          id: "problem_difficulty",
          accessorKey: "problem.difficulty",
          header: "Difficulty",
          filterFn: (row, columnId, filterValue: Set<number>) => {
            if (filterValue.size === 0) return true;
            return filterValue?.has(row.original.problem.difficulty) ?? false;
          },
          minSize: 100,
          maxSize: 100
        },
        {
          accessorKey: "solvedAt",
          header: "Date Solved",
          cell: SolvedAtCell,
          minSize: 120
        },
        {
          id: "actions",
          header: "Actions",
          cell: ActionsCell
        }
      ]}
    />
  );
}