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
  useColorModeValue as mode,
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
          <p className="font-medium " color={mode("gray.900","white")} >{cell.value}</p>
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
          accessor: "totalSolved",
        },
        {
          Header: "Solve Time",
          accessor: "totalSolveTime",
        },
        {
          Header: "Average Difficulty",
          accessor: (row: RanklistItem) => row.averageDifficulty.toFixed(2),
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
                textColor="gray.500"
                textTransform="uppercase"
                bg={mode("gray.100", "gray.900")}
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <Th
                      {...header.getHeaderProps(header.getSortByToggleProps())}
                      className="py-4 border-t border-b"
                      borderColor={mode("gray.200", "gray.700")}
                      letterSpacing="-0.5px"
                    >
                      <Flex align="center" minH="5">
                        <Box as="span" fontSize={["11px", "xs"]}>
                          {header.render("Header")}
                        </Box>
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
              <Tr
                {...row.getRowProps()}
                _hover={{ bg: mode("gray.50", "gray.700") }}
                bg={mode("white", "gray.800")}
              >
                {row.cells.map((cell) => {
                  const cellType: any = cell.column.Header
                  return (
                    <Td
                      {...cell.getCellProps()}
                      className="py-3 border-b"
                      borderColor={mode("gray.200", "gray.700")}
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
