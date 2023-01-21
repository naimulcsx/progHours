import { CellContext } from "@tanstack/react-table"
import { Badge, Group } from "@mantine/core"
import { Problem } from "~/types/Problem"

const Tags = (cell: CellContext<Problem, unknown>) => {
  const { tags } = cell.row.original
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
export default Tags
