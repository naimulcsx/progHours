import {
  Box,
  Button,
  Checkbox,
  Flex,
  Menu,
  ScrollArea,
  Table,
  TextInput,
  useMantineTheme
} from "@mantine/core";
import { useDebouncedState, useLocalStorage } from "@mantine/hooks";
import { IconAdjustmentsHorizontal } from "@tabler/icons-react";
import { renderToString } from "react-dom/server";

import {
  ColumnDef,
  FilterFn,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable
} from "@tanstack/react-table";
import { isValidElement, useEffect } from "react";

interface SubmissionsDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const globalFilterFn: FilterFn<any> = (
  row,
  columnId: string,
  filterValue: string
) => {
  const value = row.getValue<string>(columnId);
  console.log(value, "here");
  if (!value) return false;

  // if is a react element, then render it to string, so it can be searched
  if (isValidElement(value)) {
    const htmlString = renderToString(value);
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    return (doc.body.textContent || doc.body.innerText)
      .toLowerCase()
      .includes(filterValue.toLowerCase());
  }

  return value
    .toString()
    .toLowerCase()
    .includes(filterValue.toString().toLowerCase());
};

export function SubmissionsDataTable<TData, TValue>({
  columns,
  data
}: SubmissionsDataTableProps<TData, TValue>) {
  const theme = useMantineTheme();

  const [columnVisibility, setColumnVisibility] =
    useLocalStorage<VisibilityState>({
      key: "submissions-table-columns",
      defaultValue: {}
    });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    enableGlobalFilter: true,
    globalFilterFn,
    state: {
      columnVisibility
    }
  });

  const [globalFilterValue, setGlobalFilterValue] = useDebouncedState(
    table.getState().globalFilter || "",
    200
  );

  useEffect(() => {
    table.setGlobalFilter(globalFilterValue);
  }, [table, globalFilterValue]);

  return (
    <div>
      <Flex my="sm" justify="space-between">
        <Box>
          <TextInput
            defaultValue={globalFilterValue}
            placeholder="Filter submissions"
            styles={{
              input: {
                width: 250,
                height: 32,
                border: `1px solid ${
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[5]
                    : theme.colors.gray[3]
                }`,
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[7]
                    : theme.white
              }
            }}
            onChange={(event) =>
              setGlobalFilterValue(event.currentTarget.value)
            }
          />
        </Box>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Button
              size="xs"
              leftIcon={<IconAdjustmentsHorizontal size={16} stroke={1.2} />}
            >
              View
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Toggle columns</Menu.Label>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <Menu.Item key={column.id}>
                    <Checkbox
                      id={column.id}
                      label={column.id}
                      checked={column.getIsVisible()}
                      onChange={(e) => {
                        column.toggleVisibility(!!e.target.checked);
                      }}
                    ></Checkbox>
                  </Menu.Item>
                );
              })}
          </Menu.Dropdown>
        </Menu>
      </Flex>

      <ScrollArea
        sx={{
          margin: "0 -16px",
          boxShadow: theme.shadows.xs,
          borderTop:
            theme.colorScheme === "dark"
              ? `1px solid ${theme.colors.dark[5]}`
              : 0,
          borderBottom:
            theme.colorScheme === "dark"
              ? `1px solid ${theme.colors.dark[5]}`
              : 0
        }}
      >
        <Table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, idx) => {
                  const cellWidth = [260, 110, 110, 320, 260];
                  return (
                    <th
                      key={header.id}
                      style={{
                        width: cellWidth[idx],
                        maxWidth: cellWidth[idx],
                        minWidth: cellWidth[idx]
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="h-24 text-center">
                  No results.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </ScrollArea>
    </div>
  );
}
