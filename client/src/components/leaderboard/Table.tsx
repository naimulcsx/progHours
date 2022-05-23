import { useMemo } from "react"
import { useTable, useSortBy, Cell, Column } from "react-table"
import { RanklistItem } from "@/types/RanklistItem"
import { Link } from "react-router-dom"

/**
 * Import Icons
 */
import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/solid"
import Avatar from "../Avatar"

const UserCell = (cell: Cell<RanklistItem>) => {
  return (
    <Link to={`/users/${cell.row.original.user.username}`}>
      <div className="flex items-center space-x-4">
        <Avatar name={cell.row.original.user.name} />
        <div>
          <p className="font-medium text-gray-900">{cell.value}</p>
          <p className="text-sm text-gray-500">
            {cell.row.original.user.username.toUpperCase()}
          </p>
        </div>
      </div>
    </Link>
  )
}

const LeaderboardTable = ({ ranklist }: { ranklist: RanklistItem[] }) => {
  /**
   * Define table columns
   */
  const tableColumns = useMemo(
    () =>
      [
        {
          Header: "#",
          accessor: (row: RanklistItem, i: number) => i + 1,
        },
        {
          Header: "Name",
          accessor: "user.name",
          Cell: UserCell,
        },
        {
          Header: "Solve Count",
          accessor: "total_solved",
        },
        {
          Header: "Solve Time",
          accessor: "total_solve_time",
        },
        {
          Header: "Average Solve Difficulty",
          accessor: "average_difficulty",
        },
        {
          Header: "Points",
          accessor: (row: RanklistItem) => row.points.toFixed(2),
        },
      ] as Column<RanklistItem>[],
    []
  )

  const { getTableProps, rows, prepareRow, headerGroups } = useTable(
    {
      data: ranklist,
      columns: tableColumns,
    },
    useSortBy
  )

  return (
    <div className="-mx-4 overflow-x-scroll md:overflow-clip">
      <table
        {...getTableProps()}
        className="text-gray-700 border-collapse leaderboard max-w-6"
      >
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
                      {...header.getHeaderProps(header.getSortByToggleProps())}
                      className="py-4 border-t border-b"
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
        <tbody>
          {rows.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} className={`bg-white`}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} className="py-3 border-b">
                      {cell.render("Cell")}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default LeaderboardTable
