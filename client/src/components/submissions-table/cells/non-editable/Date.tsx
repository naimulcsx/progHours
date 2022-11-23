import { Cell } from "react-table"
import { Submission } from "~/types/Submission"
import moment from "moment"
import { Text } from "@mantine/core"

const NonEditableDate = (cell: Cell<Submission>) => {
  return <Text size="sm">{moment(cell.value).format("lll")}</Text>
}

export default NonEditableDate
