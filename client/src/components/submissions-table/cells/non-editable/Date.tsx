import { Cell } from "react-table"
import { Submission } from "@/types/Submission"
import { Box } from "@chakra-ui/react"
import moment from "moment"

const NonEditableDate = (cell: Cell<Submission>) => {
  return (
    <Box py={2} px={4} minW="16" textAlign="center">
      <p>{moment(cell.value).format("ddd, D MMM YYYY")}</p>
    </Box>
  )
}

export default NonEditableDate
