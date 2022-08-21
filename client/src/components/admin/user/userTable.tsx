import { useMemo, useState } from "react"
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
} from "@chakra-ui/react"
import { Column, usePagination, useSortBy, useTable } from "react-table"
import {
  ArrowSmDownIcon,
  ArrowSmUpIcon,
  PencilAltIcon,
} from "@heroicons/react/outline"
import { User } from "@/GlobalStateProvider"
import EditUserTable from "./EditUserTable"
import { Link } from "react-router-dom"
import { getAvatarColors } from "@/utils/getAvatarColors"
import { CELL_STYLES } from "./cellStyles"
import { Pagination } from "@/components/submissions-table/Pagination"

export default function UserManagementTable({ users }: { users: User[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState({})

  const tableColumns = useMemo(() => {
    return [
      {
        Header: "ID",
        accessor: (row) => row.id,
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ cell }) => {
          return (
            <Link to={`/users/${cell.row.original.username}`}>
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
        Header: "University ID",
        accessor: (row) => row.username.toUpperCase(),
      },
      {
        Header: "department",
        accessor: "department",
        Cell: ({ cell }) => (cell.value ? cell.value : "—"),
      },
      {
        Header: "batch",
        accessor: "batch",
        Cell: ({ cell }) => (cell.value ? cell.value : "—"),
      },
      {
        Header: "mobile",
        accessor: "mobile",
        Cell: ({ cell }) => (cell.value ? cell.value : "—"),
      },
      {
        Header: "cgpa",
        accessor: "cgpa",
        Cell: ({ cell }) => (cell.value ? cell.value.toFixed(2) : "—"),
      },
      {
        Header: "role",
        accessor: "role",
        Cell: ({ cell }) => {
          const props: any = {
            ADMIN: {
              colorScheme: "green",
            },
            USER: {
              colorScheme: "purple",
            },
          }
          return (
            <Badge {...props[cell.value]} variant="subtle">
              {cell.value}
            </Badge>
          )
        },
      },
      {
        Header: "action",
        Cell: ({ cell }: any) => {
          return (
            <Button
              variant="outline"
              size="xs"
              colorScheme="green"
              aria-label="Edit User Button"
              onClick={() => {
                setData(cell.row.original)
                setIsOpen(true)
              }}
            >
              <PencilAltIcon width={16} height={16} />
            </Button>
          )
        },
      },
    ] as Column<User>[]
  }, [])

  const {
    getTableProps,
    rows,
    prepareRow,
    headerGroups,
    getTableBodyProps,
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
      data: users,
      columns: tableColumns,
      initialState: {
        pageSize: 20,
      },
    },
    useSortBy,
    usePagination
  )

  return (
    <>
      <EditUserTable data={data} isOpen={isOpen} setIsOpen={setIsOpen} />
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
                        {...header.getHeaderProps(
                          header.getSortByToggleProps()
                        )}
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
      </Box>
      <Pagination
        isEditable={true}
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
    </>
  )
}
