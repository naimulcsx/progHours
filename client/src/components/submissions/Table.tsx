import { useMemo, ReactNode } from "react"
import { usePagination, useTable, useSortBy, Column } from "react-table"
import { Submission } from "@/types/Submission"

/**
 * Import table columnes
 */
import AddEntryRow from "./AddEntryRow"
import ProblemName from "./columns/ProblemName"
import Actions from "./columns/Actions"
import Verdict from "./columns/Verdict"
import DatePicker from "./columns/DatePicker"
import SolveTime from "./columns/SolveTime"
import Tags from "./columns/Tags"

/**
 * Import Icons
 */
import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/solid"
import { Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { Pagination } from "./Pagination"

const TrackingTable = ({ submissions }: { submissions: Submission[] }) => {
  /**
   * Attach a serial number to each submissions
   */
  let k = submissions.length
  submissions.forEach((el) => (el.serial = k--))

  /**
   * Define table columns
   */
  const tableColumns = useMemo(
    () =>
      [
        {
          Header: "Id",
          accessor: "serial",
        },
        {
          Header: "Problem Name",
          accessor: "problem.name",
          Cell: ProblemName,
        },
        {
          Header: "Verdict",
          accessor: "verdict",
          Cell: Verdict,
        },
        {
          Header: "Solve Time",
          accessor: "solve_time",
          Cell: SolveTime,
        },
        {
          Header: "Tags",
          accessor: "",
          maxWidth: 400,
          minWidth: 140,
          width: 200,
          Cell: Tags,
        },
        {
          Header: "Difficulty",
          accessor: "problem.difficulty",
        },
        {
          id: "solved-at",
          Header: "Solved On",
          accessor: "solved_at",
          Cell: DatePicker,
        },
        {
          Header: "Actions",
          accessor: "id",
          Cell: Actions,
        },
      ] as Column<Submission>[],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    page,
    headerGroups,
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
      data: submissions,
      columns: tableColumns,
      initialState: {
        pageSize: 20,
        sortBy: [
          {
            id: "solved-at",
            desc: true,
          },
        ],
      },
    },
    useSortBy,
    usePagination
  )

  return (
    <Box position="relative">
      <Box mt={6} mx={-4} overflowX={{ base: "scroll", md: "visible" }}>
        <Table {...getTableProps()}>
          <Thead>
            {headerGroups.map((headerGroup) => {
              return (
                <Tr
                  fontSize="xs"
                  textTransform="uppercase"
                  bg="gray.50"
                  borderTop="1px solid"
                  borderBottom="1px solid"
                  borderColor="gray.200"
                  {...headerGroup.getHeaderGroupProps()}
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <Th
                        py={4}
                        {...header.getHeaderProps(
                          header.getSortByToggleProps()
                        )}
                      >
                        <Box display="flex" alignItems="center" minH="5">
                          <>
                            {header.render("Header")}
                            <Box display="inline" as="span" ml={1}>
                              {header.isSorted ? (
                                header.isSortedDesc ? (
                                  <ArrowSmDownIcon height={20} />
                                ) : (
                                  <ArrowSmUpIcon height={20} />
                                )
                              ) : (
                                ""
                              )}
                            </Box>
                          </>
                        </Box>
                      </Th>
                    )
                  })}
                </Tr>
              )
            })}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            <AddEntryRow id={submissions.length + 1} />
            {page.map((row) => {
              prepareRow(row)
              return (
                <Tr
                  bg="white"
                  _hover={{ bg: "gray.50" }}
                  {...row.getRowProps()}
                  key={row.original.id}
                >
                  {row.cells.map((cell) => {
                    const extraProps: {
                      [key: string]: string
                    } = {}
                    extraProps[
                      `data-${cell.column.id
                        .toLowerCase()
                        .split(" ")
                        .join("-")}`
                    ] = cell.value
                    return (
                      <Td
                        py={3}
                        borderBottom="1px solid"
                        borderColor="gray.200"
                        {...cell.getCellProps()}
                        {...extraProps}
                      >
                        {cell.render("Cell") as ReactNode}
                      </Td>
                    )
                  })}
                </Tr>
              )
            })}
          </Tbody>
        </Table>
        {/* Pagination */}
        <Pagination
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
    </Box>
  )
}

export default TrackingTable
