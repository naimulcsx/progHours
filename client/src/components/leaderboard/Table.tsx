import { useMemo } from "react"
import { useTable, useSortBy, Cell, Column } from "react-table"
import { RanklistItem } from "@/types/RanklistItem"
import { Link } from "react-router-dom"

/**
 * Import Icons
 */
import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/solid"
import { Table, Avatar, Thead, Tr, Th, Td, Tbody } from "@chakra-ui/react"
import { getAvatarColors } from "@/utils/getAvatarColors"

const UserCell = (cell: Cell<RanklistItem>) => {
  return (
    <Link to={`/users/${cell.row.original.user.username}`}>
      <div className="flex items-center space-x-4">
        <Avatar
          name={cell.row.original.user.name}
          size="sm"
          {...getAvatarColors(cell.row.original.user.name)}
        />
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
      <Table w="full" {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => {
            return (
              <Tr
                {...headerGroup.getHeaderGroupProps()}
                className="text-xs text-gray-500 uppercase bg-gray-100"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <Th
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
                    </Th>
                  )
                })}
              </Tr>
            )
          })}
        </Thead>
        <Tbody>
          {rows.map((row) => {
            prepareRow(row)
            return (
              <Tr {...row.getRowProps()} className={`bg-white`}>
                {row.cells.map((cell) => {
                  return (
                    <Td {...cell.getCellProps()} className="py-3 border-b">
                      {cell.render("Cell")}
                    </Td>
                  )
                })}
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </div>
  )
}

export default LeaderboardTable
