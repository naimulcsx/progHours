import {
  Flex,
  Select,
  Button,
  Input,
  Box,
  Text,
  useColorModeValue as mode,
  HStack,
} from "@chakra-ui/react"
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
      bg={mode("white", "gray.800")}
      px={6}
      py={[2, 3]}
      borderTop="1px solid"
      borderColor={mode("gray.200", "gray.700")}
      justify="space-between"
      position="fixed"
      bottom={props.isPublic ? 0 : [14, 0]}
      right={0}
      left={props.isPublic ? 0 : [0, "220px"]}
    >
      <Flex align="center" gap={4}>
        <Box fontSize={["xs", "sm"]}>
          <span className="font-medium">
            {pageIndex + 1} / {pageOptions.length}
          </span>
        </Box>
        <Select
          size="sm"
          fontSize={["xs", "sm"]}
          width={32}
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
      <HStack>
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
      </HStack>
    </Flex>
  )
}
