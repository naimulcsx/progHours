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
  Button,
  HStack,
} from "@chakra-ui/react"
import {
  Column,
  useSortBy,
  useTable,
  usePagination,
  useGlobalFilter,
  useFilters,
} from "react-table"
import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/outline"

import { Link } from "react-router-dom"
import { CELL_STYLES } from "./cellStyles"
import { Problem } from "@/types/Problem"
import { Pagination } from "@/components/submissions-table/Pagination"
import InputFilter from "./InputFilter"

import {
  CFIcon,
  SPOJIcon,
  CCIcon,
  LightOJIcon,
  UVAIcon,
  CSESIcon,
  TophIcon,
  AtCoder,
  EOlympIcon,
  BeeCrowd,
  HackerRankIcon,
  LeetCodeIcon,
  TimusIcon,
  CodeToWinIcon,
  HackerEarthIcon,
  KattisOJIcon,
} from "@/components/Icons"

const onlineJudges = {
  All: { prefix: "", icon: null },
  Gym: { prefix: "Gym-", icon: CFIcon },
  CodeForces: { prefix: "CF-", icon: CFIcon },
  SPOJ: { prefix: "SPOJ-", icon: SPOJIcon },
  CodeChef: { prefix: "CC-", icon: CCIcon },
  LOJ: { prefix: "LOJ-", icon: LightOJIcon },
  UVA: { prefix: "UVA-", icon: UVAIcon, spacing: 1 },
  CSES: { prefix: "CSES-", icon: CSESIcon, spacing: 1 },
  Toph: { prefix: "Toph-", icon: TophIcon },
  AtCoder: { prefix: "AC-", icon: AtCoder },
  Eolymp: { prefix: "Eolymp-", icon: EOlympIcon },
  HackerRank: { prefix: "HR-", icon: HackerRankIcon, spacing: 1 },
  LeetCode: { prefix: "LC-", icon: LeetCodeIcon },
  Timus: { prefix: "Tim-", icon: TimusIcon },
  CodeToWin: { prefix: "CW-", icon: CodeToWinIcon, spacing: 1 },
  Kattis: { prefix: "KT-", icon: KattisOJIcon },
}

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
            <Box>
              <Text color={mode("gray.700", "white")}>{cell.value}</Text>
            </Box>
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
      {
        Header: "action",
        Cell: ({ cell }: any) => {
          return (
            <Link to={`/admin/problems/${cell.row.original.pid}`}>
              <Button
                variant="link"
                size="sm"
                colorScheme="blue"
                aria-label="Edit User Button"
                // onClick={() => {
                //   setData(cell.row.original)
                //   setIsOpen(true)
                // }}
              >
                {/* <PencilAltIcon width={16} height={16} /> */}
                Edit
              </Button>
            </Link>
          )
        },
      },
    ] as Column<Problem>[]
  }, [])

  const {
    getTableProps,
    getTableBodyProps,
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
    setFilter,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter, filters },
  } = useTable(
    {
      /* @ts-ignore */
      data: problems,
      columns: tableColumns,
      initialState: {
        pageSize: 20,
      },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  )

  return (
    <Box mx={-4} overflowX="auto">
      <HStack flexWrap="wrap" mx={4} mb={4}>
        {Object.entries(onlineJudges).map(([key, value], idx) => {
          let isActive = filters[0]?.value === value.prefix
          if (idx == 0 && filters.length == 0) isActive = true
          return (
            <Button
              key={key}
              size="sm"
              border="1px"
              borderColor={isActive ? "blue.500" : "blue.200"}
              borderStyle="solid"
              bg={isActive ? "blue.500" : "blue.50"}
              color={isActive ? "white" : "blue.600"}
              _hover={{
                color: "white",
                bg: "blue.500",
                borderColor: "blue.500",
              }}
              onClick={() => {
                setFilter("Problem ID", value.prefix)
              }}
            >
              {key}
            </Button>
          )
        })}
      </HStack>

      <InputFilter
        filter={globalFilter}
        setFilter={setGlobalFilter}
      ></InputFilter>

      {/* <pre>
        <code>{JSON.stringify(filters, null, 2)}</code>
      </pre> */}

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
          {page.map((row) => {
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
