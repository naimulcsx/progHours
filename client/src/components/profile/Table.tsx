import { useMemo } from "react"
import { usePagination, useTable, useSortBy, Cell, Column } from "react-table"
import { Submission } from "@/types/Submission"

import ProblemName from "../submissions/columns/ProblemName"
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

export default function ProfileTable({
  submissions,
}: {
  submissions: Submission[]
}) {
  const tableColumns = useMemo(
    () =>
      [
        {
          Header: "Problem Name",
          accessor: (row: Submission) =>
            `${row.problem.pid}|-|${row.problem.name}|-|${row.problem.link}`,
          Cell: ProblemName,
        },
        {
          Header: "Verdict",
          accessor: "verdict",
          Cell: (cell: Cell<Submission>) => {
            const styles: any = {
              AC: "bg-lime-200 text-lime-900 rounded w-full font-medium text-center",
              WA: "bg-red-200 text-red-900 rounded w-full font-medium text-center",
              RTE: "bg-pink-200 text-pink-900 rounded w-full font-medium text-center",
              TLE: "bg-amber-200 text-amber-900 rounded w-full font-medium text-center",
              MLE: "bg-cyan-200 text-cyan-900 rounded w-full font-medium text-center",
            }
            let value = cell.value
            return (
              <div className="flex items-center justify-center">
                <p className={styles[cell.value]}> {cell.value}</p>
              </div>
            )
          },
        },
        {
          Header: "Solve Time",
          accessor: "solve_time",
          Cell: (cell: Cell<Submission>) => {
            return <div className="text-center">{cell.value}</div>
          },
        },
        {
          Header: "Tags",
          accessor: (row) => row.problem.tags.map((tag) => tag.name).join(", "),
          Cell: (cell: Cell<Submission>) => {
            const row = cell.row.original
            const { id, tags, user_problem_tags } = row.problem
            return (
              <ul className="tags-ul flex flex-wrap items-center gap-2">
                {tags.map((tag) => {
                  return (
                    <li
                      key={tag.id}
                      className="px-2 py-1 text-sm rounded-lg bg-primary bg-opacity-10 text-primary"
                    >
                      {tag.name}
                    </li>
                  )
                })}
              </ul>
            )
          },
        },
        {
          Header: "Difficulty",
          accessor: "problem.difficulty",
        },
        {
          id: "solved-at",
          Header: "Solved at",
          accessor: "solved_at",
          Cell: (cell: Cell<Submission>) => {
            return <div>{new Date(cell.value).toDateString()}</div>
          },
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

  return (
    <div className="shadow shadow-primary/5 rounded-lg overflow-hidden mx-36 my-16">
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
                  const extraProps: {
                    [key: string]: string
                  } = {}
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
      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-3 space-x-4 bg-white pagination border-l border-r border-b border-slate-100 rounded-br-lg rounded-bl-lg">
        <div>
          <span>
            Page{" "}
            <span className="font-medium">
              {pageIndex + 1} of {pageOptions.length}
            </span>
          </span>
          <select
            value={pageSize}
            className="py-1 border-b ml-4"
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
            className="border p-1 rounded"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            <ChevronDoubleLeftIcon className="h-4" />
          </button>
          <button
            className="border p-1 rounded"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <ChevronLeftIcon className="h-4" />
          </button>
          <button
            className="border p-1 rounded"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            <ChevronRightIcon className="h-4" />
          </button>
          <button
            className="border p-1 rounded"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            <ChevronDoubleRightIcon className="h-4" />
          </button>
          <span className="space-x-2">
            <span className="font-medium">Go to page : </span>
            <input
              className="border-b w-16 py-1"
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
  )
}
