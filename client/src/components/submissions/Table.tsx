import { useMemo } from "react"
import { usePagination, useTable, useSortBy, Column } from "react-table"
import { Submission } from "@/types/Submission"

/**
 * Import table columnes
 */
import AddEntryRow from "./AddEntryRow"
import ProblemName from "./columns/ProblemName"
import Actions from "./columns/Actions"
import Verdict from "./columns/Verdict"
import DatePicker from "./columns/DatePicker"
import SolveTime from "./columns/SolveTime"
import Tags from "./columns/Tags"

/**
 * Import Icons
 */
import {
  ArrowSmDownIcon,
  ArrowSmUpIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/solid"

const TrackingTable = ({ submissions }: { submissions: Submission[] }) => {
  /**
   * Attach a serial number to each submissions
   */
  let k = submissions.length
  submissions.forEach((el) => (el.serial = k--))

  /**
   * Define table columns
   */
  const tableColumns = useMemo(
    () =>
      [
        {
          Header: "Id",
          accessor: "serial",
        },
        {
          Header: "Problem Name",
          accessor: "problem.name",
          Cell: ProblemName,
        },
        {
          Header: "Verdict",
          accessor: "verdict",
          Cell: Verdict,
        },
        {
          Header: "Solve Time",
          accessor: "solve_time",
          Cell: SolveTime,
        },
        {
          Header: "Tags",
          accessor: "",
          maxWidth: 400,
          minWidth: 140,
          width: 200,
          Cell: Tags,
        },
        {
          Header: "Difficulty",
          accessor: "problem.difficulty",
        },
        {
          id: "solved-at",
          Header: "Solved On",
          accessor: "solved_at",
          Cell: DatePicker,
        },
        {
          Header: "Actions",
          accessor: "id",
          Cell: Actions,
        },
      ] as Column<Submission>[],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    page,
    headerGroups,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      data: submissions,
      columns: tableColumns,
      initialState: {
        pageSize: 20,
        sortBy: [
          {
            id: "solved-at",
            desc: true,
          },
        ],
      },
    },
    useSortBy,
    usePagination
  )

  return (
    <div className="relative">
      <div className="mt-6 -mx-4 overflow-x-scroll rounded-lg md:overflow-visible">
        <table {...getTableProps()} className="border-collapse">
          <thead>
            {headerGroups.map((headerGroup) => {
              return (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  className="text-xs text-gray-500 uppercase bg-gray-100"
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        {...header.getHeaderProps(
                          header.getSortByToggleProps()
                        )}
                        className="py-4 border-t border-b"
                      >
                        <div className="flex items-center justify-start">
                          <span>{header.render("Header")}</span>
                          <span>
                            {header.isSorted ? (
                              header.isSortedDesc ? (
                                <ArrowSmDownIcon height={20} />
                              ) : (
                                <ArrowSmUpIcon height={20} />
                              )
                            ) : (
                              ""
                            )}
                          </span>
                        </div>
                      </th>
                    )
                  })}
                </tr>
              )
            })}
          </thead>
          <tbody {...getTableBodyProps()}>
            <AddEntryRow id={submissions.length + 1} />
            {page.map((row) => {
              prepareRow(row)
              return (
                <tr
                  {...row.getRowProps()}
                  key={row.original.id}
                  className={`bg-white hover:bg-gray-100`}
                >
                  {row.cells.map((cell) => {
                    const extraProps: {
                      [key: string]: string
                    } = {}
                    extraProps[
                      `data-${cell.column.id
                        .toLowerCase()
                        .split(" ")
                        .join("-")}`
                    ] = cell.value
                    return (
                      <td
                        {...cell.getCellProps()}
                        {...extraProps}
                        className="py-3 border-b"
                      >
                        {cell.render("Cell")}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-3 space-x-4 bg-white border-b pagination">
          <div>
            <span>
              Page{" "}
              <span className="font-medium">
                {pageIndex + 1} of {pageOptions.length}
              </span>
            </span>
            <select
              value={pageSize}
              className="py-1 ml-4 border-b"
              onChange={(e) => {
                setPageSize(Number(e.target.value))
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <button
              className="p-1 border rounded"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              <ChevronDoubleLeftIcon className="h-4" />
            </button>
            <button
              className="p-1 border rounded"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              <ChevronLeftIcon className="h-4" />
            </button>
            <button
              className="p-1 border rounded"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              <ChevronRightIcon className="h-4" />
            </button>
            <button
              className="p-1 border rounded"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              <ChevronDoubleRightIcon className="h-4" />
            </button>
            <span className="space-x-2">
              <span className="font-medium">Go to page : </span>
              <input
                className="w-16 py-1 border-b"
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                  gotoPage(page)
                }}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrackingTable
