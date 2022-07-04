import { useMemo } from "react"
import { useTable, useSortBy, Cell, Column } from "react-table"
import { RanklistItem } from "@/types/RanklistItem"
import { Link } from "react-router-dom"

/**
 * Import Icons
 */
import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/solid"
import {
  Box,
  Table,
  Avatar,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Flex,
} from "@chakra-ui/react"
import { getAvatarColors } from "@/utils/getAvatarColors"
import { CELL_STYLES } from "./cellStyles"

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
    <Box mx={-4} overflowX="auto">
      <Table w="full" {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => {
            return (
              <Tr
                fontSize="xs"
                textColor="gray.500"
                textTransform="uppercase"
                bg="gray.100"
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <Th
                      {...header.getHeaderProps(header.getSortByToggleProps())}
                      className="py-4 border-t border-b"
                    >
                      <Flex align="center" minH="5">
                        <Box as="span">{header.render("Header")}</Box>
                        <Box as="span" ml={1}>
                          {header.isSorted ? (
                            header.isSortedDesc ? (
                              <ArrowSmDownIcon height={16} />
                            ) : (
                              <ArrowSmUpIcon height={16} />
                            )
                          ) : (
                            ""
                          )}
                        </Box>
                      </Flex>
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
                  const cellType: any = cell.column.Header
                  return (
                    <Td
                      {...cell.getCellProps()}
                      className="py-3 border-b"
                      {...CELL_STYLES[cellType]}
                    >
                      {cell.render("Cell")}
                    </Td>
                  )
                })}
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </Box>
  )
}

export default LeaderboardTable
