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
} from "@chakra-ui/react"
import { Column, useSortBy, useTable } from "react-table"
import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/outline"
import { Users } from "@/types/User"
import { PencilIcon } from "@heroicons/react/solid"
import EditUserTable from "./EditUserTable"

export default function UserManagementTable({ users }: { users: Users[] }) {
  console.log(users)
  // define table columns
  const tableColumns = useMemo(() => {
    return [
      {
        Header: "#",
        accessor: (row: Users, i: number) => i + 1,
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "University ID",
        accessor: (row) => row.username.toUpperCase(),
      },
      {
        Header: "department",
        accessor: "department",
      },
      {
        Header: "batch",
        accessor: "batch",
      },
      {
        Header: "mobile",
        accessor: "mobile",
      },
      {
        Header: "cgpa",
        accessor: "cgpa",
      },
      {
        Header: "role",
        accessor: "role",
      },
      {
        Header: "action",
        accessor: "action",
        Cell: EditUserTable,
      },
    ] as Column<Users>[]
  }, [])

  const { getTableProps, rows, prepareRow, headerGroups, getTableBodyProps } =
    useTable(
      {
        data: users,
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
                  // console.log(cell)

                  return (
                    <Td
                      {...cell.getCellProps()}
                      className="py-3 border-b"
                      borderColor={mode("gray.200", "gray.700")}
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
