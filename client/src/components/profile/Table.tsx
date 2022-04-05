import { usePagination, useTable, useSortBy } from "react-table"

import ProblemName from "../submissions/columns/ProblemName"
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
    Cell: (cell) => {
      const styles = {
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
  },

  {
    Header: "Tags",
    accessor: (row) => row.problem.tags.map((tag) => tag.name).join(", "),
    Cell: (cell) => {
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
  /*
  {cell.problem.tags.map((tag: Tag) => {
            return (
              <li
                key={tag.id}
                className="px-2 py-1 text-sm rounded-lg bg-primary bg-opacity-10 text-primary"
              >
                {tag.name}
              </li>
            )
          })}
  */
  {
    Header: "Difficulty",
    accessor: "problem.difficulty",
  },
  {
    id: "solved-at",
    Header: "Solved at",
    accessor: "solved_at",
    Cell: (cell) => {
      return <div>{new Date(cell.value).toDateString()}</div>
    },
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
