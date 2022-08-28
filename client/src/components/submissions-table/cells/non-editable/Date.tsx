import { Cell } from "react-table"
import { Submission } from "@/types/Submission"
import { Text } from "@chakra-ui/react"
import moment from "moment"

const NonEditableDate = (cell: Cell<Submission>) => {
  return <Text>{moment(cell.value).format("lll")}</Text>
}

export default NonEditableDate
