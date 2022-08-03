import { useMemo, ReactNode } from "react"
import { usePagination, useTable, useSortBy, Column } from "react-table"
import { Submission } from "@/types/Submission"
import { useColorModeValue as mode } from "@chakra-ui/react"

/**
 * Import table columnes
 */
import SubmissionForm from "./SubmissionForm"

/**
 * Import Icons
 */
import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/solid"
import { Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { Pagination } from "./Pagination"
import { getTableColumns } from "./getTableColumns"
import { CELL_STYLES } from "./cells/cellStyles"

export const SubmissionsTable = ({
  submissions,
  isEditable = false,
}: {
  submissions: Submission[]
  isEditable?: boolean
}) => {
  /**
   * Attach a serial number to each submissions
   */
  let k = submissions.length
  submissions.forEach((el) => (el.serial = k--))

  /**
   * Define table columns
   */
  const tableColumns = useMemo(() => getTableColumns(isEditable), [])

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
    <Box position="relative" pb={[24, 10]}>
      <Box
        mt={isEditable ? 6 : 2}
        mx={isEditable ? -4 : 0}
        shadow={isEditable ? "initial" : "base"}
        rounded={isEditable ? "none" : "lg"}
      >
        <Table overflowX="auto" {...getTableProps()}>
          <Thead>
            {headerGroups.map((headerGroup) => {
              return (
                <Tr
                  fontSize="xs"
                  textTransform="uppercase"
                  bg={mode("gray.100", "gray.900")}
                  borderTop="1px solid"
                  borderBottom="1px solid"
                  borderColor={mode("gray.200", "gray.700")}
                  {...headerGroup.getHeaderGroupProps()}
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <Th
                        py={4}
                        letterSpacing="-0.5px"
                        {...header.getHeaderProps(
                          header.getSortByToggleProps()
                        )}
                        border={0}
                      >
                        <Box display="flex" alignItems="center" minH="5">
                          <>
                            {header.render("Header")}
                            <Box display="inline" as="span" ml={1}>
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
            {isEditable && <SubmissionForm id={submissions.length + 1} />}
            {page.map((row) => {
              prepareRow(row)
              return (
                <Tr
                  bg={mode("white", "gray.800")}
                  _hover={{ bg: mode("gray.50", "gray.700") }}
                  {...row.getRowProps()}
                  key={row.original.id}
                >
                  {row.cells.map((cell) => {
                    const cellType: any = cell.column.Header
                    return (
                      <Td
                        h={16}
                        minH={16}
                        borderBottom="1px solid"
                        borderColor={mode("gray.200", "gray.700")}
                        fontSize="sm"
                        {...cell.getCellProps()}
                        {...CELL_STYLES[cellType]}
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
          isEditable={isEditable}
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
