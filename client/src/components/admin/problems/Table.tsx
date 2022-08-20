import { useMemo } from "react"
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
} from "@chakra-ui/react"
import { Column, useSortBy, useTable } from "react-table"
import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/outline"
import { Users } from "@/types/User"

import { Link } from "react-router-dom"
import { getAvatarColors } from "@/utils/getAvatarColors"
import { CELL_STYLES } from "./cellStyles"

export default function UserManagementTable({ prob }) {
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
            <Link to={`/problems/${cell.row.original.id}`}>
              <Flex alignItems="center" gap={4}>
                <Avatar
                  name={cell.row.original.name}
                  size="sm"
                  {...getAvatarColors(cell.row.original.name)}
                />
                <Box>
                  <Text color={mode("gray.700", "white")}>{cell.value}</Text>
                </Box>
              </Flex>
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
    ]
  }, [])

  const { getTableProps, rows, prepareRow, headerGroups, getTableBodyProps } =
    useTable(
      {
        data: prob,
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
    </Box>
  )
}
