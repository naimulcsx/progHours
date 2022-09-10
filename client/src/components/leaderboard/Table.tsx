import { useEffect, useMemo } from "react"
import { useTable, useSortBy, Cell, Column, usePagination } from "react-table"
import { RanklistItem } from "@/types/RanklistItem"
import { Link } from "react-router-dom"

/**
 * Import Icons
 */
import {
  ArrowSmDownIcon,
  ArrowSmUpIcon,
  PlusIcon,
  FilterIcon,
  XIcon,
} from "@heroicons/react/outline"

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
  Text,
  Badge,
  Button,
  IconButton,
} from "@chakra-ui/react"
import { getAvatarColors } from "@/utils/getAvatarColors"
import { CELL_STYLES } from "./cellStyles"
import { Pagination } from "../submissions-table/Pagination"

const UserCell = (cell: Cell<RanklistItem>) => {
  return (
    <Link to={`/users/${cell.row.original.user.username}`}>
      <Flex alignItems="center" gap={4}>
        <Avatar
          name={cell.row.original.user.name}
          size="sm"
          fontWeight="bold"
        />
        <Box>
          <Text color={mode("gray.900", "white")}>{cell.value}</Text>
          <Text color={mode("gray.500", "gray.400")} fontSize="sm">
            {cell.row.original.user.username.toUpperCase()}
          </Text>
        </Box>
      </Flex>
    </Link>
  )
}

const LeaderboardTable = ({
  ranklist,
  isPublic = false,
}: {
  ranklist: RanklistItem[]
  isPublic?: boolean
}) => {
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

  const {
    getTableProps,
    prepareRow,
    headerGroups,
    page,
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
      data: ranklist,
      columns: tableColumns,
      initialState: {
        pageSize: 50,
      },
    },
    useSortBy,
    usePagination
  )

  return (
    <Box
      mx={-4}
      pb={isPublic ? [0, 0, 10] : ["104px", 14]}
      overflowX="auto"
      display="flex"
      flexDirection="column"
    >
      <Table w="full" {...getTableProps()} id="leaderboard-table">
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
                      py={3}
                      borderBottom="1px solid"
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
          {page.map((row) => {
            prepareRow(row)
            return <TableRow key={row.original.id} row={row} />
          })}
        </Tbody>
      </Table>
      <Pagination
        isPublic={isPublic}
        noMobileNavbar
        pageIndex={pageIndex}
        pageOptions={pageOptions}
        pageSize={pageSize}
        setPageSize={setPageSize}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        gotoPage={gotoPage}
        pageCount={pageCount}
        previousPage={previousPage}
        nextPage={nextPage}
      />
    </Box>
  )
}

const TableRow = ({ row }: any) => {
  return (
    <Tr
      {...row.getRowProps()}
      _hover={{ bg: mode("gray.50", "gray.750") }}
      bg={mode("white", "gray.800")}
    >
      {row.cells.map((cell: any) => {
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
}

export default LeaderboardTable
