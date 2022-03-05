import { usePagination, useTable, useSortBy } from "react-table"
import EmptyState from "@/components/submissions/EmptyState"

// import columns components
import ProblemName from "./columns/ProblemName"
import Actions from "./columns/Actions"
import Verdict from "./columns/Verdict"
import DatePicker from "./columns/DatePicker"
import AddEntryRow from "./AddEntryRow"
import SolveTime from "./columns/SolveTime"
import Tags from "./columns/Tags"
import { useEffect, useState } from "react"
import moment from "moment"

const practiceColumns = [
  {
    Header: "Id",
    accessor: "idx",
  },
  {
    Header: "Problem Name",
    accessor: (row) =>
      `${row.problem.pid}|-|${row.problem.name}|-|${row.problem.link}`,
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
    accessor: (row) => row.problem.tags.map((tag) => tag.name).join(", "),
    Cell: Tags,
  },
  {
    Header: "Difficulty",
    accessor: "problem.difficulty",
  },
  {
    id: "solved-at",
    Header: "Date",
    accessor: "solved_at",
    Cell: DatePicker,
  },
  {
    Header: "Actions",
    accessor: (row) => row.id,
    Cell: Actions,
  },
]

const TrackingTable = ({ submissions }) => {
  let k = submissions.length
  submissions.forEach((el) => (el.idx = k--))

  const tableInstance = useTable(
    {
      data: submissions,
      columns: practiceColumns,
      initialState: {
        pageSize: 10,
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
  const {
    getTableProps,
    getTableBodyProps,
    rows,
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
  } = tableInstance

  return (
    <div className="mt-6">
      <table {...getTableProps()} className="border-collapse">
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
                      {...header.getHeaderProps(header.getSortByToggleProps())}
                      className="border border-slate-100"
                    >
                      {header.render("Header")}
                    </th>
                  )
                })}
              </tr>
            )
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          <AddEntryRow id={submissions.length + 1} />
          {rows.map((row) => {
            prepareRow(row)
            return (
              <tr
                {...row.getRowProps()}
                key={row.original.id}
                className={`bg-white`}
              >
                {row.cells.map((cell) => {
                  const extraProps = {}
                  extraProps[
                    `data-${cell.column.id.toLowerCase().split(" ").join("-")}`
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
      {/* <div className="flex items-center justify-between px-6 py-3 space-x-4 bg-white pagination">
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
      </div> */}
      {submissions.length === 0 && <EmptyState />}
    </div>
  )
}

export default TrackingTable
