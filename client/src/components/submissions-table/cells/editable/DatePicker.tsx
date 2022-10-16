import { useState } from "react"
import { Submission } from "@/types/Submission"
import { updateSubmission } from "@/api/submissions"
import { useMutation, useQueryClient } from "react-query"
import { AxiosError } from "axios"
import { DatePicker as MantineDatePicker } from "@mantine/dates"

import { DEFAULT_TOAST_OPTIONS } from "@/configs/toast-config"
import { CellContext } from "@tanstack/react-table"
import { showNotification } from "@mantine/notifications"
import { IconCheck } from "@tabler/icons"

const DatePicker = (cell: CellContext<Submission, unknown>) => {
  const queryClient = useQueryClient()
  const [date, setDate] = useState(new Date(cell.getValue() as string))

  const { mutate } = useMutation(updateSubmission, {
    onSuccess: (res) => {
      queryClient.invalidateQueries("submissions")
      /**
       * Show toast message
       */
      showNotification({
        message: "heello owrld",
        color: "green",
        icon: <IconCheck />,
      })
    },
    onError: (err: AxiosError) => {},
  })

  return (
    <MantineDatePicker
      value={date}
      onChange={(date) => {
        setDate(date || new Date())
        mutate({ id: cell.row.original.id, solvedAt: date })
      }}
    />
  )
}

export default DatePicker
