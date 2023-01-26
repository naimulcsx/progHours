import { RefCallback, useCallback, useEffect, useImperativeHandle, useState } from "react"
import {
  Group,
  LoadingOverlay,
  ScrollArea,
  Stack,
  Table as MantineTable,
  Text,
  Title,
} from "@mantine/core"
import {
  ColumnFiltersState,
  flexRender,
  functionalUpdate,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  OnChangeFn,
  PaginationState,
  SortingState,
  useReactTable,
  RowData,
  RowSelectionState,
  Table,
} from "@tanstack/react-table"
import { IconBoxOff } from "@tabler/icons"

import useStyles from "./DataGrid.styles"

import { GlobalFilter, globalFilterFn } from "./GlobalFilter"
import { ColumnSorter } from "./ColumnSorter"
import { ColumnFilter } from "./ColumnFilter"
import { DEFAULT_INITIAL_SIZE, Pagination } from "./Pagination"
import { DataGridProps } from "./types"
import { getRowSelectionColumn } from "./RowSelection"

export function useDataGrid<TData extends RowData>(): [
  Table<TData> | null,
  RefCallback<Table<TData>>
] {
  const [state, setState] = useState<Table<TData> | null>(null)
  return [state, setState]
}

export function DataGrid<TData extends RowData>({
  // data
  columns,
  data,
  total,
  bordered = false,

  // styles
  classNames,
  styles,
  height,
  width,
  withFixedHeader,
  noEllipsis,
  striped,
  highlightOnHover,
  horizontalSpacing,
  verticalSpacing = "xs",
  fontSize,
  loading,
  // features
  withGlobalFilter,
  withColumnFilters,
  withSorting,
  withPagination,
  withColumnResizing,
  withRowSelection,
  autoResetPageIndex,
  noFlexLayout,
  pageSizes,
  paginationMode = "default",
  debug = false,
  // callbacks
  onPageChange,
  onSearch,
  onFilter,
  onSort,
  onRowSelectionChange,
  // table ref
  tableRef,
  // common props
  initialState,
  state,
  onRow,
  onCell,
  iconColor,
  empty,
  locale,
  // first row
  firstRow,
  tableTitle,
  ...others
}: DataGridProps<TData>) {
  const { classes, theme, cx } = useStyles(
    {
      height,
      width,
      noEllipsis,
      withFixedHeader,
      paginationMode,
    },
    {
      classNames,
      styles,
      name: "DataGrid",
    }
  )
  const [tableWidth, setTableWidth] = useState<number | string>(width ?? "100%")

  const color = iconColor || theme.primaryColor

  const table = useReactTable<TData>({
    data,
    columns: withRowSelection ? [getRowSelectionColumn(), ...columns] : columns,
    initialState,
    state,

    enableGlobalFilter: !!withGlobalFilter,
    globalFilterFn,
    enableColumnFilters: !!withColumnFilters,
    enableSorting: !!withSorting,
    enableColumnResizing: !!withColumnResizing,
    enableRowSelection: !!withRowSelection,
    columnResizeMode: "onChange",
    manualPagination: !!total, // when external data, handle pagination manually
    autoResetPageIndex: autoResetPageIndex,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),

    debugTable: debug,
    debugHeaders: debug,
    debugColumns: debug,
  })
  useImperativeHandle(tableRef, () => table)

  useEffect(() => {
    if (noFlexLayout) {
      setTableWidth(table.getTotalSize() + "px")
    } else if (width) {
      setTableWidth(width + "px")
    } else {
      setTableWidth("100%")
    }
  }, [width, noFlexLayout, table.getTotalSize()])

  const handleGlobalFilterChange: OnChangeFn<string> = useCallback(
    (arg0) =>
      table.setState((state) => {
        const next = functionalUpdate(arg0, state.globalFilter || "")
        onSearch && onSearch(next)
        return {
          ...state,
          globalFilter: next,
        }
      }),
    [onSearch]
  )

  const handleSortingChange: OnChangeFn<SortingState> = useCallback(
    (arg0) =>
      table.setState((state) => {
        const next = functionalUpdate(arg0, state.sorting)
        onSort && onSort(next)
        return {
          ...state,
          sorting: next,
        }
      }),
    [onSort]
  )

  const handleColumnFiltersChange: OnChangeFn<ColumnFiltersState> = useCallback(
    (arg0) =>
      table.setState((state) => {
        const next = functionalUpdate(arg0, state.columnFilters)
        onFilter && onFilter(next)
        return {
          ...state,
          columnFilters: next,
        }
      }),
    [onFilter]
  )

  const handlePaginationChange: OnChangeFn<PaginationState> = useCallback(
    (arg0) => {
      const pagination = table.getState().pagination
      const next = functionalUpdate(arg0, pagination)
      if (next.pageIndex !== pagination.pageIndex || next.pageSize !== pagination.pageSize) {
        onPageChange && onPageChange(next)
        table.setState((state) => ({
          ...state,
          pagination: next,
        }))
      }
    },
    [onPageChange]
  )

  const handleRowSelectionChange: OnChangeFn<RowSelectionState> = useCallback(
    (arg0) => {
      table.setState((state) => {
        const next = functionalUpdate(arg0, state.rowSelection)
        onRowSelectionChange && onRowSelectionChange(next)
        return {
          ...state,
          rowSelection: next,
        }
      })
    },
    [onRowSelectionChange]
  )

  const pageCount =
    withPagination && total ? Math.ceil(total / table.getState().pagination.pageSize) : undefined

  table.setOptions((prev) => ({
    ...prev,
    pageCount,
    onGlobalFilterChange: handleGlobalFilterChange,
    onColumnFiltersChange: handleColumnFiltersChange,
    onSortingChange: handleSortingChange,
    onPaginationChange: handlePaginationChange,
    onRowSelectionChange: handleRowSelectionChange,
  }))

  useEffect(() => {
    if (withPagination) {
      table.setPageSize(initialState?.pagination?.pageSize || DEFAULT_INITIAL_SIZE)
    } else {
      table.setPageSize(data.length)
    }
  }, [withPagination])

  return (
    <Stack
      {...others}
      spacing={verticalSpacing}
      className={classes.wrapper}
      sx={{ backgroundColor: theme.colors.dark[8], ...others.sx }}
    >
      <Group position="apart" px="md" spacing={8}>
        {tableTitle && (
          <Title order={3} mb="md">
            {tableTitle}
          </Title>
        )}
        {withGlobalFilter && (
          <GlobalFilter table={table} className={classes.globalFilter} locale={locale} />
        )}
      </Group>
      <ScrollArea className={classes.scrollArea}>
        <LoadingOverlay visible={loading || false} overlayOpacity={0.8} />
        <MantineTable
          striped={striped}
          highlightOnHover={highlightOnHover}
          horizontalSpacing={horizontalSpacing}
          verticalSpacing={verticalSpacing}
          fontSize={fontSize}
          className={classes.table}
          style={{
            width: tableWidth,
          }}
        >
          <thead className={classes.thead} role="rowgroup">
            {table.getHeaderGroups().map((group) => (
              <tr key={group.id} className={classes.tr} role="row">
                {group.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{
                      width: header.getSize(),
                      borderRight: bordered
                        ? `1px solid ${
                            theme.colorScheme === "dark"
                              ? theme.colors.dark[4]
                              : theme.colors.gray[2]
                          }`
                        : "0",
                    }}
                    className={classes.th}
                    colSpan={header.colSpan}
                    role="columnheader"
                  >
                    {!header.isPlaceholder && (
                      <div className={classes.headerCell}>
                        <div className={classes.headerCellContent}>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </div>
                        <div className={classes.headerCellButtons}>
                          {header.column.getCanSort() && (
                            <ColumnSorter
                              className={classes.sorter}
                              column={header.column}
                              color={color}
                            />
                          )}
                          {header.column.getCanFilter() && (
                            <ColumnFilter
                              className={classes.filter}
                              column={header.column}
                              color={color}
                            />
                          )}
                        </div>
                        {header.column.getCanResize() && (
                          <div
                            className={classes.resizer}
                            onClick={(e) => e.stopPropagation()}
                            onMouseDown={header.getResizeHandler()}
                            onTouchStart={header.getResizeHandler()}
                          />
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className={classes.tbody} role="rowgroup">
            {firstRow}
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => {
                const rowProps = onRow ? onRow(row) : {}

                return (
                  <tr
                    {...rowProps}
                    key={row.id}
                    className={cx(classes.tr, rowProps.className)}
                    role="row"
                  >
                    {row.getVisibleCells().map((cell) => {
                      const cellProps = onCell ? onCell(cell) : {}
                      const cellId = (cell.row.original as any).id
                        ? (cell.row.original as any).id + "_" + cell.id
                        : cell.id
                      return (
                        <td
                          {...cellProps}
                          key={cellId}
                          style={{
                            width: cell.column.getSize(),
                            borderRight: bordered
                              ? `1px solid ${
                                  theme.colorScheme === "dark"
                                    ? theme.colors.dark[4]
                                    : theme.colors.gray[2]
                                }`
                              : "0",
                          }}
                          className={cx(classes.td, cellProps.className)}
                          role="cell"
                        >
                          <div className={classes.dataCell}>
                            <div className={classes.dataCellContent}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </div>
                          </div>
                        </td>
                      )
                    })}
                  </tr>
                )
              })
            ) : (
              <tr className={classes.tr} role="row">
                <td colSpan={table.getVisibleLeafColumns().length}>
                  <Stack align="center" spacing="xs">
                    {empty || (
                      <>
                        <IconBoxOff size={64} />
                        <Text weight="bold">No Data</Text>
                      </>
                    )}
                  </Stack>
                </td>
              </tr>
            )}
          </tbody>
        </MantineTable>
      </ScrollArea>

      {withPagination && (
        <Pagination
          table={table}
          total={total}
          pageSizes={pageSizes}
          fontSize={fontSize}
          color={color}
          classes={[
            classes.pagination,
            classes.pagination_info,
            classes.pagination_size,
            classes.pagination_page,
          ]}
          locale={locale}
          mode={paginationMode}
        />
      )}
    </Stack>
  )
}
