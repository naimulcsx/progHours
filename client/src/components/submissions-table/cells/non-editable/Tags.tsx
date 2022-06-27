import { useContext } from "react"
import { Cell } from "react-table"

/**
 * Import types
 */
import { Tag } from "@/types/Tag"
import { Submission } from "@/types/Submission"
import { UserProblemTag } from "@/types/UserProblemTag"

/**
 * Import components
 */
import TagInputPopup from "@/components/submissions/TagInputPopup"
import { GlobalContext } from "@/GlobalStateProvider"
import { Badge, Flex } from "@chakra-ui/react"

const NonEditableTags = (cell: Cell<Submission>) => {
  const { tags } = cell.row.original.problem
  return (
    <Flex gap={2} flexWrap="wrap">
      {tags.map((tag: Tag) => {
        return (
          <Badge
            bg="blue.50"
            color="blue.500"
            fontWeight={500}
            py={1}
            px={2}
            key={tag.id}
          >
            {tag.name}
          </Badge>
        )
      })}
    </Flex>
  )
}
export default NonEditableTags
