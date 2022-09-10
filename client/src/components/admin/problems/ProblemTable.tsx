import { useMemo } from "react"
import {
  Box,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Flex,
  useColorModeValue as mode,
  Text,
} from "@chakra-ui/react"
import {
  Column,
  useSortBy,
  useTable,
  usePagination,
  useGlobalFilter,
} from "react-table"
import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/outline"

import { Link } from "react-router-dom"
import { CELL_STYLES } from "./cellStyles"
import { Problem } from "@/types/Problem"
import { Pagination } from "@/components/submissions-table/Pagination"
import GlobalFilter from "./GlobalFilter"
export default function ProblemManagementTable({
  problems,
}: {
  problems: Problem
}) {
  const tableColumns = useMemo(() => {
    return [
      {
        Header: "Index",
        accessor: (row) => row.id,
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ cell }) => {
          return (
            <Link to={`/admin/problems/${cell.row.original.pid}`}>
              <Box>
                <Text color={mode("gray.700", "white")}>{cell.value}</Text>
              </Box>
            </Link>
          )
        },
      },
      {
        Header: "Problem ID",
        accessor: (row) => row.pid,
      },
      {
        Header: "Difficulty",
        accessor: (row) => row.difficulty,
      },
      {
        Header: "onlineJudge",
        accessor: (row) => row.onlineJudgeId,
      },
    ] as Column<Problem>[]
  }, [])

  const {
    getTableProps,
    getTableBodyProps,
    rows,
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
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {
      /* @ts-ignore */
      data: problems,
      columns: tableColumns,
      initialState: {
        pageSize: 50,
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  )

  return (
    <Box mx={-4} overflowX="auto">
      <GlobalFilter
        filter={globalFilter}
        setFilter={setGlobalFilter}
      ></GlobalFilter>
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
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            return (
              <Tr
                {...row.getRowProps()}
                _hover={{ bg: mode("gray.50", "gray.700") }}
                bg={mode("white", "gray.800")}
              >
                {row.cells.map((cell) => {
                  return (
                    <Td
                      {...cell.getCellProps()}
                      color={mode("gray.700", "white")}
                      borderColor={mode("gray.200", "gray.700")}
                      {...CELL_STYLES[cell.column.Header as string]}
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
      <Pagination
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
