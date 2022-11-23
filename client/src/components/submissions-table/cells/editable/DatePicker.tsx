import { useState } from "react"
import { Submission } from "~/types/Submission"
import { updateSubmission } from "~/api/submissions"
import { useMutation, useQueryClient } from "react-query"
import { AxiosError } from "axios"
import { DatePicker as MantineDatePicker } from "@mantine/dates"
import { CellContext } from "@tanstack/react-table"
import showToast from "~/utils/showToast"
import { Box } from "@mantine/core"

const DatePicker = (cell: CellContext<Submission, unknown>) => {
  const queryClient = useQueryClient()
  const [date, setDate] = useState(new Date(cell.getValue() as string))

  const { mutate } = useMutation(updateSubmission, {
    onSuccess: (res) => {
      queryClient.invalidateQueries("submissions")
      showToast("success", "Updated submission!")
    },
    onError: (err: AxiosError) => {
      showToast("error", err.response?.data.message)
    },
  })

  return (
    <Box>
      <MantineDatePicker
        value={date}
        onChange={(date) => {
          setDate(date || new Date())
          mutate({ id: cell.row.original.id, solvedAt: date })
        }}
      />
    </Box>
  )
}

export default DatePicker
