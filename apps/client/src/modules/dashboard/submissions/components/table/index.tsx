import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from "@tanstack/react-table";
import { createElement } from "react";

import { Group, Pagination, ScrollArea, Table, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import { SubmissionRow } from "@proghours/data-access";

import { CreateSubmissionRow } from "./CreateSubmissionRow";
import { columns } from "./columns";
import { columnsPublic } from "./columns-public";

interface DataTableProps {
  editable?: boolean;
  data: SubmissionRow[];
}

export function SubmissionsDataTable({
  editable = true,
  data
}: DataTableProps) {
  const PAGE_SIZE = 25;
  const table = useReactTable({
    data,
    columns: editable ? columns : columnsPublic,
    getCoreRowModel: getCoreRowModel(),
    // pagination
    getPaginationRowModel: getPaginationRowModel(),
    // initial state
    initialState: {
      pagination: {
        pageSize: PAGE_SIZE
      }
    }
  });

  const matches = useMediaQuery("(min-width: 56.25em)");

  return createElement(
    // rendering ScrollArea only for smaller screens
    // it disables the sticky header functionality on the table header
    matches ? "div" : ScrollArea,
    null,
    <>
      <Table verticalSpacing="xs" stickyHeader>
        <Table.Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <Table.Th
                    key={header.id}
                    style={{
                      width: header.column.getSize(),
                      minWidth: header.column.getSize(),
                      maxWidth: header.column.getSize()
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </Table.Th>
                );
              })}
            </Table.Tr>
          ))}
        </Table.Thead>
        <Table.Tbody>
          {editable && <CreateSubmissionRow />}
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, index) => (
              <Table.Tr
                key={data[index].id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <Table.Td
                    key={cell.id}
                    style={{
                      width: cell.column.getSize(),
                      minWidth: cell.column.getSize(),
                      maxWidth: cell.column.getSize()
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Td>
                ))}
              </Table.Tr>
            ))
          ) : (
            <Table.Tr>
              <Table.Td colSpan={columns.length} className="h-24 text-center">
                No results.
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
      <Group
        justify="space-between"
        px="xs"
        py="sm"
        style={{ borderTop: "1px solid hsl(var(--border))" }}
      >
        <Text size="sm">
          {" "}
          {table.getState().pagination.pageIndex * PAGE_SIZE + 1} -{" "}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * PAGE_SIZE,
            table.getFilteredRowModel().rows.length
          )}{" "}
          / {table.getFilteredRowModel().rows.length}
        </Text>
        <Pagination
          size="sm"
          boundaries={1}
          total={table.getPageCount()}
          onChange={(value) => table.setPageIndex(value - 1)}
        />
      </Group>
    </>
  );
}
