import { Badge, Text } from "@mantine/core"
import { Submission } from "~/types/Submission"
import { CellContext } from "@tanstack/react-table"

const NonEditableVerdict = (cell: CellContext<Submission, unknown>) => {
  let value = cell.getValue() as string
  return (
    <Badge sx={(theme) => ({ background: theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.blue[0] })}>
      <Text>{value}</Text>
    </Badge>
  )
}

export default NonEditableVerdict
