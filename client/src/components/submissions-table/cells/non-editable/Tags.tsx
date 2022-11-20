import { Cell } from "react-table"

/**
 * Import types
 */
import { Tag } from "~/types/Tag"
import { Submission } from "~/types/Submission"
import { useColorModeValue as mode } from "@chakra-ui/react"
import { CellContext } from "@tanstack/react-table"
import { Badge, Group } from "@mantine/core"

/**
 * Import components
 */

const NonEditableTags = (cell: CellContext<Submission, unknown>) => {
  const { tags } = cell.row.original.problem
  if (tags.length === 0) return "—"
  return (
    <Group spacing="xs">
      {tags.map((item: any, index) => {
        // TODO: Fix the type
        return (
          <Badge
            sx={(theme) => ({
              borderRadius: 4,
              paddingLeft: 8,
              paddingRight: 8,
              fontWeight: 600,
              background: theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.blue[0],
            })}
            key={index}
          >
            {item.tag.name}
          </Badge>
        )
      })}
    </Group>
  )
}
export default NonEditableTags
