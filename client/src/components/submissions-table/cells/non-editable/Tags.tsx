import { Cell } from "react-table"

/**
 * Import types
 */
import { Tag } from "@/types/Tag"
import { Submission } from "@/types/Submission"
import { useColorModeValue as mode } from "@chakra-ui/react"

/**
 * Import components
 */
import { Badge, Flex } from "@chakra-ui/react"

const NonEditableTags = (cell: Cell<Submission>) => {
  const { tags } = cell.row.original.problem
  if (tags.length === 0) return "—"
  return (
    <Flex gap={2} flexWrap="wrap">
      {tags.map((item: any, index) => {
        // TODO: Fix the type
        return (
          <Badge
            bg={mode("blue.50", "gray.700")}
            color={mode("blue.500", "gray.200")}
            fontWeight={500}
            py={1}
            px={2}
            key={index}
          >
            {item.tag.name}
          </Badge>
        )
      })}
    </Flex>
  )
}
export default NonEditableTags
