import { useMemo } from "react"
import { useTable, useSortBy, Cell, Column } from "react-table"
import { RanklistItem } from "@/types/RanklistItem"

/**
 * Import Icons
 */
import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/solid"

const UserCell = (cell: Cell<RanklistItem>) => {
  return (
    <div className="flex items-center space-x-4">
      <img
        src={`https://robohash.org/${cell.value}?bgset=bg2&size=40x40`}
        className="rounded-full"
      />
      <div>
        <p className="font-medium">{cell.value}</p>
        <p className="text-sm text-gray-500">{cell.row.original.username}</p>
      </div>
    </div>
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
          accessor: "name",
          Cell: UserCell,
        },
        {
          Header: "Solve Count",
          accessor: "solve_count",
        },
        {
          Header: "Solve Time",
          accessor: "solve_time",
        },
        {
          Header: "Average Solve Difficulty",
          accessor: "avg_difficulty",
        },
        {
          Header: "Points",
          accessor: (row: RanklistItem) => row.points.toFixed(3),
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
    <div className="shadow shadow-primary/5 rounded-lg overflow-y-scroll">
      <table
        {...getTableProps()}
        className="border-collapse leaderboard max-w-6 xl"
      >
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
                      className=" border-b border-t border-slate-100"
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
                    <td
                      {...cell.getCellProps()}
                      className="border-b border-slate-100"
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
    </div>
  )
}

export default LeaderboardTable
