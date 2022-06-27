import { Flex, Select, Button, Input, Box, Text } from "@chakra-ui/react"
import {
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/outline"

export const Pagination = (props: any) => {
  const {
    pageIndex,
    pageOptions,
    pageSize,
    setPageSize,
    canPreviousPage,
    canNextPage,
    gotoPage,
    pageCount,
    previousPage,
    nextPage,
  } = props
  return (
    <Flex
      bg="white"
      px={6}
      py={3}
      borderBottom="1px solid gray.200"
      justify="space-between"
    >
      <Flex align="center" gap={4}>
        <Box fontSize="sm">
          Page{" "}
          <span className="font-medium">
            {pageIndex + 1} of {pageOptions.length}
          </span>
        </Box>
        <Select
          size="sm"
          width={40}
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </Select>
      </Flex>
      <Box className="flex items-center space-x-4">
        <Button
          size="xs"
          variant="outline"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          <ChevronDoubleLeftIcon height={12} />
        </Button>
        <Button
          size="xs"
          variant="outline"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          <ChevronLeftIcon height={12} />
        </Button>
        <Button
          size="xs"
          variant="outline"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          <ChevronRightIcon height={12} />
        </Button>
        <Button
          size="xs"
          variant="outline"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          <ChevronDoubleRightIcon height={12} />
        </Button>
        <Flex align="center" className="space-x-2">
          <Text fontSize="sm">Go to page : </Text>
          <Input
            size="sm"
            w="20"
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
          />
        </Flex>
      </Box>
    </Flex>
  )
}
