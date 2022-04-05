import { usePagination, useTable, useSortBy, Row, Column } from "react-table"
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

import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/solid"
import {
  FiChevronsLeft,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsRight,
} from "react-icons/fi"
import { useMemo } from "react"

interface TrackingTableProps {
  submissions: Submission[]
}

const TrackingTable = (props: TrackingTableProps) => {
  const { submissions } = props
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
      <div className="mt-6 rounded-md">
        <table {...getTableProps()} className="border-collapse ">
          <thead>
            {headerGroups.map((headerGroup) => {
              return (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  className="text-base text-dark"
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        {...header.getHeaderProps(
                          header.getSortByToggleProps()
                        )}
                        className="border border-slate-100"
                      >
                        <div className="flex items-center justify-start space-x-1">
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
                  className={`bg-white`}
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
                        className="border border-slate-100"
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
        <div className="flex items-center justify-between px-6 py-3 space-x-4 bg-white pagination border border-slate-100 rounded-br-lg rounded-bl-lg">
          <div>
            <span>
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
            </span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value))
              }}
            >
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              <FiChevronsLeft size={20} />
            </button>{" "}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              <FiChevronLeft size={20} />
            </button>{" "}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              <FiChevronRight size={20} />
            </button>{" "}
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              <FiChevronsRight size={20} />
            </button>{" "}
            <span>
              | Go to page:{" "}
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                  gotoPage(page)
                }}
                style={{ width: "100px" }}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrackingTable
