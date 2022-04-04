import { usePagination, useTable, useSortBy } from "react-table"

import ProblemName from "../submissions/columns/ProblemName"
import DatePicker from "../submissions/columns/DatePicker"
import Tags from "../submissions/columns/Tags"

import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/solid"
import {
  FiChevronsLeft,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsRight,
} from "react-icons/fi"

const columns = [
  {
    Header: "Problem Name",
    accessor: (row) =>
      `${row.problem.pid}|-|${row.problem.name}|-|${row.problem.link}`,
    Cell: ProblemName,
  },
  {
    Header: "Verdict",
    accessor: "verdict",
  },
  {
    Header: "Solve Time",
    accessor: "solve_time",
  },

  {
    Header: "Tags",
    accessor: (row) => row.problem.tags.map((tag) => tag.name).join(", "),
  },
  {
    Header: "Difficulty",
    accessor: "problem.difficulty",
  },
  {
    id: "solved-at",
    Header: "Solved at",
    accessor: "solved_at",
    cell: DatePicker,
  },
]

export default function ProfileTable({ submissionList }) {
  const tableInstance = useTable(
    {
      data: submissionList,
      columns,
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
    <div className="shadow shadow-primary/5 rounded-lg overflow-hidden mx-36 my-8">
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
                      {...header.getHeaderProps(header.getSortByToggleProps())}
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
          {page.map((row) => {
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
      {/* {submissions.length === 0 && <EmptyState />} */}
    </div>
  )
}
/*
 */
